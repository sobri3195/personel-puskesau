import { Response } from 'express';
import Unit from '../models/Unit';
import Soldier from '../models/Soldier';
import ActivityLog from '../models/ActivityLog';
import { AuthRequest } from '../middleware/auth';

export const getAllUnits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, type, base } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }

    if (type) {
      query.type = type;
    }

    if (base) {
      query.base = base;
    }

    const units = await Unit.find(query).sort({ createdAt: -1 });

    for (const unit of units) {
      const count = await Soldier.countDocuments({ unit: unit.name });
      unit.personnelCount = count;
      await unit.save();
    }

    res.json(units);
  } catch (error) {
    console.error('Get units error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUnitById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      res.status(404).json({ message: 'Unit not found' });
      return;
    }

    const personnelCount = await Soldier.countDocuments({ unit: unit.name });
    unit.personnelCount = personnelCount;

    res.json(unit);
  } catch (error) {
    console.error('Get unit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createUnit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const unit = await Unit.create(req.body);

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'create',
        entity: 'unit',
        entityId: unit._id.toString(),
        details: `Created unit: ${unit.name}`,
        ipAddress: req.ip
      });
    }

    res.status(201).json(unit);
  } catch (error: any) {
    console.error('Create unit error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Unit code already exists' });
      return;
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUnit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const unit = await Unit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!unit) {
      res.status(404).json({ message: 'Unit not found' });
      return;
    }

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'update',
        entity: 'unit',
        entityId: unit._id.toString(),
        details: `Updated unit: ${unit.name}`,
        ipAddress: req.ip
      });
    }

    res.json(unit);
  } catch (error) {
    console.error('Update unit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUnit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
      res.status(404).json({ message: 'Unit not found' });
      return;
    }

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'delete',
        entity: 'unit',
        entityId: unit._id.toString(),
        details: `Deleted unit: ${unit.name}`,
        ipAddress: req.ip
      });
    }

    res.json({ message: 'Unit deleted successfully' });
  } catch (error) {
    console.error('Delete unit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUnitLocations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const units = await Unit.find().select('name code base location personnelCount');

    const locations = [];
    for (const unit of units) {
      const count = await Soldier.countDocuments({ unit: unit.name });
      const doctors = await Soldier.find({ 
        unit: unit.name, 
        corps: 'Kesehatan' 
      }).select('name rank specialization');

      locations.push({
        id: unit._id,
        name: unit.name,
        code: unit.code,
        base: unit.base,
        location: unit.location,
        personnelCount: count,
        doctors: doctors
      });
    }

    res.json(locations);
  } catch (error) {
    console.error('Get unit locations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

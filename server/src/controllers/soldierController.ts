import { Response } from 'express';
import Soldier from '../models/Soldier';
import ActivityLog from '../models/ActivityLog';
import { AuthRequest } from '../middleware/auth';

export const getAllSoldiers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, rank, unit, page = 1, limit = 10 } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nrp: { $regex: search, $options: 'i' } }
      ];
    }

    if (rank) {
      query.rank = rank;
    }

    if (unit) {
      query.unit = unit;
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const soldiers = await Soldier.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Soldier.countDocuments(query);

    res.json({
      soldiers,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get soldiers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSoldierById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const soldier = await Soldier.findById(req.params.id);

    if (!soldier) {
      res.status(404).json({ message: 'Soldier not found' });
      return;
    }

    res.json(soldier);
  } catch (error) {
    console.error('Get soldier error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSoldier = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const soldier = await Soldier.create(req.body);

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'create',
        entity: 'soldier',
        entityId: soldier._id.toString(),
        details: `Created soldier: ${soldier.name}`,
        ipAddress: req.ip
      });
    }

    res.status(201).json(soldier);
  } catch (error: any) {
    console.error('Create soldier error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'NRP already exists' });
      return;
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSoldier = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const soldier = await Soldier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!soldier) {
      res.status(404).json({ message: 'Soldier not found' });
      return;
    }

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'update',
        entity: 'soldier',
        entityId: soldier._id.toString(),
        details: `Updated soldier: ${soldier.name}`,
        ipAddress: req.ip
      });
    }

    res.json(soldier);
  } catch (error) {
    console.error('Update soldier error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSoldier = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const soldier = await Soldier.findByIdAndDelete(req.params.id);

    if (!soldier) {
      res.status(404).json({ message: 'Soldier not found' });
      return;
    }

    if (req.user) {
      await ActivityLog.create({
        userId: req.user.id,
        userName: req.user.name,
        action: 'delete',
        entity: 'soldier',
        entityId: soldier._id.toString(),
        details: `Deleted soldier: ${soldier.name}`,
        ipAddress: req.ip
      });
    }

    res.json({ message: 'Soldier deleted successfully' });
  } catch (error) {
    console.error('Delete soldier error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSoldierStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const total = await Soldier.countDocuments();
    const noEducation = await Soldier.countDocuments({ education: 'SMA' });
    const specialists = await Soldier.countDocuments({ specialization: { $exists: true, $ne: '' } });
    
    const avgServiceDuration = await Soldier.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: '$serviceDuration' }
        }
      }
    ]);

    const byRank = await Soldier.aggregate([
      {
        $group: {
          _id: '$rank',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const byUnit = await Soldier.aggregate([
      {
        $group: {
          _id: '$unit',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const healthStats = await Soldier.aggregate([
      {
        $group: {
          _id: '$healthStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      total,
      noEducation,
      specialists,
      avgServiceDuration: avgServiceDuration[0]?.average || 0,
      byRank,
      byUnit,
      healthStats
    });
  } catch (error) {
    console.error('Get soldier stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

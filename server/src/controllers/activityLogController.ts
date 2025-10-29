import { Response } from 'express';
import ActivityLog from '../models/ActivityLog';
import { AuthRequest } from '../middleware/auth';

export const getAllActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, action, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (action) {
      query.action = action;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate as string);
      }
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await ActivityLog.countDocuments(query);

    res.json({
      logs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createActivityLog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const log = await ActivityLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    console.error('Create activity log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

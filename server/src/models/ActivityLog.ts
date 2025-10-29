import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'read', 'update', 'delete', 'login', 'logout', 'export']
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: String
  },
  details: {
    type: String
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);

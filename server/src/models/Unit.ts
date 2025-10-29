import mongoose, { Document, Schema } from 'mongoose';

export interface IUnit extends Document {
  name: string;
  code: string;
  type: string;
  base: string;
  location: {
    latitude: number;
    longitude: number;
  };
  personnelCount: number;
  commander?: string;
  createdAt: Date;
  updatedAt: Date;
}

const unitSchema = new Schema<IUnit>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Skadron Udara', 'Lanud', 'Kosek', 'Rumkit', 'Pendidikan', 'Lainnya']
  },
  base: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  personnelCount: {
    type: Number,
    default: 0
  },
  commander: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IUnit>('Unit', unitSchema);

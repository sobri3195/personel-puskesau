import mongoose, { Document, Schema } from 'mongoose';

export interface ISoldier extends Document {
  nrp: string;
  name: string;
  rank: string;
  corps: string;
  unit: string;
  education: string;
  specialization?: string;
  serviceDuration: number;
  healthStatus: string;
  lastCheckup?: Date;
  bloodType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const soldierSchema = new Schema<ISoldier>({
  nrp: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  rank: {
    type: String,
    required: true,
    enum: [
      'Marsekal TNI',
      'Marsekal Madya TNI',
      'Marsekal Muda TNI',
      'Marsekal Pertama TNI',
      'Kolonel',
      'Letnan Kolonel',
      'Mayor',
      'Kapten',
      'Letnan Satu',
      'Letnan Dua',
      'Pembantu Letnan Satu',
      'Sersan Mayor',
      'Sersan Kepala',
      'Sersan Satu',
      'Sersan Dua',
      'Kopral Kepala',
      'Kopral Satu',
      'Kopral Dua',
      'Prajurit Kepala',
      'Prajurit Satu',
      'Prajurit Dua'
    ]
  },
  corps: {
    type: String,
    required: true,
    enum: ['Penerbang', 'Teknik', 'Navigasi', 'Kesehatan', 'Administrasi', 'Lainnya']
  },
  unit: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true,
    enum: ['SMA', 'D3', 'S1', 'S2', 'S3']
  },
  specialization: {
    type: String
  },
  serviceDuration: {
    type: Number,
    required: true,
    default: 0
  },
  healthStatus: {
    type: String,
    required: true,
    enum: ['Sehat', 'Sakit Ringan', 'Sakit Sedang', 'Sakit Berat', 'Pemulihan'],
    default: 'Sehat'
  },
  lastCheckup: {
    type: Date
  },
  bloodType: {
    type: String,
    enum: ['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  }
}, {
  timestamps: true
});

export default mongoose.model<ISoldier>('Soldier', soldierSchema);

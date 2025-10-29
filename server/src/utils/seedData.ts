import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Soldier from '../models/Soldier';
import Unit from '../models/Unit';
import Notification from '../models/Notification';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tni-au-health';
    await mongoose.connect(mongoUri);

    await User.deleteMany({});
    await Soldier.deleteMany({});
    await Unit.deleteMany({});
    await Notification.deleteMany({});

    const admin = await User.create({
      name: 'Administrator',
      email: 'admin@tni-au.mil.id',
      password: 'admin123',
      role: 'super_admin',
      active: true
    });

    await User.create({
      name: 'User Regular',
      email: 'user@tni-au.mil.id',
      password: 'user123',
      role: 'user',
      active: true
    });

    const units = await Unit.create([
      {
        name: 'Lanud Halim Perdanakusuma',
        code: 'HALIM',
        type: 'Lanud',
        base: 'Jakarta',
        location: { latitude: -6.2665, longitude: 106.8907 },
        personnelCount: 0,
        commander: 'Kolonel Pnb Ahmad Susanto'
      },
      {
        name: 'Lanud Supadio',
        code: 'SUPADIO',
        type: 'Lanud',
        base: 'Pontianak',
        location: { latitude: -0.1506, longitude: 109.4039 },
        personnelCount: 0,
        commander: 'Kolonel Pnb Bambang Wibowo'
      },
      {
        name: 'Lanud Abdulrachman Saleh',
        code: 'SALEH',
        type: 'Lanud',
        base: 'Malang',
        location: { latitude: -7.9267, longitude: 112.7147 },
        personnelCount: 0,
        commander: 'Kolonel Pnb Sutrisno'
      },
      {
        name: 'Lanud Sultan Hasanuddin',
        code: 'HASANUDDIN',
        type: 'Lanud',
        base: 'Makassar',
        location: { latitude: -5.0616, longitude: 119.5543 },
        personnelCount: 0,
        commander: 'Kolonel Pnb Agus Purnomo'
      },
      {
        name: 'Lanud Ngurah Rai',
        code: 'NGURAHRAI',
        type: 'Lanud',
        base: 'Bali',
        location: { latitude: -8.7467, longitude: 115.1668 },
        personnelCount: 0,
        commander: 'Kolonel Pnb I Made Sudana'
      },
      {
        name: 'RSAU dr. Esnawan Antariksa',
        code: 'RSAU-EA',
        type: 'Rumkit',
        base: 'Jakarta',
        location: { latitude: -6.2665, longitude: 106.8907 },
        personnelCount: 0,
        commander: 'Kolonel Kes dr. Budi Santoso'
      }
    ]);

    const soldiers = await Soldier.create([
      {
        nrp: '10101001',
        name: 'Mayor dr. Surya Pratama',
        rank: 'Mayor',
        corps: 'Kesehatan',
        unit: 'RSAU dr. Esnawan Antariksa',
        education: 'S2',
        specialization: 'Dokter Umum',
        serviceDuration: 12,
        healthStatus: 'Sehat',
        bloodType: 'A+',
        lastCheckup: new Date('2024-01-15')
      },
      {
        nrp: '10101002',
        name: 'Kapten Budi Santoso',
        rank: 'Kapten',
        corps: 'Penerbang',
        unit: 'Lanud Halim Perdanakusuma',
        education: 'S1',
        specialization: 'Pilot Tempur',
        serviceDuration: 8,
        healthStatus: 'Sehat',
        bloodType: 'O+',
        lastCheckup: new Date('2024-02-10')
      },
      {
        nrp: '10101003',
        name: 'Letnan Satu Ahmad Rizki',
        rank: 'Letnan Satu',
        corps: 'Teknik',
        unit: 'Lanud Supadio',
        education: 'S1',
        specialization: 'Teknisi Avionik',
        serviceDuration: 6,
        healthStatus: 'Sehat',
        bloodType: 'B+',
        lastCheckup: new Date('2024-01-20')
      },
      {
        nrp: '10101004',
        name: 'Sersan Mayor Dwi Hartono',
        rank: 'Sersan Mayor',
        corps: 'Administrasi',
        unit: 'Lanud Halim Perdanakusuma',
        education: 'D3',
        serviceDuration: 15,
        healthStatus: 'Sakit Ringan',
        bloodType: 'AB+',
        lastCheckup: new Date('2024-02-05')
      },
      {
        nrp: '10101005',
        name: 'Kolonel Pnb Agus Wijaya',
        rank: 'Kolonel',
        corps: 'Penerbang',
        unit: 'Lanud Abdulrachman Saleh',
        education: 'S2',
        specialization: 'Pilot Instruktur',
        serviceDuration: 20,
        healthStatus: 'Sehat',
        bloodType: 'A+',
        lastCheckup: new Date('2024-01-30')
      },
      {
        nrp: '10101006',
        name: 'Letnan Dua Siti Nurhaliza',
        rank: 'Letnan Dua',
        corps: 'Kesehatan',
        unit: 'RSAU dr. Esnawan Antariksa',
        education: 'S1',
        specialization: 'Perawat',
        serviceDuration: 3,
        healthStatus: 'Sehat',
        bloodType: 'O-',
        lastCheckup: new Date('2024-02-01')
      },
      {
        nrp: '10101007',
        name: 'Kapten Ir. Joko Prasetyo',
        rank: 'Kapten',
        corps: 'Teknik',
        unit: 'Lanud Sultan Hasanuddin',
        education: 'S1',
        specialization: 'Teknisi Mesin',
        serviceDuration: 9,
        healthStatus: 'Sehat',
        bloodType: 'B-',
        lastCheckup: new Date('2024-01-25')
      },
      {
        nrp: '10101008',
        name: 'Mayor Candra Kusuma',
        rank: 'Mayor',
        corps: 'Navigasi',
        unit: 'Lanud Ngurah Rai',
        education: 'S1',
        specialization: 'Navigator',
        serviceDuration: 11,
        healthStatus: 'Sehat',
        bloodType: 'A-',
        lastCheckup: new Date('2024-02-08')
      },
      {
        nrp: '10101009',
        name: 'Sersan Kepala Wawan Setiawan',
        rank: 'Sersan Kepala',
        corps: 'Administrasi',
        unit: 'Lanud Supadio',
        education: 'SMA',
        serviceDuration: 18,
        healthStatus: 'Pemulihan',
        bloodType: 'O+',
        lastCheckup: new Date('2024-02-12')
      },
      {
        nrp: '10101010',
        name: 'Letnan Kolonel dr. Rina Marlina',
        rank: 'Letnan Kolonel',
        corps: 'Kesehatan',
        unit: 'RSAU dr. Esnawan Antariksa',
        education: 'S2',
        specialization: 'Dokter Spesialis Penyakit Dalam',
        serviceDuration: 16,
        healthStatus: 'Sehat',
        bloodType: 'AB-',
        lastCheckup: new Date('2024-01-18')
      }
    ]);

    await Notification.create([
      {
        title: 'Selamat Datang di Sistem Data Kesehatan TNI AU',
        message: 'Sistem telah berhasil diinisialisasi dengan data awal. Silakan mulai menggunakan aplikasi.',
        type: 'success',
        read: false
      },
      {
        title: 'Pemeriksaan Kesehatan Rutin',
        message: 'Reminder: Jadwal pemeriksaan kesehatan rutin untuk seluruh personel akan dilaksanakan minggu depan.',
        type: 'info',
        read: false
      },
      {
        title: 'Update Sistem',
        message: 'Sistem akan menjalani maintenance pada hari Minggu pukul 00:00 - 04:00 WIB.',
        type: 'warning',
        read: false
      }
    ]);

    console.log('Seed data created successfully!');
    console.log(`Admin Email: ${admin.email}`);
    console.log('Admin Password: admin123');
    console.log(`Total Soldiers: ${soldiers.length}`);
    console.log(`Total Units: ${units.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

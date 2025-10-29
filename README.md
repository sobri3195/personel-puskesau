# Sistem Data Kesehatan TNI AU

Dashboard Sistem Data Kesehatan Tentara Nasional Indonesia Angkatan Udara - Health Data Management System for Indonesian Air Force.

## Fitur Utama

### 1. Dashboard Utama
- Kartu statistik dengan metrik penting (total prajurit, spesialis, dll)
- Grafik personel berdasarkan pangkat (bar chart) dan satuan (pie chart)
- Grafik kesehatan dan tren penyakit (line chart)

### 2. Manajemen Data Prajurit
- CRUD operations untuk data prajurit
- Pencarian dan filter berdasarkan NRP, pangkat, satuan
- Export data ke CSV

### 3. Manajemen Data Satuan
- CRUD operations untuk data satuan
- Filter berdasarkan tipe dan pangkalan

### 4. Peta Sebaran Personel
- Visualisasi geografis pangkalan udara di Indonesia
- Detail personel dan dokter per lokasi

### 5. Pusat Notifikasi
- Notifikasi sistem
- Mark as read dan delete functionality

### 6. Log Aktivitas
- Riwayat aktivitas sistem
- Filter berdasarkan pengguna, tindakan, dan tanggal

### 7. Manajemen Pengguna
- Khusus Super Admin
- Kelola user, role, dan permissions

## Tech Stack

### Frontend
- React.js dengan TypeScript
- Vite
- Tailwind CSS
- Recharts untuk visualisasi data
- React Router untuk navigasi
- React Leaflet untuk peta interaktif

### Backend
- Node.js dengan Express.js
- TypeScript
- MongoDB dengan Mongoose
- JWT untuk autentikasi
- bcrypt untuk password hashing

## Installation

```bash
# Install semua dependencies
npm run install:all

# Jalankan development mode
npm run dev

# Build production
npm run build
```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

## Default Admin Account

```
Email: admin@tni-au.mil.id
Password: admin123
```

## License

MIT

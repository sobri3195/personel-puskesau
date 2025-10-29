import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, Stethoscope, Clock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { soldierAPI } from '../services/api';
import { SoldierStats } from '../types';

const COLORS = ['#0073e6', '#00a8e6', '#00d4ff', '#80e5ff', '#b3f0ff'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<SoldierStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await soldierAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const healthTrends = [
    { month: 'Jan', sehat: 85, sakit: 15 },
    { month: 'Feb', sehat: 88, sakit: 12 },
    { month: 'Mar', sehat: 82, sakit: 18 },
    { month: 'Apr', sehat: 90, sakit: 10 },
    { month: 'Mei', sehat: 87, sakit: 13 },
    { month: 'Jun', sehat: 91, sakit: 9 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Prajurit</p>
              <p className="text-3xl font-bold mt-2">{stats?.total || 0}</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pendidikan SMA</p>
              <p className="text-3xl font-bold mt-2">{stats?.noEducation || 0}</p>
            </div>
            <GraduationCap className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Spesialis</p>
              <p className="text-3xl font-bold mt-2">{stats?.specialists || 0}</p>
            </div>
            <Stethoscope className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Rata-rata Dinas (Tahun)</p>
              <p className="text-3xl font-bold mt-2">{Math.round(stats?.avgServiceDuration || 0)}</p>
            </div>
            <Clock className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personel Berdasarkan Pangkat</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.byRank.slice(0, 10) || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0073e6" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personel Berdasarkan Satuan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.byUnit.slice(0, 5) || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry._id}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats?.byUnit.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Status Kesehatan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.healthStats || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00a8e6" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tren Kesehatan (6 Bulan Terakhir)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sehat" stroke="#00a8e6" name="Sehat (%)" />
              <Line type="monotone" dataKey="sakit" stroke="#ff6b6b" name="Sakit (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

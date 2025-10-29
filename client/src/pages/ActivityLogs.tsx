import React, { useEffect, useState } from 'react';
import { Activity, Filter } from 'lucide-react';
import { activityLogAPI } from '../services/api';
import { ActivityLog } from '../types';
import { format } from 'date-fns';

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, currentPage]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await activityLogAPI.getAll({
        action: actionFilter,
        page: currentPage,
        limit: 20
      });
      setLogs(response.data.logs);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    const colors: { [key: string]: string } = {
      create: 'bg-green-100 text-green-800',
      read: 'bg-blue-100 text-blue-800',
      update: 'bg-yellow-100 text-yellow-800',
      delete: 'bg-red-100 text-red-800',
      login: 'bg-purple-100 text-purple-800',
      logout: 'bg-gray-100 text-gray-800',
      export: 'bg-indigo-100 text-indigo-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[action] || 'bg-gray-100'}`}>
        {action.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-800">Log Aktivitas</h1>
      </div>

      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="input"
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Semua Aktivitas</option>
            <option value="create">Create</option>
            <option value="read">Read</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="export">Export</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Pengguna</th>
                <th>Aksi</th>
                <th>Entitas</th>
                <th>Detail</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td className="whitespace-nowrap">
                    {format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                  </td>
                  <td className="font-semibold">{log.userName}</td>
                  <td>{getActionBadge(log.action)}</td>
                  <td className="capitalize">{log.entity}</td>
                  <td>{log.details || '-'}</td>
                  <td className="font-mono text-sm">{log.ipAddress || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada log aktivitas
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;

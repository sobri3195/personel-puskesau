import React, { useEffect, useState } from 'react';
import { Plus, Search, Download, Edit, Trash2 } from 'lucide-react';
import { soldierAPI } from '../services/api';
import { Soldier } from '../types';
import { exportToCSV } from '../utils/exportCSV';
import SoldierModal from '../components/SoldierModal';

const Soldiers: React.FC = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [rankFilter, setRankFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSoldier, setEditingSoldier] = useState<Soldier | null>(null);

  useEffect(() => {
    fetchSoldiers();
  }, [search, rankFilter, unitFilter, currentPage]);

  const fetchSoldiers = async () => {
    try {
      setLoading(true);
      const response = await soldierAPI.getAll({
        search,
        rank: rankFilter,
        unit: unitFilter,
        page: currentPage,
        limit: 10
      });
      setSoldiers(response.data.soldiers);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching soldiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data prajurit ini?')) return;

    try {
      await soldierAPI.delete(id);
      fetchSoldiers();
    } catch (error) {
      console.error('Error deleting soldier:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleEdit = (soldier: Soldier) => {
    setEditingSoldier(soldier);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const exportData = soldiers.map(s => ({
      NRP: s.nrp,
      Nama: s.name,
      Pangkat: s.rank,
      Korps: s.corps,
      Satuan: s.unit,
      Pendidikan: s.education,
      Spesialisasi: s.specialization || '-',
      'Lama Dinas': s.serviceDuration,
      'Status Kesehatan': s.healthStatus,
      'Golongan Darah': s.bloodType || '-'
    }));
    exportToCSV(exportData, 'data-prajurit');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Prajurit</h1>
        <div className="flex space-x-2">
          <button onClick={handleExport} className="btn btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => {
              setEditingSoldier(null);
              setIsModalOpen(true);
            }}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prajurit</span>
          </button>
        </div>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau NRP..."
              className="input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="input"
            value={rankFilter}
            onChange={(e) => setRankFilter(e.target.value)}
          >
            <option value="">Semua Pangkat</option>
            <option value="Kolonel">Kolonel</option>
            <option value="Letnan Kolonel">Letnan Kolonel</option>
            <option value="Mayor">Mayor</option>
            <option value="Kapten">Kapten</option>
            <option value="Letnan Satu">Letnan Satu</option>
            <option value="Letnan Dua">Letnan Dua</option>
          </select>

          <input
            type="text"
            placeholder="Filter Satuan..."
            className="input"
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="card overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>NRP</th>
                  <th>Nama</th>
                  <th>Pangkat</th>
                  <th>Korps</th>
                  <th>Satuan</th>
                  <th>Pendidikan</th>
                  <th>Status Kesehatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {soldiers.map((soldier) => (
                  <tr key={soldier._id}>
                    <td className="font-mono">{soldier.nrp}</td>
                    <td className="font-semibold">{soldier.name}</td>
                    <td>{soldier.rank}</td>
                    <td>{soldier.corps}</td>
                    <td>{soldier.unit}</td>
                    <td>{soldier.education}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          soldier.healthStatus === 'Sehat'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {soldier.healthStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(soldier)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(soldier._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        </>
      )}

      {isModalOpen && (
        <SoldierModal
          soldier={editingSoldier}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSoldier(null);
          }}
          onSuccess={() => {
            fetchSoldiers();
            setIsModalOpen(false);
            setEditingSoldier(null);
          }}
        />
      )}
    </div>
  );
};

export default Soldiers;

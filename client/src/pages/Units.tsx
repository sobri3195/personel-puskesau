import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { unitAPI } from '../services/api';
import { Unit } from '../types';
import UnitModal from '../components/UnitModal';

const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  useEffect(() => {
    fetchUnits();
  }, [search, typeFilter]);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await unitAPI.getAll({
        search,
        type: typeFilter
      });
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data satuan ini?')) return;

    try {
      await unitAPI.delete(id);
      fetchUnits();
    } catch (error) {
      console.error('Error deleting unit:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Satuan</h1>
        <button
          onClick={() => {
            setEditingUnit(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Satuan</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau kode satuan..."
              className="input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Semua Tipe</option>
            <option value="Skadron Udara">Skadron Udara</option>
            <option value="Lanud">Lanud</option>
            <option value="Kosek">Kosek</option>
            <option value="Rumkit">Rumkit</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Nama Satuan</th>
                <th>Tipe</th>
                <th>Pangkalan</th>
                <th>Jumlah Personel</th>
                <th>Komandan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit._id}>
                  <td className="font-mono font-semibold">{unit.code}</td>
                  <td className="font-semibold">{unit.name}</td>
                  <td>{unit.type}</td>
                  <td>{unit.base}</td>
                  <td className="text-center">{unit.personnelCount}</td>
                  <td>{unit.commander || '-'}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(unit)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(unit._id)}
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
      )}

      {isModalOpen && (
        <UnitModal
          unit={editingUnit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUnit(null);
          }}
          onSuccess={() => {
            fetchUnits();
            setIsModalOpen(false);
            setEditingUnit(null);
          }}
        />
      )}
    </div>
  );
};

export default Units;

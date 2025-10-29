import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { soldierAPI } from '../services/api';
import { Soldier } from '../types';

interface SoldierModalProps {
  soldier: Soldier | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SoldierModal: React.FC<SoldierModalProps> = ({ soldier, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nrp: '',
    name: '',
    rank: '',
    corps: '',
    unit: '',
    education: '',
    specialization: '',
    serviceDuration: 0,
    healthStatus: 'Sehat',
    bloodType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (soldier) {
      setFormData({
        nrp: soldier.nrp,
        name: soldier.name,
        rank: soldier.rank,
        corps: soldier.corps,
        unit: soldier.unit,
        education: soldier.education,
        specialization: soldier.specialization || '',
        serviceDuration: soldier.serviceDuration,
        healthStatus: soldier.healthStatus,
        bloodType: soldier.bloodType || ''
      });
    }
  }, [soldier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (soldier) {
        await soldierAPI.update(soldier._id, formData);
      } else {
        await soldierAPI.create(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {soldier ? 'Edit Prajurit' : 'Tambah Prajurit Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">NRP</label>
              <input
                type="text"
                className="input"
                value={formData.nrp}
                onChange={(e) => setFormData({ ...formData, nrp: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pangkat</label>
              <select
                className="input"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                required
              >
                <option value="">Pilih Pangkat</option>
                <option value="Kolonel">Kolonel</option>
                <option value="Letnan Kolonel">Letnan Kolonel</option>
                <option value="Mayor">Mayor</option>
                <option value="Kapten">Kapten</option>
                <option value="Letnan Satu">Letnan Satu</option>
                <option value="Letnan Dua">Letnan Dua</option>
                <option value="Sersan Mayor">Sersan Mayor</option>
                <option value="Sersan Kepala">Sersan Kepala</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Korps</label>
              <select
                className="input"
                value={formData.corps}
                onChange={(e) => setFormData({ ...formData, corps: e.target.value })}
                required
              >
                <option value="">Pilih Korps</option>
                <option value="Penerbang">Penerbang</option>
                <option value="Teknik">Teknik</option>
                <option value="Navigasi">Navigasi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Administrasi">Administrasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Satuan</label>
              <input
                type="text"
                className="input"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pendidikan</label>
              <select
                className="input"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                required
              >
                <option value="">Pilih Pendidikan</option>
                <option value="SMA">SMA</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Spesialisasi</label>
              <input
                type="text"
                className="input"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lama Dinas (tahun)</label>
              <input
                type="number"
                className="input"
                value={formData.serviceDuration}
                onChange={(e) => setFormData({ ...formData, serviceDuration: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status Kesehatan</label>
              <select
                className="input"
                value={formData.healthStatus}
                onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                required
              >
                <option value="Sehat">Sehat</option>
                <option value="Sakit Ringan">Sakit Ringan</option>
                <option value="Sakit Sedang">Sakit Sedang</option>
                <option value="Sakit Berat">Sakit Berat</option>
                <option value="Pemulihan">Pemulihan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Golongan Darah</label>
              <select
                className="input"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
              >
                <option value="">Pilih Golongan Darah</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SoldierModal;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { unitAPI } from '../services/api';
import { Unit } from '../types';

interface UnitModalProps {
  unit: Unit | null;
  onClose: () => void;
  onSuccess: () => void;
}

const UnitModal: React.FC<UnitModalProps> = ({ unit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    base: '',
    latitude: 0,
    longitude: 0,
    commander: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (unit) {
      setFormData({
        name: unit.name,
        code: unit.code,
        type: unit.type,
        base: unit.base,
        latitude: unit.location.latitude,
        longitude: unit.location.longitude,
        commander: unit.commander || ''
      });
    }
  }, [unit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        location: {
          latitude: formData.latitude,
          longitude: formData.longitude
        }
      };

      if (unit) {
        await unitAPI.update(unit._id, payload);
      } else {
        await unitAPI.create(payload);
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
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {unit ? 'Edit Satuan' : 'Tambah Satuan Baru'}
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kode Satuan</label>
              <input
                type="text"
                className="input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama Satuan</label>
              <input
                type="text"
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipe</label>
              <select
                className="input"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Pilih Tipe</option>
                <option value="Skadron Udara">Skadron Udara</option>
                <option value="Lanud">Lanud</option>
                <option value="Kosek">Kosek</option>
                <option value="Rumkit">Rumkit</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pangkalan</label>
              <input
                type="text"
                className="input"
                value={formData.base}
                onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Komandan</label>
              <input
                type="text"
                className="input"
                value={formData.commander}
                onChange={(e) => setFormData({ ...formData, commander: e.target.value })}
              />
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

export default UnitModal;

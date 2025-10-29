import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { unitAPI } from '../services/api';
import { UnitLocation } from '../types';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const MapView: React.FC = () => {
  const [locations, setLocations] = useState<UnitLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<UnitLocation | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await unitAPI.getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Peta Sebaran Personel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-0 overflow-hidden" style={{ height: '600px' }}>
            <MapContainer
              center={[-2.5, 118]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location) => (
                <Marker
                  key={location._id}
                  position={[location.location.latitude, location.location.longitude]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedLocation(location)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.base}</p>
                      <p className="text-sm mt-2">
                        <strong>Personel:</strong> {location.personnelCount}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Detail Lokasi</h2>

            {selectedLocation ? (
              <div>
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                  <p className="text-sm text-gray-600">{selectedLocation.code}</p>
                  <p className="text-sm text-gray-600">{selectedLocation.base}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Tipe Satuan</p>
                  <p className="text-gray-700">{selectedLocation.type}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Jumlah Personel</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedLocation.personnelCount}
                  </p>
                </div>

                {selectedLocation.commander && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-1">Komandan</p>
                    <p className="text-gray-700">{selectedLocation.commander}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold mb-2">Dokter Bertugas</p>
                  {selectedLocation.doctors && selectedLocation.doctors.length > 0 ? (
                    <div className="space-y-2">
                      {selectedLocation.doctors.map((doctor, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded">
                          <p className="font-semibold">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.rank}</p>
                          {doctor.specialization && (
                            <p className="text-sm text-primary-600">{doctor.specialization}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Tidak ada data dokter</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Pilih lokasi pada peta untuk melihat detail
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;

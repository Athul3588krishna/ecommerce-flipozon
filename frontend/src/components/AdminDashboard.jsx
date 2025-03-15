import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import socket from '../socket';

function AdminDashboard() {
  const [drivers, setDrivers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data } = await axios.get('/api/auth/drivers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDrivers(data);
    };
    fetchDrivers();

    socket.on('driverLocation', (data) => setLocations((prev) => ({ ...prev, [data.driverId]: data.coordinates })));
    return () => socket.off();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/api/auth/admin/driver/${id}`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setDrivers(drivers.map(d => d._id === id ? { ...d, status } : d));
  };

  return (
    <div className="p-4">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96 w-full mb-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.entries(locations).map(([id, coords]) => <Marker key={id} position={coords} />)}
      </MapContainer>
      {drivers.map((driver) => (
        <div key={driver._id} className="p-2 mb-2 bg-gray-200">
          <p>{driver.name} - {driver.status}</p>
          {driver.status === 'pending' && (
            <>
              <button onClick={() => updateStatus(driver._id, 'approved')} className="p-1 bg-green-500 text-white mr-2">Approve</button>
              <button onClick={() => updateStatus(driver._id, 'rejected')} className="p-1 bg-red-500 text-white">Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
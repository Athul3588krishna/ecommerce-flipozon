import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import socket from '../socket';

function RideBooking() {
  const [form, setForm] = useState({ pickup: [51.5033, -0.1195], dropoff: [51.5007, -0.1246] });
  const [ride, setRide] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/ride/book', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setRide(data);
  };

  useEffect(() => {
    socket.on('rideAccepted', (data) => alert(`Ride ${data.rideId} accepted!`));
    socket.on('rideCompleted', (data) => alert(`Ride ${data.rideId} completed with ${data.paymentMethod}`));
    return () => socket.off();
  }, []);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <button type="submit" className="p-2 bg-blue-500 text-white">Book Ride</button>
      </form>
      {ride && (
        <MapContainer center={form.pickup} zoom={13} className="h-96 w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={form.pickup} />
          <Marker position={form.dropoff} />
          <Polyline positions={[form.pickup, form.dropoff]} />
        </MapContainer>
      )}
      <button onClick={() => window.location.href = 'tel:911'} className="mt-4 p-2 bg-red-500 text-white">SOS - Call Emergency</button>
    </div>
  );
}

export default RideBooking;
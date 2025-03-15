import { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

function DriverDashboard() {
  const [requests, setRequests] = useState([]);
  const [ride, setRide] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    socket.on('rideRequest', (data) => setRequests((prev) => [...prev, data]));
    navigator.geolocation.watchPosition((pos) => {
      axios.put('/api/driver/location', { coordinates: [pos.coords.latitude, pos.coords.longitude] }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }, null, { enableHighAccuracy: true });
    return () => socket.off();
  }, []);

  const acceptRide = async (rideId) => {
    const { data } = await axios.post(`/api/ride/accept/${rideId}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setRide(data);
    setRequests([]);
  };

  const completeRide = async () => {
    await axios.put(`/api/driver/complete/${ride._id}`, { paymentMethod }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setRide(null);
  };

  return (
    <div className="p-4">
      {requests.map((req) => (
        <div key={req.rideId} className="p-2 mb-2 bg-gray-200">
          <p>Ride ID: {req.rideId} | Fare: ${req.fare}</p>
          <button onClick={() => acceptRide(req.rideId)} className="p-1 bg-green-500 text-white">Accept</button>
        </div>
      ))}
      {ride && (
        <div>
          <p>Active Ride: {ride._id}</p>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="p-2 mb-2 border">
            <option value="cash">Cash</option>
            <option value="digital">Digital</option>
          </select>
          <button onClick={completeRide} className="p-2 bg-blue-500 text-white">Complete Ride</button>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PassengerSignup from './components/PassengerSignup';
import PassengerLogin from './components/PassengerLogin';
import DriverSignup from './components/DriverSignup';
import DriverLogin from './components/DriverLogin';
import AdminLogin from './components/AdminLogin';
import RideBooking from './components/RideBooking';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passenger-signup" element={<PassengerSignup />} />
        <Route path="/passenger-login" element={<PassengerLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/ride-booking" element={<RideBooking />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PassengerSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/signup', form);
    alert('Signup successful! Please log in.');
    navigate('/passenger-login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Passenger Signup</h2>
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 mb-2 border" />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 mb-2 border" />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 mb-2 border" />
      <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full p-2 mb-2 border" />
      <button type="submit" className="w-full p-2 bg-green-500 text-white">Sign Up</button>
    </form>
  );
}

export default PassengerSignup;
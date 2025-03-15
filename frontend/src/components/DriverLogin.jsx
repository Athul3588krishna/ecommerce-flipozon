import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DriverLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/auth/driver-login', form);
    localStorage.setItem('token', data.token);
    navigate('/driver-dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Driver Login</h2>
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 mb-2 border" />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 mb-2 border" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white">Login</button>
    </form>
  );
}

export default DriverLogin;
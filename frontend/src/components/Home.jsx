import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!showCards ? (
        <button
          onClick={() => setShowCards(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600"
        >
          Login
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Passenger Card */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Passenger</h2>
            <button
              onClick={() => navigate('/passenger-signup')}
              className="w-full p-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/passenger-login')}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          {/* Driver Card */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Driver</h2>
            <button
              onClick={() => navigate('/driver-signup')}
              className="w-full p-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/driver-login')}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          {/* Admin Card */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Admin</h2>
            <button
              onClick={() => navigate('/admin-login')}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
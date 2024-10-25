import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import COVER_IMAGE from '/src/assets/StartNow.jpg';
import GOOGLE_ICON from '/src/assets/google.svg';
import { Link } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/main');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="flex items-start h-screen">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col space-y-4">
          <h1 className="text-5xl text-white font-bold">Join To Get In Shape</h1>
          <p className="text-xl text-white">
            Begin your fitness journey with us today. Achieve your goals with
            personalized workout plans and more.
          </p>``
        </div>
        <img src={COVER_IMAGE} alt="Cover" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full bg-gray-100 flex flex-col p-12 justify-center items-center">
        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <h1 className="text-4xl text-gray-900 font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please enter your details to log in.
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@example.com"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full py-3 px-4 mt-1 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full py-3 px-4 mt-1 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="w-4 h-4 text-green-600 rounded mr-2" />
              Remember me for 30 days
            </label>
            <Link to="/forgot-password" className="text-sm text-green-700 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 font-bold text-white bg-green-600 rounded-lg transition-colors ${isLoading ? 'bg-opacity-70' : 'hover:bg-green-700'
              } focus:outline-none`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-gray-100 px-4 text-sm text-gray-500">or</div>
          </div>

          <button className="w-full py-3 px-4 font-semibold text-black border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200">
            <img src={GOOGLE_ICON} alt="Google" className="h-6 w-6 mr-2" />
            Sign in with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-green-700 hover:underline">
              Sign up for free
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

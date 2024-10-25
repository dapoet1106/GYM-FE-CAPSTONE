import React, { useState } from 'react';
import { DumbbellIcon, UtensilsIcon, UsersIcon, BarChartIcon, CalendarIcon, SettingsIcon, LogOutIcon, UserIcon, BellIcon } from 'lucide-react';
import Home from './Home';
import TrainingPlan from './TrainingPlan';
import DietPlan from './DietPlan';
import Trainers from './Trainers';
import Progress from './Progress';
import Settings from './Settings';
import useAuth from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Main = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('Tien');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newProfileImage, setNewProfileImage] = useState('');
  const [file, setFile] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: BarChartIcon, label: 'Home', value: 'home' },
    { icon: DumbbellIcon, label: 'Training Plan', value: 'training' },
    { icon: UtensilsIcon, label: 'Diet Plan', value: 'diet' },
    { icon: UsersIcon, label: 'Trainers', value: 'trainers' },
    { icon: CalendarIcon, label: 'Progress', value: 'Progress' },
    { icon: SettingsIcon, label: 'Settings', value: 'settings' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'training':
        return <TrainingPlan />;
      case 'diet':
        return <DietPlan />;
      case 'trainers':
        return <Trainers />;
      case 'Progress':
        return <Progress />;
      case 'settings':
        return <Settings />;
      default:
        return <TrainingPlan />;
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleUsernameChange = () => {
    setUsername(newUsername);
    setShowUsernameModal(false);
  };

  const handleProfilePictureChange = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFile(null);
        setShowProfilePictureModal(false);
      };
      reader.readAsDataURL(file);
    } else if (newProfileImage) {
      setProfileImage(newProfileImage);
      setShowProfilePictureModal(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logout successful!');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-green-950 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white">Gym - Client</h1>
        </div>
        <nav className="mt-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === item.value ? 'bg-green-900 text-white' : 'text-gray-300'
                }`}
              onClick={() => setActiveTab(item.value)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-green-900"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="shadow bg-white">
          <div className="max-w-full mx-auto py-4 px-4 sm:px-4 lg:px-4 flex items-center justify-between">
            {/* Left - Active Tab Label */}
            <h1 className="text-3xl font-bold text-gray-600">{navItems.find(item => item.value === activeTab)?.label}</h1>

            {/* Center - Username and Notifications */}
            <div className="flex items-center space-x-4">
              <button onClick={handleNotificationsClick} className="relative">
                <BellIcon className="w-6 h-6 text-gray-600 hover:text-green-600" />
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                    <div className="p-4">No new notifications</div>
                  </div>
                )}
              </button>
              <span className="text-gray-600 text-lg font-semibold">{user.username}</span>

              {/* Profile Picture or Icon */}
              <button onClick={handleProfileClick} className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 hover:ring-2 hover:ring-green-600">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-full h-full text-gray-600 p-2" />
                  )}
                </div>
              </button>

              {/* Profile Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUsernameModal(true)}
                  >
                    Change Username
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfilePictureModal(true)}
                  >
                    Change Profile Picture
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-full mx-auto py-4 sm:px-4 lg:px-4">
          {renderActiveTab()}
        </main>
      </div>

      {/* Username Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Change Username</h2>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="New Username"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleUsernameChange}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowUsernameModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Picture Modal */}
      {showProfilePictureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Change Profile Picture</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload from Device:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Or, Use Image URL:</label>
              <input
                type="text"
                value={newProfileImage}
                onChange={(e) => setNewProfileImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Image URL"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleProfilePictureChange}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowProfilePictureModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

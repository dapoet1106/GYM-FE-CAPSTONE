import React, { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
    membershipType: '',
    billingCycle: '',
    supportTopic: '',
    supportMessage: '',
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormState(prev => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target
    setFormState(prev => ({ ...prev, [id]: checked }))
  }

  const handleSaveChanges = () => {
    console.log('Saving changes:', formState)
    // Here you would typically send this data to your backend
  }

  const handleUpdatePaymentMethod = () => {
    console.log('Updating payment method')
    // Implement payment method update logic
  }

  const handleSubmitSupportRequest = () => {
    console.log('Submitting support request:', { topic: formState.supportTopic, message: formState.supportMessage })
    // Implement support request submission logic
  }

  const handleLogout = () => {
    console.log('Logging out')
    // Implement logout logic
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="mb-6">
        <ul className="flex flex-wrap gap-2 border-b">
          {['account', 'notifications', 'membership', 'support', 'logout'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  activeTab === tab
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === 'account' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p className="text-gray-600 mb-4">Update your personal details here.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <p className="text-gray-600 mb-4">Manage how you receive notifications.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                id="emailNotifications"
                checked={formState.emailNotifications}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="smsNotifications" className="font-medium text-gray-700">SMS Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications via text message</p>
              </div>
              <input
                type="checkbox"
                id="smsNotifications"
                checked={formState.smsNotifications}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="pushNotifications" className="font-medium text-gray-700">Push Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
              </div>
              <input
                type="checkbox"
                id="pushNotifications"
                checked={formState.pushNotifications}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {activeTab === 'membership' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Membership Details</h2>
          <p className="text-gray-600 mb-4">View and manage your gym membership.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">Membership Type</label>
              <select
                id="membershipType"
                value={formState.membershipType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                <option value="">Select membership type</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div>
              <label htmlFor="billingCycle" className="block text-sm font-medium text-gray-700">Billing Cycle</label>
              <select
                id="billingCycle"
                value={formState.billingCycle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                <option value="">Select billing cycle</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <button
              onClick={handleUpdatePaymentMethod}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Update Payment Method
            </button>
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Membership Settings
            </button>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          <p className="text-gray-600 mb-4">Get help or send us a message.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="supportTopic" className="block text-sm font-medium text-gray-700">Topic</label>
              <select
                id="supportTopic"
                value={formState.supportTopic}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a topic</option>
                <option value="account">Account Issues</option>
                <option value="billing">Billing Questions</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            <div>
              <label htmlFor="supportMessage" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="supportMessage"
                value={formState.supportMessage}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                placeholder="Type your message here"
              ></textarea>
            </div>
            <button
              onClick={handleSubmitSupportRequest}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit Support Request
            </button>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Need immediate assistance?</p>
              <p>Call us at: (123) 456-7890</p>
              <p>Email: support@gymwebsite.com</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logout' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Logout</h2>
          <p className="text-gray-600 mb-4">Securely log out of your account.</p>
          <p className="mb-4">Are you sure you want to log out? This will end your current session.</p>
          <button
  onClick={handleLogout}
  className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
>
  Logout
</button>

          <p className="mt-4 text-sm text-gray-500">
            Note: Logging out will not cancel any active subscriptions or memberships.
          </p>
        </div>
      )}
    </div>
  )
}

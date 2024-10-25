import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import useAuth from '../auth/useAuth';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword } = useAuth();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success('Password reset successfully, redirecting to login ...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error resetting password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-blue-800 p-4">
            <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
                        Reset Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            Set New Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

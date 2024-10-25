import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await forgotPassword(email);
            toast.success('Sending reset password email successfully');
            navigate('/reset-password')
            setIsSubmitted(true);
        } catch (error) {
            toast.error('Error sending reset password email');
            console.error('Error sending reset password email:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-blue-800 p-4">
            <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
                        Forgot Password
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className="text-gray-700 mb-6 text-center">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <div className="mb-6">
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4 4m0 0l-4-4m4 4V8" />
                                </svg>
                            </div>
                            <p className="text-gray-700 mb-6">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>

                <div className="px-8 py-4 bg-gray-100 bg-opacity-50 flex justify-center">
                    <Link
                        to={'/login'}
                        className="text-sm text-blue-500 hover:underline flex items-center"
                    >
                        <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

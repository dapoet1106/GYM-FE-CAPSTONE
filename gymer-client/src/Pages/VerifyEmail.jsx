import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../auth/useAuth';

// Main Component VerifyEmail
const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuth();

    // Xử lý thay đổi input
    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split('');
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode);
            const focusIndex = newCode.findIndex((digit) => digit === '');
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        try {
            await verifyEmail(verificationCode);
            navigate('/login');
            toast.success('Email verified successfully');
        } catch (error) {
            console.log(error);
        }
    };

    // Tự động submit khi tất cả các trường đều được điền
    useEffect(() => {
        if (code.every((digit) => digit !== '')) {
            handleSubmit(new Event('submit'));
        }
    }, [code]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-blue-800 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80 }}
                className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-6">Verify Your Email</h2>
                <p className="text-gray-400 text-center mb-6">Enter the 6-digit code sent to your email.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-6 gap-3">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-full text-center py-3 text-2xl bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-center mt-3">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;

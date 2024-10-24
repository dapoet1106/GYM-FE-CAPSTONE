import { useState, useEffect } from 'react';
import axios from 'axios';

const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Kiểm tra token đã hết hạn hay chưa
const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(window.atob(base64));
        const currentTime = Date.now() / 1000;
        return decodedPayload.exp < currentTime;
    } catch (error) {
        console.log('Error decoding token:', error);
        return true;
    }
};

// Chỉ làm mới token sau khi đăng nhập thành công
const refreshAccessToken = async () => {
    try {
        // Chỉ gọi endpoint làm mới token sau khi đăng nhập thành công
        const response = await axios.post(
            'http://localhost:4000/api/v1/auth/refresh-token',
            {},
            {
                withCredentials: true,
            },
        );
        const newToken = response.data.token;
        localStorage.setItem('token', newToken); // Cập nhật token trong localStorage
        return newToken;
    } catch (error) {
        console.log('Session expired, please log in again.');
        handleAuthorizationError(); // Đăng xuất người dùng khi token không thể làm mới
        throw error;
    }
};

// Xử lý khi token hết hạn
const handleAuthorizationError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.setItem('isAuthenticated', false);
};

// Interceptor để tự động thêm token vào request
authAxios.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');

        if (!token) return config; // Không gọi làm mới token nếu chưa đăng nhập

        if (isTokenExpired(token)) {
            console.log('Token expired, trying to refresh');
            try {
                token = await refreshAccessToken(); // Chỉ làm mới token khi đã đăng nhập
            } catch (error) {
                console.log('Error refreshing token');
                localStorage.removeItem('token');
                return Promise.reject(error);
            }
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Interceptor để xử lý lỗi từ server (401, 403)
authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return authAxios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

// Hook useAuth
const useAuth = () => {
    // Sử dụng useState để quản lý trạng thái từ localStorage
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [role, setRole] = useState(() => localStorage.getItem('role') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

    // Cập nhật localStorage khi state thay đổi
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        if (token) localStorage.setItem('token', token);
        if (role) localStorage.setItem('role', role);
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [user, token, role, isAuthenticated]);

    // Đăng ký (không cần làm mới token khi đăng ký)
    const signup = async (username, email, password) => {
        try {
            const response = await authAxios.post('/auth/register', {
                username,
                email,
                password,
            });
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            setIsAuthenticated(true);

            // Lưu vào localStorage sau khi đăng ký thành công
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('isAuthenticated', true);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    

    // Đăng nhập
    const login = async (email, password) => {
        try {
            const response = await authAxios.post('/auth/login', { email, password });
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            setRole(user.role);
            setIsAuthenticated(true);

            // Lưu vào localStorage sau khi đăng nhập thành công
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('isAuthenticated', true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Đăng xuất
    const logout = async () => {
        try {
            await authAxios.post('/auth/logout');
            setUser(null);
            setToken(null);
            setRole(null);
            setIsAuthenticated(false);
            localStorage.clear();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Quên mật khẩu
    const forgotPassword = async (email) => {
        try {
            await authAxios.post('/auth/forgot-password', { email });
        } catch (error) {
            console.error('Error sending reset password email:', error);
        }
    };

    // Đặt lại mật khẩu
    const resetPassword = async (token, password) => {
        try {
            await authAxios.post(`/auth/reset-password/${token}`, { password });
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    // Xác thực email
    const verifyEmail = async (verificationCode) => {
        try {
            const response = await authAxios.post('/auth/verify-email', { code: verificationCode });
            setUser(response.data.user);
            setRole(response.data.user.role);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error verifying email:', error);
        }
    };

    return {
        user,
        token,
        role,
        isAuthenticated,
        signup,
        login,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
    };
};

export default useAuth;

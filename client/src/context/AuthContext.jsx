import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            validateToken(storedToken);
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set up axios interceptor to include token in all requests
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const validateToken = async (tokenToValidate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${tokenToValidate}`
                }
            });
            setUser(response.data.user);
            setLoading(false);
        } catch (err) {
            console.error('Token validation failed:', err);
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setLoading(false);
        }
    };

    const signup = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                username,
                email,
                password
            });
            const { token: newToken, user: userData } = response.data;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Signup failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password
            });
            const { token: newToken, user: userData } = response.data;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const isAuthenticated = !!token && !!user;

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        signup,
        login,
        logout,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

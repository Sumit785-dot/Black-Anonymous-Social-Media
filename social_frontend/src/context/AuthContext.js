import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // Fetch user details
                    api.get('/auth/me/')
                        .then(res => setUser(res.data))
                        .catch(() => logout())
                        .finally(() => setLoading(false));
                }
            } catch (e) {
                logout();
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (user_id, pass_key) => {
        const res = await api.post('/auth/login/', { user_id, pass_key });
        localStorage.setItem('token', res.data.access);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register/', userData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const [feedCache, setFeedCache] = useState({
        posts: [],
        page: 1,
        hasMore: true
    });

    const updateFeedCache = (newData) => {
        setFeedCache(prev => ({ ...prev, ...newData }));
    };

    const [profileCache, setProfileCache] = useState({});

    const updateProfileCache = (userId, data) => {
        setProfileCache(prev => ({ ...prev, [userId]: data }));
    };

    return (
        <AuthContext.Provider value={{ user, updateUser: setUser, login, register, logout, loading, feedCache, updateFeedCache, profileCache, updateProfileCache }}>
            {children}
        </AuthContext.Provider>
    );
};

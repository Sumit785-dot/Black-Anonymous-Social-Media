import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import UserCard from '../components/UserCard';
import Layout from '../components/Layout';

const FollowList = () => {
    const { userId } = useParams();
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const type = location.pathname.includes('followers') ? 'followers' : 'following';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/auth/users/${userId}/${type}/`);
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userId, type]);

    return (
        <Layout>
            <div style={{ padding: '20px', maxWidth: '600px' }}>
                <h1>{type === 'followers' ? 'Followers' : 'Following'}</h1>
                {loading && <p>Loading...</p>}
                {!loading && users.length === 0 && <p>No users found.</p>}
                <div className="user-list">
                    {users.map(user => (
                        <UserCard key={user.user_id} user={user} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default FollowList;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard'; // Assuming UserCard exists or I'll create/use a simple one

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                searchUsers();
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const searchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/auth/search/?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '20px' }}>Search Users</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name or ID..."
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        backgroundColor: '#000',
                        color: '#fff',
                        marginBottom: '20px',
                        fontSize: '1em'
                    }}
                />

                {loading && <div style={{ textAlign: 'center', color: '#888' }}>Searching...</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {results.map(user => (
                        <div key={user.user_id} style={{
                            padding: '15px',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer'
                        }} onClick={() => window.location.href = `/profile/${user.user_id}`}>
                            <img
                                src={user.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                alt={user.name}
                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                                <div style={{ color: '#888', fontSize: '0.9em' }}>@{user.user_id}</div>
                            </div>
                        </div>
                    ))}
                    {query && !loading && results.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#888' }}>No users found</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Search;

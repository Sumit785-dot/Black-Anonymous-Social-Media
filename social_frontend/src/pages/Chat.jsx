import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'pending'
    const navigate = useNavigate();

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const res = await api.get('/chat/');
            setConversations(res.data);
        } catch (error) {
            console.error("Failed to fetch chats", error);
        }
    };

    const filteredConversations = conversations.filter(c => {
        if (activeTab === 'active') {
            return c.status === 'active' || (c.status === 'pending' && c.initiator === user.user_id);
        } else {
            // Requests are pending chats where I am NOT the initiator
            return c.status === 'pending' && c.initiator !== user.user_id;
        }
    });

    // Helper to get the other participant
    const getOtherParticipant = (conversation) => {
        return conversation.participants.find(p => p.user_id !== user.user_id) || {};
    };

    return (
        <Layout>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '20px' }}>Messages</h1>

                <div style={{ display: 'flex', borderBottom: '1px solid #333', marginBottom: '20px' }}>
                    <button
                        onClick={() => setActiveTab('active')}
                        style={{
                            flex: 1,
                            padding: '15px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'active' ? '2px solid #fff' : 'none',
                            color: activeTab === 'active' ? '#fff' : '#888',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Chats
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        style={{
                            flex: 1,
                            padding: '15px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'pending' ? '2px solid #fff' : 'none',
                            color: activeTab === 'pending' ? '#fff' : '#888',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Requests
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredConversations.map(c => {
                        const otherUser = getOtherParticipant(c);
                        return (
                            <div
                                key={c.conversation_id}
                                onClick={() => navigate(`/chat/${c.conversation_id}`)}
                                style={{
                                    padding: '15px',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    cursor: 'pointer',
                                    background: '#000'
                                }}
                            >
                                <img
                                    src={otherUser.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name || 'User')}&background=random`}
                                    alt={otherUser.name}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>{otherUser.name}</div>
                                    <div style={{ color: '#888', fontSize: '0.9em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {c.last_message ? c.last_message.content : 'No messages yet'}
                                    </div>
                                </div>
                                {c.status === 'pending' && c.initiator === user.user_id && (
                                    <span style={{ fontSize: '0.8em', color: '#888', background: '#222', padding: '2px 6px', borderRadius: '4px' }}>Pending</span>
                                )}
                            </div>
                        );
                    })}
                    {filteredConversations.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
                            {activeTab === 'active' ? 'No active conversations' : 'No new requests'}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Chat;

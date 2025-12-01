import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

const ChatRoom = () => {
    const { conversationId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversation, setConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchMessages, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, [conversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchData = async () => {
        try {
            const [convRes, msgRes] = await Promise.all([
                api.get(`/chat/${conversationId}/`),
                api.get(`/chat/${conversationId}/messages/`)
            ]);
            setConversation(convRes.data);
            setMessages(msgRes.data);
        } catch (error) {
            console.error("Failed to load chat", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/chat/${conversationId}/messages/`);
            // Only update if different to avoid flicker/scroll issues? 
            // For simplicity, just set it.
            setMessages(res.data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await api.post(`/chat/${conversationId}/messages/`, { content: newMessage });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    const handleAccept = async () => {
        try {
            await api.patch(`/chat/${conversationId}/`, { status: 'active' });
            fetchData();
        } catch (error) {
            console.error("Failed to accept request", error);
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (!conversation) return <Layout><div>Chat not found</div></Layout>;

    const otherUser = conversation.participants.find(p => p.user_id !== user.user_id) || {};
    const isPending = conversation.status === 'pending';
    const isInitiator = conversation.initiator === user.user_id;

    return (
        <Layout>
            <div className="chat-container" style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 64px)', /* Adjust for layout header if needed */
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: 'var(--color-bg-primary)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}>
                    <button
                        onClick={() => navigate('/chat')}
                        className="btn btn-icon"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={otherUser.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name || 'User')}&background=random`}
                                alt={otherUser.name}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid var(--color-bg-tertiary)'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#10b981',
                                borderRadius: '50%',
                                border: '2px solid var(--color-bg-primary)'
                            }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{otherUser.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>@{otherUser.user_id}</div>
                        </div>
                    </div>
                </div>

                {/* Request Banner */}
                {isPending && !isInitiator && (
                    <div style={{
                        padding: '1rem',
                        background: 'var(--color-bg-tertiary)',
                        textAlign: 'center',
                        borderBottom: '1px solid var(--color-border-subtle)'
                    }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                            {otherUser.name} wants to send you a message.
                        </p>
                        <button onClick={handleAccept} className="btn btn-primary">
                            Accept Request
                        </button>
                    </div>
                )}

                {/* Messages Area */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    scrollBehavior: 'smooth'
                }}>
                    {messages.map((msg, index) => {
                        const isLast = index === messages.length - 1;
                        return (
                            <div
                                key={msg.message_id}
                                className={`animate-fade-in`}
                                style={{
                                    alignSelf: msg.is_me ? 'flex-end' : 'flex-start',
                                    maxWidth: '75%',
                                    padding: '12px 18px',
                                    borderRadius: '18px',
                                    background: msg.is_me
                                        ? 'var(--color-accent-primary)'
                                        : 'var(--color-bg-tertiary)',
                                    color: msg.is_me
                                        ? 'var(--color-bg-primary)'
                                        : 'var(--color-text-primary)',
                                    borderBottomRightRadius: msg.is_me ? '4px' : '18px',
                                    borderBottomLeftRadius: msg.is_me ? '18px' : '4px',
                                    boxShadow: 'var(--shadow-sm)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5',
                                    position: 'relative'
                                }}
                            >
                                {msg.content}
                                <div style={{
                                    fontSize: '0.7rem',
                                    opacity: 0.7,
                                    marginTop: '4px',
                                    textAlign: 'right'
                                }}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSend}
                    style={{
                        padding: '1.25rem',
                        borderTop: '1px solid var(--color-border-subtle)',
                        display: 'flex',
                        gap: '1rem',
                        backgroundColor: 'var(--color-bg-primary)',
                        position: 'sticky',
                        bottom: 0
                    }}
                >
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input-premium"
                        style={{ flex: 1 }}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="btn btn-primary"
                        style={{
                            padding: '0.75rem',
                            aspectRatio: '1',
                            borderRadius: '50%',
                            opacity: newMessage.trim() ? 1 : 0.5,
                            cursor: newMessage.trim() ? 'pointer' : 'not-allowed'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ChatRoom;

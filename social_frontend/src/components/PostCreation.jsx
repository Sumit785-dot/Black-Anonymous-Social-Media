import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PostCreation = ({ onPostCreated }) => {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await api.post('/posts/', { content });
            setContent('');
            setSuccess('Post created successfully!');
            if (onPostCreated) onPostCreated();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            border: '1px solid var(--color-border-subtle)',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            borderRadius: '16px',
            backgroundColor: 'var(--color-bg-secondary)'
        }}>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--color-border-subtle)',
                        flexShrink: 0
                    }}>
                        <img
                            src={user?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=fff&color=000&size=80`}
                            alt={user?.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        maxLength={280}
                        className="input-premium"
                        style={{
                            height: '120px',
                            resize: 'none',
                            fontFamily: 'inherit',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0.5rem 0',
                            fontSize: '1.2rem'
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border-subtle)'
                }}>
                    <span style={{
                        color: content.length > 260 ? '#ef4444' : 'var(--color-text-secondary)',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        {content.length}/280
                    </span>
                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="btn btn-primary"
                        style={{
                            opacity: loading || !content.trim() ? 0.5 : 1,
                            padding: '0.5rem 1.5rem'
                        }}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
                {success && <p style={{ color: '#10b981', marginTop: '10px', fontSize: '0.9rem' }}>{success}</p>}
                {error && <p style={{ color: '#ef4444', marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>}
            </form>
        </div>
    );
};

export default PostCreation;

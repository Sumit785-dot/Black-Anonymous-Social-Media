import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import RepostModal from './RepostModal';

const PostCard = ({ post, onUpdate }) => {
    const { user } = useContext(AuthContext);
    const [postData, setPostData] = useState(post);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const isAuthor = user?.user_id === postData.author.user_id;
    const isRepost = !!postData.repost_of;
    const displayPost = isRepost ? postData.repost_of : postData;

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${postData.post_id}/`);
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error("Failed to delete post", error);
            }
        }
    };

    const handleRepostClick = () => {
        if (displayPost.is_reposted) {
            handleUndoRepost();
        } else {
            setShowRepostModal(true);
        }
    };

    const handleUndoRepost = async () => {
        try {
            await api.delete(`/posts/${displayPost.post_id}/repost/`);
            setPostData(prev => ({
                ...prev,
                repost_of: prev.repost_of ? {
                    ...prev.repost_of,
                    is_reposted: false,
                    repost_count: prev.repost_of.repost_count - 1
                } : {
                    ...prev,
                    is_reposted: false,
                    repost_count: prev.repost_count - 1
                }
            }));
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Undo repost failed", error);
        }
    };

    const submitRepost = async (content) => {
        try {
            await api.post(`/posts/${displayPost.post_id}/repost/`, { content });
            setPostData(prev => ({
                ...prev,
                repost_of: prev.repost_of ? {
                    ...prev.repost_of,
                    is_reposted: true,
                    repost_count: prev.repost_of.repost_count + 1
                } : {
                    ...prev,
                    is_reposted: true,
                    repost_count: prev.repost_count + 1
                }
            }));
            setShowRepostModal(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Repost action failed", error);
        }
    };

    const handleLike = async () => {
        try {
            if (displayPost.is_liked) {
                await api.delete(`/posts/${displayPost.post_id}/like/`);
                // Update local state
                setPostData(prev => ({
                    ...prev,
                    repost_of: prev.repost_of ? {
                        ...prev.repost_of,
                        is_liked: false,
                        like_count: prev.repost_of.like_count - 1
                    } : {
                        ...prev,
                        is_liked: false,
                        like_count: prev.like_count - 1
                    }
                }));
            } else {
                await api.post(`/posts/${displayPost.post_id}/like/`);
                // Update local state
                setPostData(prev => ({
                    ...prev,
                    repost_of: prev.repost_of ? {
                        ...prev.repost_of,
                        is_liked: true,
                        like_count: prev.repost_of.like_count + 1
                    } : {
                        ...prev,
                        is_liked: true,
                        like_count: prev.like_count + 1
                    }
                }));
            }
        } catch (error) {
            console.error("Like action failed", error);
        }
    };

    return (
        <div className="post-card" style={{
            border: '1px solid #333',
            padding: '20px',
            marginBottom: '15px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #000 100%)',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#555';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
        >
            {isRepost && (
                <div style={{ color: '#888', fontSize: '0.85em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>🔁</span>
                    <span>Reposted by @{postData.author.user_id}</span>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #444',
                        flexShrink: 0
                    }}>
                        <img
                            src={displayPost.author.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayPost.author.name)}&background=fff&color=000&size=80`}
                            alt={displayPost.author.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayPost.author.name)}&background=fff&color=000&size=80`;
                            }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Link to={`/profile/${displayPost.author.user_id}`} style={{
                                fontWeight: 'bold',
                                fontSize: '1.05em',
                                color: '#fff',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                                onMouseEnter={(e) => e.target.style.color = '#ccc'}
                                onMouseLeave={(e) => e.target.style.color = '#fff'}
                            >
                                {displayPost.author.name}
                            </Link>
                            <span style={{ color: '#666', fontSize: '0.9em' }}>@{displayPost.author.user_id}</span>
                        </div>
                        <div style={{ color: '#666', fontSize: '0.85em' }}>
                            {new Date(displayPost.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                {isAuthor && (
                    <button onClick={handleDelete} style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '0.9em',
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#f00'}
                        onMouseLeave={(e) => e.target.style.color = '#666'}
                    >
                        🗑️ Delete
                    </button>
                )}
            </div>
            <div style={{
                fontSize: '1.05em',
                marginBottom: '15px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5',
                color: '#e0e0e0'
            }}>
                {displayPost.content}
            </div>

            <div style={{ display: 'flex', gap: '25px', color: '#888', paddingTop: '10px', borderTop: '1px solid #222' }}>
                <button
                    onClick={handleRepostClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: displayPost.is_reposted ? '#0f0' : '#888',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.95em',
                        transition: 'all 0.2s',
                        padding: '5px 10px',
                        borderRadius: '5px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1a1a1a';
                        e.currentTarget.style.color = '#0f0';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = displayPost.is_reposted ? '#0f0' : '#888';
                    }}
                >
                    <span>🔁 repost</span>
                    <span>{displayPost.repost_count}</span>
                </button>
                <button
                    onClick={handleLike}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: displayPost.is_liked ? '#f00' : '#888',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.95em',
                        transition: 'all 0.2s',
                        padding: '5px 10px',
                        borderRadius: '5px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1a1a1a';
                        e.currentTarget.style.color = '#f00';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = displayPost.is_liked ? '#f00' : '#888';
                    }}
                >
                    <span>❤️ Like</span>
                    <span>{displayPost.like_count}</span>
                </button>
            </div>

            {showRepostModal && (
                <RepostModal
                    onClose={() => setShowRepostModal(false)}
                    onRepost={submitRepost}
                />
            )}
        </div>
    );
};

export default PostCard;

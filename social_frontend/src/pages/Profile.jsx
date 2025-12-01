import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import ProfilePosts from '../components/ProfilePosts';
import EditProfileModal from '../components/EditProfileModal';
import Skeleton from '../components/ui/Skeleton';

const Profile = () => {
    const { userId } = useParams();
    const { user: currentUser, updateUser, profileCache, updateProfileCache } = useContext(AuthContext);

    const targetUserId = userId || currentUser?.user_id;
    const isOwnProfile = !userId || userId === currentUser?.user_id;

    // Check cache first
    const cachedProfile = targetUserId ? profileCache[targetUserId] : null;

    // Optimistic initialization: 
    // 1. Use cached profile if available
    // 2. Or if viewing own profile, use currentUser data
    const initialProfile = cachedProfile || (isOwnProfile && currentUser ? {
        user_id: currentUser.user_id,
        name: currentUser.name || currentUser.user_id,
        profile_photo: currentUser.profile_photo,
        bio: currentUser.bio,
        // Default counts to 0 or placeholders until fetch completes
        post_count: 0,
        follower_count: 0,
        following_count: 0,
        is_following: false
    } : null);

    const [profile, setProfile] = useState(initialProfile);
    const [loading, setLoading] = useState(!initialProfile);
    const [error, setError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    // Update state when cache changes or route changes
    useEffect(() => {
        if (cachedProfile) {
            setProfile(cachedProfile);
            setLoading(false);
        } else if (targetUserId && !profile) {
            setLoading(true);
        }
    }, [targetUserId, cachedProfile]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!targetUserId) return;

            try {
                // Fetch in background (stale-while-revalidate)
                let response;
                if (targetUserId === currentUser?.user_id) {
                    response = await api.get('/auth/profile/');
                } else {
                    response = await api.get(`/auth/users/${targetUserId}/`);
                }

                setProfile(response.data);
                updateProfileCache(targetUserId, response.data);
                setError('');
            } catch (err) {
                console.error('Profile fetch error:', err);
                if (!profile) setError('User not found');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchProfile();
        }
    }, [userId, currentUser]);

    const handleFollow = async () => {
        try {
            if (profile.is_following) {
                await api.delete(`/auth/users/${userId}/follow/`);
                setProfile(prev => ({ ...prev, is_following: false, follower_count: prev.follower_count - 1 }));
            } else {
                await api.post(`/auth/users/${userId}/follow/`);
                setProfile(prev => ({ ...prev, is_following: true, follower_count: prev.follower_count + 1 }));
            }
        } catch (error) {
            console.error("Follow action failed", error);
        }
    };

    if (error) return (
        <Layout>
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>😕</div>
                <div style={{ fontSize: '1.5em', marginBottom: '10px', color: 'white' }}>{error}</div>
                <div style={{ color: '#888' }}>The user you're looking for doesn't exist</div>
            </div>
        </Layout>
    );

    // Render Skeleton if loading and no profile data
    if (loading && !profile) {
        return (
            <Layout>
                <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                        border: '1px solid #333',
                        borderRadius: '15px',
                        padding: '40px',
                        marginBottom: '30px'
                    }}>
                        <div style={{ display: 'flex', gap: '40px', marginBottom: '30px', alignItems: 'flex-start' }}>
                            <Skeleton circle width={150} height={150} />
                            <div style={{ flex: 1 }}>
                                <Skeleton width={200} height={30} style={{ marginBottom: '20px' }} />
                                <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
                                    <Skeleton width={60} height={20} />
                                    <Skeleton width={60} height={20} />
                                    <Skeleton width={60} height={20} />
                                </div>
                                <Skeleton width={150} height={24} style={{ marginBottom: '10px' }} />
                                <Skeleton width="100%" height={16} count={2} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!profile) return null; // Should not happen given logic above

    const defaultPhoto = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name) + '&background=fff&color=000&size=200';

    return (
        <Layout>
            <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
                {/* Instagram-style Profile Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                    border: '1px solid #333',
                    borderRadius: '15px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    {/* Top Section - Photo + Info */}
                    <div style={{ display: 'flex', gap: '40px', marginBottom: '30px', alignItems: 'flex-start' }}>
                        {/* Profile Photo */}
                        <div style={{ flexShrink: 0 }}>
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid #fff',
                                boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                            }}>
                                <img
                                    src={profile.profile_photo || defaultPhoto}
                                    alt={profile.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = defaultPhoto; }}
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                                <h1 style={{
                                    margin: 0,
                                    fontSize: '1.8em',
                                    color: '#fff'
                                }}>
                                    {profile.user_id}
                                </h1>
                                {isOwnProfile ? (
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        style={{
                                            padding: '8px 20px',
                                            background: 'transparent',
                                            border: '1px solid #666',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '0.9em',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={handleFollow}
                                            style={{
                                                padding: '10px 24px',
                                                backgroundColor: profile.is_following ? '#000' : '#fff',
                                                color: profile.is_following ? '#fff' : '#000',
                                                border: profile.is_following ? '1px solid #fff' : 'none',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                fontSize: '0.95em',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {profile.is_following ? 'Following' : 'Follow'}
                                        </button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const res = await api.post('/chat/', { user_id: profile.user_id });
                                                    window.location.href = `/chat/${res.data.conversation_id}`;
                                                } catch (e) {
                                                    console.error("Failed to start chat", e);
                                                }
                                            }}
                                            style={{
                                                padding: '10px 24px',
                                                backgroundColor: 'transparent',
                                                color: '#fff',
                                                border: '1px solid #fff',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                fontSize: '0.95em',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Message
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Stats Row */}
                            <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
                                <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{profile.post_count || 0}</span>
                                    <span style={{ color: '#888', marginLeft: '5px' }}>posts</span>
                                </div>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.location.href = `/profile/${profile.user_id}/followers`}
                                >
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{profile.follower_count || 0}</span>
                                    <span style={{ color: '#888', marginLeft: '5px' }}>followers</span>
                                </div>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.location.href = `/profile/${profile.user_id}/following`}
                                >
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{profile.following_count || 0}</span>
                                    <span style={{ color: '#888', marginLeft: '5px' }}>following</span>
                                </div>
                            </div>

                            {/* Name and Bio */}
                            <div>
                                <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.05em' }}>
                                    {profile.name}
                                </div>
                                {profile.bio && (
                                    <div style={{ color: '#e0e0e0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                                        {profile.bio}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div>
                    <div style={{
                        borderBottom: '1px solid #333',
                        marginBottom: '20px',
                        paddingBottom: '15px'
                    }}>
                        <h2 style={{
                            fontSize: '1.3em',
                            margin: 0,
                            textAlign: 'center',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: '#888'
                        }}>
                            Posts
                        </h2>
                    </div>
                    <ProfilePosts userId={userId || currentUser?.user_id} />
                </div>
            </div>

            {showEditModal && (
                <EditProfileModal
                    profile={profile}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={(updatedProfile) => {
                        setProfile(updatedProfile);
                        if (isOwnProfile) {
                            updateUser(updatedProfile);
                        }
                    }}
                />
            )}
        </Layout>
    );
};

export default Profile;

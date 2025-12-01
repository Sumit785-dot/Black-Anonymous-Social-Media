import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PostCard from './PostCard';
import Skeleton from './ui/Skeleton';

const ProfilePosts = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchPosts = async (pageNum) => {
        try {
            const response = await api.get(`/posts/user/${userId}/?page=${pageNum}`);
            if (pageNum === 1) {
                setPosts(response.data.results);
            } else {
                setPosts(prev => [...prev, ...response.data.results]);
            }
            setHasMore(!!response.data.next);
        } catch (error) {
            console.error("Failed to fetch user posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchPosts(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };

    const handlePostDeleted = (postId) => {
        setPosts(posts.filter(p => p.post_id !== postId));
    };

    if (loading && page === 1) {
        return (
            <div>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{
                        border: '1px solid #333',
                        padding: '20px',
                        marginBottom: '15px',
                        borderRadius: '10px',
                        background: '#000'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <Skeleton circle width={40} height={40} />
                            <div>
                                <Skeleton width={120} height={20} style={{ marginBottom: '5px' }} />
                                <Skeleton width={80} height={15} />
                            </div>
                        </div>
                        <Skeleton width="100%" height={20} count={2} style={{ marginBottom: '10px' }} />
                        <Skeleton width="60%" height={20} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {posts.length === 0 && <p>No posts yet.</p>}
            {posts.map(post => (
                <PostCard key={post.post_id} post={post} onDelete={handlePostDeleted} />
            ))}
            {hasMore && (
                <button onClick={loadMore} style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', cursor: 'pointer' }}>
                    Load More
                </button>
            )}
        </div>
    );
};

export default ProfilePosts;

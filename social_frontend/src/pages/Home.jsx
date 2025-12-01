import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import PostCreation from '../components/PostCreation';
import PostCard from '../components/PostCard';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { feedCache, updateFeedCache } = useContext(AuthContext);

    // Initialize from cache if available
    const [posts, setPosts] = useState(feedCache.posts || []);
    const [loading, setLoading] = useState(!feedCache.posts.length);
    const [page, setPage] = useState(feedCache.page || 1);
    const [hasMore, setHasMore] = useState(feedCache.hasMore !== undefined ? feedCache.hasMore : true);

    const fetchPosts = async (pageNum = 1) => {
        try {
            if (pageNum === 1 && posts.length === 0) setLoading(true);

            const response = await api.get(`/posts/?page=${pageNum}`);

            let newPosts;
            if (pageNum === 1) {
                newPosts = response.data.results || [];
            } else {
                newPosts = [...posts, ...(response.data.results || [])];
            }

            setPosts(newPosts);
            const newHasMore = response.data.next !== null;
            setHasMore(newHasMore);

            // Update cache
            updateFeedCache({
                posts: newPosts,
                page: pageNum,
                hasMore: newHasMore
            });

        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // If we have cache, we don't strictly need to fetch immediately unless we want fresh data
        // Stale-while-revalidate: show cache, fetch in background for page 1
        if (page === 1) {
            fetchPosts(1);
        }
    }, []); // Only run on mount for refresh

    useEffect(() => {
        if (page > 1) {
            fetchPosts(page);
        }
    }, [page]);

    const handlePostCreated = () => {
        // Refresh feed from page 1
        setPage(1);
        fetchPosts(1);
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <Layout>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '20px', color: '#fff' }}>Home</h2>
                <PostCreation onPostCreated={handlePostCreated} />

                {loading && page === 1 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        Loading posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <p>No posts yet. Create your first post!</p>
                    </div>
                ) : (
                    <>
                        {posts.map(post => (
                            <PostCard key={post.post_id} post={post} onUpdate={handlePostCreated} />
                        ))}
                        {hasMore && (
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="btn btn-secondary"
                                style={{
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Home;

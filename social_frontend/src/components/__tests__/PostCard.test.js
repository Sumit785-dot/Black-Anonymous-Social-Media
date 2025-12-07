import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import PostCard from '../PostCard';

// Mock the API
jest.mock('../../services/api', () => ({
    post: jest.fn(),
    delete: jest.fn(),
}));

const mockPost = {
    id: 1,
    content: 'Test Post Content',
    author: {
        id: 1,
        user_id: 'testauthor',
        name: 'Test Author',
        profile_picture: null
    },
    created_at: '2025-12-03T12:00:00Z',
    like_count: 5,
    is_liked: false,
    comments_count: 2
};

const MockPostCard = ({ post }) => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <PostCard post={post} />
            </BrowserRouter>
        </AuthProvider>
    );
};

test('renders post content and author', () => {
    render(<MockPostCard post={mockPost} />);
    expect(screen.getByText(/Test Post Content/i)).toBeInTheDocument();
    expect(screen.getByText(/@testauthor/i)).toBeInTheDocument();
});

test('renders like count', () => {
    render(<MockPostCard post={mockPost} />);
    expect(screen.getByText('5')).toBeInTheDocument();
});

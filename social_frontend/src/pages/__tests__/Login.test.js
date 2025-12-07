import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock the API
jest.mock('../../services/api', () => ({
    post: jest.fn(),
}));

const MockLogin = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </AuthProvider>
    );
};

test('renders login form', () => {
    render(<MockLogin />);
    const linkElement = screen.getByRole('button', { name: /Login/i });
    expect(linkElement).toBeInTheDocument();
});

test('allows entering username and password', () => {
    render(<MockLogin />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Pass Key/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
});

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [passKey, setPassKey] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!userId || !passKey) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(userId, passKey);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1 style={styles.title}>Login</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Pass Key</label>
                        <input
                            type="password"
                            value={passKey}
                            onChange={(e) => setPassKey(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.linkText}>
                    Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
    },
    formBox: {
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '8px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    error: {
        color: 'white',
        backgroundColor: 'black',
        border: '1px solid white',
        padding: '0.5rem',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.9rem',
        color: 'var(--color-text-primary)',
    },
    input: {
        padding: '0.8rem',
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-subtle)',
        color: 'var(--color-text-primary)',
        borderRadius: '4px',
        outline: 'none',
    },
    button: {
        padding: '1rem',
        backgroundColor: 'var(--color-text-primary)',
        color: 'var(--color-bg-primary)',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '1rem',
    },
    linkText: {
        textAlign: 'center',
        marginTop: '1rem',
        fontSize: '0.9rem',
    },
    link: {
        color: 'var(--color-text-primary)',
        textDecoration: 'underline',
    },
};

export default Login;

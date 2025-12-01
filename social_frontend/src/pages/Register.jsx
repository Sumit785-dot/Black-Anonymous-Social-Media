import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        name: '',
        password: '',
        pass_key: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (!formData.user_id || !formData.name || !formData.password || !formData.pass_key) {
            setError('All fields are required');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        // Alphanumeric user_id check
        if (!/^[a-zA-Z0-9]+$/.test(formData.user_id)) {
            setError('User ID must be alphanumeric');
            return;
        }

        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(JSON.stringify(err.response?.data) || 'Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1 style={styles.title}>Register</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>User ID (@handle)</label>
                        <input
                            type="text"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Alphanumeric only"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Pass Key (Secret for Login)</label>
                        <input
                            type="password"
                            name="pass_key"
                            value={formData.pass_key}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Register</button>
                </form>
                <p style={styles.linkText}>
                    Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        padding: '2rem 0',
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
        wordBreak: 'break-word',
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

export default Register;

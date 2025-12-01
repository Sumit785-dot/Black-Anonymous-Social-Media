import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const UserCard = ({ user }) => {
    return (
        <div className="user-card" style={{ border: '1px solid var(--border-color)', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{user.name}</div>
            <div style={{ color: '#888' }}>@{user.user_id}</div>
            <Link to={`/profile/${user.user_id}`} style={{ display: 'inline-block', marginTop: '10px', textDecoration: 'underline' }}>
                View Profile
            </Link>
        </div>
    );
};

export default UserCard;

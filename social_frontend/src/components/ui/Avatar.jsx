import React from 'react';
import './Avatar.css';

const Avatar = ({
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    showOnline = false,
    isOnline = false,
    border = false,
    onClick
}) => {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=000&color=fff&size=200`;

    const classNames = [
        'avatar',
        `avatar-${size}`,
        `avatar-${shape}`,
        border && 'avatar-border',
        onClick && 'avatar-clickable'
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames} onClick={onClick}>
            <img
                src={src || fallbackSrc}
                alt={alt || name}
                onError={(e) => { e.target.src = fallbackSrc; }}
                className="avatar-img"
            />
            {showOnline && (
                <span className={`avatar-status ${isOnline ? 'avatar-status-online' : 'avatar-status-offline'}`} />
            )}
        </div>
    );
};

export default Avatar;

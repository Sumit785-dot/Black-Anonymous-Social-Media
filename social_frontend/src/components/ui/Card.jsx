import React from 'react';
import styles from './Card.module.css';

/**
 * Reusable Card Component
 * 
 * Variants: default, bordered, elevated
 */
const Card = ({
    children,
    variant = 'default',
    padding = 'medium',
    hoverable = false,
    className = '',
    onClick,
    ...props
}) => {
    const cardClasses = [
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        hoverable && styles.hoverable,
        onClick && styles.clickable,
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

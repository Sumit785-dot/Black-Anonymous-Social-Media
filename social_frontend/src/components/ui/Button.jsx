import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable Button Component
 * 
 * Variants: primary, secondary, danger, ghost
 * Sizes: small, medium, large
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    type = 'button',
    className = '',
    ariaLabel,
    ...props
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            {...props}
        >
            {loading ? (
                <span className={styles.spinner}></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

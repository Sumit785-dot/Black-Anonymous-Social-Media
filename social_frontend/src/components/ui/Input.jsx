import React, { forwardRef } from 'react';
import styles from './Input.module.css';

/**
 * Reusable Input Component
 * 
 * Types: text, password, email, number, textarea
 */
const Input = forwardRef(({
    label,
    error,
    helperText,
    fullWidth = false,
    multiline = false,
    rows = 3,
    className = '',
    ...props
}, ref) => {
    const inputClasses = [
        styles.input,
        error && styles.error,
        fullWidth && styles.fullWidth,
        className
    ].filter(Boolean).join(' ');

    const InputElement = multiline ? 'textarea' : 'input';

    return (
        <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''}`}>
            {label && (
                <label className={styles.label} htmlFor={props.id}>
                    {label}
                    {props.required && <span className={styles.required}>*</span>}
                </label>
            )}

            <InputElement
                ref={ref}
                className={inputClasses}
                rows={multiline ? rows : undefined}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
                {...props}
            />

            {error && (
                <span className={styles.errorText} id={`${props.id}-error`} role="alert">
                    {error}
                </span>
            )}

            {helperText && !error && (
                <span className={styles.helperText} id={`${props.id}-helper`}>
                    {helperText}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;

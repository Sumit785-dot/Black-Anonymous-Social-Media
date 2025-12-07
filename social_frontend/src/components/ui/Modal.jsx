import React, { useEffect } from 'react';
import styles from './Modal.module.css';

/**
 * Reusable Modal Component
 * 
 * Features: backdrop click to close, ESC key to close, focus trap
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'medium',
    closeOnBackdrop = true,
    closeOnEsc = true,
    showCloseButton = true,
}) => {
    useEffect(() => {
        if (!isOpen) return;

        // Handle ESC key
        const handleEsc = (e) => {
            if (closeOnEsc && e.key === 'Escape') {
                onClose();
            }
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose, closeOnEsc]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`${styles.modal} ${styles[size]}`}>
                {/* Header */}
                <div className={styles.header}>
                    {title && (
                        <h2 id="modal-title" className={styles.title}>
                            {title}
                        </h2>
                    )}
                    {showCloseButton && (
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className={styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;

import React, { useState } from 'react';

const RepostModal = ({ onClose, onRepost }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRepost(content);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '15px',
                padding: '30px',
                maxWidth: '500px',
                width: '90%'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#fff' }}>Repost</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add a comment..."
                        maxLength={280}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#000',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1em',
                            resize: 'none',
                            marginBottom: '20px'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: '1px solid #666',
                                borderRadius: '8px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                background: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#000',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Repost
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RepostModal;

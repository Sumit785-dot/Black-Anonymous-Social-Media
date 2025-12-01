import React, { useState } from 'react';
import api from '../services/api';

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio || '');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('bio', bio);
        if (profilePhoto) {
            data.append('profile_photo', profilePhoto);
        }

        try {
            const response = await api.patch('/auth/profile/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Profile update failed', error);
            alert('Failed to update profile');
        }
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
                <h2 style={{ marginBottom: '20px' }}>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#000',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1em'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={200}
                            rows={3}
                            placeholder="Tell us about yourself..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#000',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1em',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ textAlign: 'right', fontSize: '0.85em', color: '#666', marginTop: '4px' }}>
                            {bio.length}/200
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#000',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1em'
                            }}
                        />
                        <div style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>
                            Upload a new profile photo (JPG, PNG)
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '12px 24px',
                                background: 'transparent',
                                border: '1px solid #666',
                                borderRadius: '8px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '12px 24px',
                                background: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#000',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;

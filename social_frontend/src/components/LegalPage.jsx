import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const LegalPage = ({ title, lastUpdated, children }) => {
    return (
        <div className="legal-page-container">
            <div className="legal-page-header">
                <div className="legal-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{title}</span>
                </div>
                <h1 className="legal-title">{title}</h1>
                {lastUpdated && <p className="legal-updated">Last Updated: {lastUpdated}</p>}
            </div>

            <div className="legal-content">
                {children}
            </div>
        </div>
    );
};

export default LegalPage;

import React from 'react';
import Navigation from './Navigation';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <div className="layout-sidebar">
                <Navigation />
            </div>
            <div className="layout-main">
                {children}
            </div>
            <div className="layout-trends">
                {/* Trends/Search placeholder */}
                <div className="layout-trends-box">
                    <h3>Trends</h3>
                    <p>#BlackAndWhite</p>
                    <p>#SocialApp</p>
                </div>
            </div>
        </div>
    );
};

export default Layout;

import React from 'react';
import { Link } from 'react-router-dom';
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

                <footer className="layout-footer">
                    <div className="footer-links">
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                    <div className="footer-links secondary">
                        <Link to="/guidelines">Guidelines</Link>
                        <Link to="/copyright">Copyright</Link>
                        <span>© 2025 Social App</span>
                    </div>
                </footer>
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

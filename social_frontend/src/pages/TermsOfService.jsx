import React from 'react';
import LegalPage from '../components/LegalPage';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <LegalPage title="Terms of Service" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    Welcome to Social App. By accessing or using our website, you agree to be bound by these Terms of Service
                    and our <Link to="/privacy">Privacy Policy</Link>.
                </p>
            </section>

            <section className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By creating an account or using Social App, you agree to comply with these terms. If you do not agree,
                    you may not use our services.
                </p>
            </section>

            <section className="legal-section">
                <h2>2. User Accounts</h2>
                <p>
                    You are responsible for maintaining the security of your account and password. Social App cannot and will
                    not be liable for any loss or damage from your failure to comply with this security obligation.
                </p>
                <p>
                    You must be at least 13 years old to use this service.
                </p>
            </section>

            <section className="legal-section">
                <h2>3. Acceptable Use</h2>
                <p>
                    You agree not to misuse the Social App services. For example, you must not:
                </p>
                <ul>
                    <li>Use the service for any illegal purpose.</li>
                    <li>Harass, abuse, or harm another person.</li>
                    <li>Post content that promotes hate speech, violence, or discrimination.</li>
                    <li>Spam or solicit other users.</li>
                    <li>Attempt to gain unauthorized access to the service or related systems.</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>4. Content Ownership</h2>
                <p>
                    You retain your rights to any content you submit, post or display on or through the Services. By submitting,
                    posting or displaying content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free
                    license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content.
                </p>
            </section>

            <section className="legal-section">
                <h2>5. Termination</h2>
                <p>
                    We may suspend or terminate your account at any time for any reason, including if we reasonably believe:
                    (i) you have violated these Terms, (ii) you create risk or possible legal exposure for us; or (iii) our provision
                    of the Services to you is no longer commercially viable.
                </p>
            </section>

            <section className="legal-section">
                <h2>6. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. We will notify users of any significant changes.
                    Your continued use of the service after such changes constitutes your acceptance of the new terms.
                </p>
            </section>
        </LegalPage>
    );
};

export default TermsOfService;

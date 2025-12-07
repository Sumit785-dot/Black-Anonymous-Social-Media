import React from 'react';
import LegalPage from '../components/LegalPage';

const PrivacyPolicy = () => {
    return (
        <LegalPage title="Privacy Policy" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    At Social App, we believe privacy is a fundamental human right. Our business model is not built on selling your data.
                    This Privacy Policy explains how we handle your information—which is to say, we collect as little as possible.
                </p>
            </section>

            <section className="legal-section">
                <h2>1. No Data Collection</h2>
                <p>
                    We are proud to state that we do not collect, store, or process personal data beyond what is strictly necessary
                    to provide our service (e.g., your username and password for login). We do not track your browsing history,
                    we do not sell your data to third parties, and we do not use cookies for advertising purposes.
                </p>
            </section>

            <section className="legal-section">
                <h2>2. Information You Provide</h2>
                <p>
                    The only information we have is what you explicitly provide to us:
                </p>
                <ul>
                    <li><strong>Account Information:</strong> Username, email address (optional), and password.</li>
                    <li><strong>Content:</strong> Posts, comments, and messages you create.</li>
                    <li><strong>Profile:</strong> Any bio or profile picture you choose to upload.</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>3. How We Use Your Information</h2>
                <p>
                    We use the information you provide solely to:
                </p>
                <ul>
                    <li>Create and maintain your account.</li>
                    <li>Display your posts and content to other users as you intend.</li>
                    <li>Ensure the security and integrity of our platform.</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>4. No Third-Party Tracking</h2>
                <p>
                    We do not use Google Analytics, Facebook Pixel, or any other third-party tracking tools. Your activity on
                    Social App is private and stays on Social App.
                </p>
            </section>

            <section className="legal-section">
                <h2>5. Your Rights</h2>
                <p>
                    You have full control over your data. You can:
                </p>
                <ul>
                    <li>Access all data we hold about you.</li>
                    <li>Edit or delete your profile and content at any time.</li>
                    <li>Delete your entire account, which permanently erases all your data from our servers.</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions about our privacy practices, please contact us at privacy@socialapp.com.
                </p>
            </section>
        </LegalPage>
    );
};

export default PrivacyPolicy;

import React from 'react';
import LegalPage from '../components/LegalPage';

const Contact = () => {
    return (
        <LegalPage title="Contact Us" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    We'd love to hear from you. Whether you have a question, feedback, or just want to say hello,
                    here are the ways you can reach us.
                </p>
            </section>

            <section className="legal-section">
                <h2>Support</h2>
                <p>
                    Having trouble with your account? Found a bug? Our support team is here to help.
                </p>
                <p>
                    <strong>Email:</strong> support@socialapp.com<br />
                    <strong>Hours:</strong> Mon-Fri, 9am - 5pm EST
                </p>
            </section>

            <section className="legal-section">
                <h2>General Inquiries</h2>
                <p>
                    For press, partnerships, or general questions about Social App.
                </p>
                <p>
                    <strong>Email:</strong> hello@socialapp.com
                </p>
            </section>

            <section className="legal-section">
                <h2>Legal & Privacy</h2>
                <p>
                    For questions related to our Terms of Service, Privacy Policy, or data practices.
                </p>
                <p>
                    <strong>Email:</strong> legal@socialapp.com
                </p>
            </section>

            <section className="legal-section">
                <h2>Mailing Address</h2>
                <p>
                    Social App Inc.<br />
                    123 Social Way<br />
                    Tech City, TC 90210<br />
                    United States
                </p>
            </section>
        </LegalPage>
    );
};

export default Contact;

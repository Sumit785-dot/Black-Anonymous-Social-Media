import React from 'react';
import LegalPage from '../components/LegalPage';

const CommunityGuidelines = () => {
    return (
        <LegalPage title="Community Guidelines" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    Social App is designed to be a safe, welcoming, and inclusive space for everyone. These guidelines explain
                    what is allowed and what isn't. By using Social App, you agree to follow these rules.
                </p>
            </section>

            <section className="legal-section">
                <h2>1. Be Respectful</h2>
                <p>
                    Treat others the way you want to be treated. We do not tolerate harassment, bullying, or abuse.
                    Disagreements are fine, but personal attacks are not.
                </p>
            </section>

            <section className="legal-section">
                <h2>2. No Hate Speech</h2>
                <p>
                    We have zero tolerance for hate speech. This includes content that attacks, threatens, incites violence against,
                    or dehumanizes individuals or groups based on race, ethnicity, national origin, caste, sexual orientation,
                    gender, gender identity, religious affiliation, age, disability, or serious disease.
                </p>
            </section>

            <section className="legal-section">
                <h2>3. Safety First</h2>
                <p>
                    Do not post content that encourages self-harm, suicide, or dangerous activities. If you see someone in crisis,
                    please report it immediately so we can provide resources.
                </p>
            </section>

            <section className="legal-section">
                <h2>4. No Illegal Content</h2>
                <p>
                    Do not use Social App for any illegal activities or to promote illegal acts. This includes selling illegal
                    goods or services, or posting content that violates local laws.
                </p>
            </section>

            <section className="legal-section">
                <h2>5. Spam and Manipulation</h2>
                <p>
                    Do not spam users or attempt to artificially amplify content. This includes posting repetitive comments,
                    creating fake accounts, or buying/selling engagement.
                </p>
            </section>

            <section className="legal-section">
                <h2>6. Enforcement</h2>
                <p>
                    We may remove content or suspend accounts that violate these guidelines. In severe cases, we may permanently
                    ban users and report illegal content to law enforcement.
                </p>
            </section>
        </LegalPage>
    );
};

export default CommunityGuidelines;

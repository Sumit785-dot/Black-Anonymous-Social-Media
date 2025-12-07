import React from 'react';
import LegalPage from '../components/LegalPage';

const CopyrightPolicy = () => {
    return (
        <LegalPage title="Copyright Policy" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    Social App respects the intellectual property rights of others and expects its users to do the same.
                    It is our policy to respond to clear notices of alleged copyright infringement that comply with the
                    Digital Millennium Copyright Act (DMCA).
                </p>
            </section>

            <section className="legal-section">
                <h2>1. Reporting Copyright Infringement</h2>
                <p>
                    If you believe that your work has been copied in a way that constitutes copyright infringement, please
                    provide our Copyright Agent with the following information:
                </p>
                <ul>
                    <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed.</li>
                    <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity.</li>
                    <li>Your contact information, including your address, telephone number, and an email address.</li>
                    <li>A statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>2. Counter-Notification</h2>
                <p>
                    If you believe that your content was removed by mistake or misidentification, you may send a counter-notification
                    to our Copyright Agent.
                </p>
            </section>

            <section className="legal-section">
                <h2>3. Repeat Infringers</h2>
                <p>
                    It is our policy to terminate the accounts of repeat infringers in appropriate circumstances.
                </p>
            </section>

            <section className="legal-section">
                <h2>4. Contact Information</h2>
                <p>
                    You can contact our Copyright Agent at:
                </p>
                <p>
                    <strong>Email:</strong> copyright@socialapp.com<br />
                    <strong>Address:</strong> 123 Social Way, Tech City, TC 90210
                </p>
            </section>
        </LegalPage>
    );
};

export default CopyrightPolicy;

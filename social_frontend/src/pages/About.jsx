import React from 'react';
import LegalPage from '../components/LegalPage';

const About = () => {
    return (
        <LegalPage title="About Us" lastUpdated="December 3, 2025">
            <section className="legal-section">
                <p>
                    Social App is a new kind of social platform built on the principles of simplicity, privacy, and genuine connection.
                    We stripped away the noise, the algorithms, and the data tracking to bring you a social experience that puts
                    you back in control.
                </p>
            </section>

            <section className="legal-section">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to connect the world without exploiting it. We believe that social media should be a tool for
                    connection, not a machine for surveillance capitalism. We are committed to building a sustainable platform
                    that respects your time, your attention, and your privacy.
                </p>
            </section>

            <section className="legal-section">
                <h2>The Design</h2>
                <p>
                    You might notice our strict black and white aesthetic. This isn't just a style choice—it's a statement.
                    By removing the colorful distractions designed to trigger dopamine hits, we create a calmer, more focused
                    environment where the content speaks for itself.
                </p>
            </section>

            <section className="legal-section">
                <h2>The Team</h2>
                <p>
                    We are a small, passionate team of developers, designers, and dreamers who got tired of the status quo.
                    We built Social App because it was the platform we wanted to use ourselves.
                </p>
            </section>

            <section className="legal-section">
                <h2>Join Us</h2>
                <p>
                    We are just getting started. Join us on this journey to reclaim social media for the people.
                </p>
            </section>
        </LegalPage>
    );
};

export default About;

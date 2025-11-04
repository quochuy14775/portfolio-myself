import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/yourname", icon: "🔗" },
        { name: "LinkedIn", url: "https://linkedin.com/in/yourname", icon: "💼" },
        { name: "Twitter", url: "https://twitter.com/yourname", icon: "🐦" },
        { name: "Email", url: "mailto:yourname@example.com", icon: "✉️" },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Logo & Description */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-bracket">{"<"}</span>
                            <span className="logo-text">QH</span>
                            <span className="logo-bracket">{"/>"}</span>
                        </div>
                        <p className="footer-description">
                            Building digital experiences with passion and precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/projects">Projects</a>
                        <a href="/contact">Contact</a>
                    </div>

                    {/* Social Links */}
                    <div className="footer-social">
                        <h4>Connect</h4>
                        <div className="social-icons">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Quoc Huy. All rights reserved.</p>
                    <p className="footer-tagline">
                        Made with <span className="heart">❤️</span> and <span className="code">{"</>"}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

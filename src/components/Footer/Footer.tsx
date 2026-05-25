import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/yourname", label: "GH" },
        { name: "LinkedIn", url: "https://linkedin.com/in/yourname", label: "IN" },
        { name: "Twitter", url: "https://twitter.com/yourname", label: "X" },
        { name: "Email", url: "mailto:yourname@example.com", label: "@" },
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
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
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
                                    className="social-icon mono"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={social.name}
                                >
                                    {social.label}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Quoc Huy. All rights reserved.</p>
                    <p className="footer-tagline">
                        Built with <span className="code">React · TypeScript · GSAP</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

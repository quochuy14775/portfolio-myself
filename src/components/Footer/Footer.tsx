import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/quochuy14775", Icon: SiGithub },
        { name: "LinkedIn", url: "https://linkedin.com/in/quochuy14775", Icon: FaLinkedin },
        { name: "Twitter", url: "https://twitter.com/quochuy14775", Icon: SiX },
        { name: "Email", url: "mailto:qhuy14775@gmail.com", Icon: Mail },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-bracket">{"<"}</span>
                            <span className="logo-text">QuocHuy</span>
                            <span className="logo-bracket">{"/>"}</span>
                        </div>
                        <p className="footer-description">
                            Fullstack developer building robust .NET + React applications.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-social">
                        <h4>Connect</h4>
                        <div className="social-icons">
                            {socialLinks.map(({ name, url, Icon }) => (
                                <motion.a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={name}
                                    aria-label={name}
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Đặng Quốc Huy. All rights reserved.</p>
                    <p className="footer-tagline">
                        Built with <span className="code">React · TypeScript · GSAP</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

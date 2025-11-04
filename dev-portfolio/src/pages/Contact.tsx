import { motion } from "framer-motion";
import { useState } from "react";
import "./Contact.css";

const socialLinks = [
    {
        name: "GitHub",
        icon: "🔗",
        url: "https://github.com/yourname",
        color: "#333"
    },
    {
        name: "LinkedIn",
        icon: "💼",
        url: "https://linkedin.com/in/yourname",
        color: "#0077B5"
    },
    {
        name: "Twitter",
        icon: "🐦",
        url: "https://twitter.com/yourname",
        color: "#1DA1F2"
    },
    {
        name: "Email",
        icon: "✉️",
        url: "mailto:yourname@example.com",
        color: "#EA4335"
    }
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Message sent! I'll get back to you soon.");
        // Reset form
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setStatus("");
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="contact-container">
                {/* Header */}
                <motion.div
                    className="contact-header"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="contact-title">
                        Get In <span className="highlight-gradient">Touch</span>
                    </h1>
                    <p className="contact-subtitle">
                        Let's work together on your next project
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="submit-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Send Message</span>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>

                            {status && (
                                <motion.div
                                    className="status-message"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {status}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="info-card">
                            <h3 className="info-title">Contact Information</h3>
                            <div className="info-items">
                                <div className="info-item">
                                    <span className="info-icon">📧</span>
                                    <div>
                                        <p className="info-label">Email</p>
                                        <p className="info-value">yourname@example.com</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">📱</span>
                                    <div>
                                        <p className="info-label">Phone</p>
                                        <p className="info-value">+84 123 456 789</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">📍</span>
                                    <div>
                                        <p className="info-label">Location</p>
                                        <p className="info-value">Vietnam</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            <h3 className="social-title">Connect With Me</h3>
                            <div className="social-grid">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        className="social-card"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="social-icon">{social.icon}</span>
                                        <span className="social-name">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

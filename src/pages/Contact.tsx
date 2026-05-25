import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import "./Contact.css";

const socialLinks = [
    { name: "GitHub", url: "https://github.com/quochuy14775", Icon: SiGithub },
    { name: "LinkedIn", url: "https://linkedin.com/in/quochuy14775", Icon: FaLinkedin },
    { name: "Twitter", url: "https://twitter.com/quochuy14775", Icon: SiX },
    { name: "Email", url: "mailto:qhuy14775@gmail.com", Icon: Mail },
];

const infoItems = [
    { label: "Email", value: "qhuy14775@gmail.com", Icon: Mail },
    { label: "Phone", value: "+84 768 464 821", Icon: Phone },
    { label: "Location", value: "Quy Nhơn, Gia Lai · Vietnam", Icon: MapPin },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Message sent! I'll get back to you soon.");
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setStatus("");
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="contact-container">
                <motion.div
                    className="contact-header"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="contact-title">
                        Get In <span className="highlight-gradient">Touch</span>
                    </h1>
                    <p className="contact-subtitle">
                        Let's work together on your next project
                    </p>
                </motion.div>

                <div className="contact-content">
                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Send Message</span>
                                <Send size={16} strokeWidth={2} />
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

                    <motion.div
                        className="contact-info"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="info-card">
                            <h3 className="info-title">Contact Information</h3>
                            <div className="info-items">
                                {infoItems.map(({ label, value, Icon }) => (
                                    <div key={label} className="info-item">
                                        <span className="info-icon">
                                            <Icon size={16} strokeWidth={1.8} />
                                        </span>
                                        <div>
                                            <p className="info-label">{label}</p>
                                            <p className="info-value">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="social-links">
                            <h3 className="social-title">Connect With Me</h3>
                            <div className="social-grid">
                                {socialLinks.map(({ name, url, Icon }, index) => (
                                    <motion.a
                                        key={name}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.45 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="social-icon">
                                            <Icon size={18} />
                                        </span>
                                        <span className="social-name">{name}</span>
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

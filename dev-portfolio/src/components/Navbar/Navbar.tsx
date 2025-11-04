import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const paths = ["/", "/about", "/projects", "/contact", "/resume"];
    const labels = ["Home", "About", "Projects", "Contact", "Resume"];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                {/* Logo */}
                <NavLink to="/" className="navbar-logo">
                    <span className="logo-bracket">{"<"}</span>
                    <span className="logo-text">QH</span>
                    <span className="logo-bracket">{"/>"}</span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    {paths.map((path, idx) => (
                        <NavLink
                            key={idx}
                            to={path}
                            className={({ isActive }) =>
                                isActive ? "navlink active" : "navlink"
                            }
                        >
                            {labels[idx]}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {paths.map((path, idx) => (
                            <NavLink
                                key={idx}
                                to={path}
                                className={({ isActive }) =>
                                    isActive ? "mobile-navlink active" : "mobile-navlink"
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {labels[idx]}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import "./Navbar.css";

type NavItem = { id: string; label: string; type: "section" | "route"; href?: string };

const navItems: NavItem[] = [
    { id: "home", label: "Home", type: "section" },
    { id: "about", label: "About", type: "section" },
    { id: "projects", label: "Projects", type: "section" },
    { id: "contact", label: "Contact", type: "section" },
    { id: "resume", label: "Resume", type: "route", href: "/resume" },
];

const sectionIds = navItems.filter((n) => n.type === "section").map((n) => n.id);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const activeSection = useActiveSection(sectionIds, 80);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(null, "", `#${id}`);
        }
        setIsMobileMenuOpen(false);
    };

    const isActive = (item: NavItem) => {
        if (item.type === "route") {
            return window.location.pathname === item.href;
        }
        return activeSection === item.id;
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? "scrolled" : ""}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="navbar-container">
                <button
                    type="button"
                    className="navbar-logo"
                    onClick={() => scrollTo("home")}
                    aria-label="Home"
                >
                    <span className="logo-bracket">{"<"}</span>
                    <span className="logo-text">QuocHuy</span>
                    <span className="logo-bracket">{"/>"}</span>
                </button>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        const content = (
                            <>
                                {active && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="nav-pill"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="nav-label">{item.label}</span>
                            </>
                        );

                        if (item.type === "route") {
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className={`navlink ${active ? "active" : ""}`}
                                >
                                    {content}
                                </a>
                            );
                        }
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollTo(item.id)}
                                className={`navlink ${active ? "active" : ""}`}
                            >
                                {content}
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMobileMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {navItems.map((item) =>
                            item.type === "route" ? (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className={`mobile-navlink ${isActive(item) ? "active" : ""}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollTo(item.id)}
                                    className={`mobile-navlink ${isActive(item) ? "active" : ""}`}
                                >
                                    {item.label}
                                </button>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

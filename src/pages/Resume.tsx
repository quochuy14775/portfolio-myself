import { motion } from "framer-motion";

export default function Resume() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
                minHeight: "100vh",
                padding: "140px 1.5rem 80px",
                maxWidth: 720,
                margin: "0 auto",
                position: "relative",
                zIndex: 1,
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    marginBottom: "0.75rem",
                }}
            >
                Resume
            </h1>
            <p style={{ color: "var(--fg-muted)", marginBottom: "2rem", fontSize: "1.05rem" }}>
                A snapshot of my experience, skills, and selected work.
            </p>

            <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.1rem",
                    background: "var(--accent)",
                    color: "var(--accent-fg)",
                    border: "1px solid var(--accent)",
                    borderRadius: "var(--radius)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                }}
            >
                Download PDF
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.a>
        </motion.div>
    );
}

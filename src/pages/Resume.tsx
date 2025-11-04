import { motion } from "framer-motion";

export default function Resume() {
    return (
        <motion.div
            className="max-w-3xl mx-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="text-3xl font-bold mb-4">Resume</h2>
            <p>Here you can download my resume:</p>
            <a
                href="/resume.pdf"
                target="_blank"
                className="text-yellow-400 hover:underline mt-2 inline-block"
            >
                Download Resume
            </a>
        </motion.div>
    );
}

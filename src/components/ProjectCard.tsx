import { motion } from "framer-motion";

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
}

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
        >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="mb-4">{description}</p>
            <a
                href={link}
                target="_blank"
                className="text-yellow-400 hover:underline"
            >
                View Project
            </a>
        </motion.div>
    );
}

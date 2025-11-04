import { motion } from "framer-motion";
import { useState } from "react";
import "./Project.css";

const projects = [
    {
        title: "Portfolio Website",
        description: "A personal developer portfolio with modern animations and interactive elements",
        link: "#",
        category: "Frontend",
        tech: ["React", "TypeScript", "GSAP"],
        image: "🎨"
    },
    {
        title: "E-commerce App",
        description: "Online store built with React & Tailwind with shopping cart functionality",
        link: "#",
        category: "Full Stack",
        tech: ["React", "Node.js", "MongoDB"],
        image: "🛒"
    },
    {
        title: "Blog Platform",
        description: "Fullstack blog app with TypeScript & Node.js featuring rich text editor",
        link: "#",
        category: "Full Stack",
        tech: ["TypeScript", "Node.js", "PostgreSQL"],
        image: "📝"
    },
    {
        title: "Task Manager",
        description: "Productivity app with drag-and-drop functionality and real-time updates",
        link: "#",
        category: "Frontend",
        tech: ["React", "Redux", "Firebase"],
        image: "✅"
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather app with beautiful UI and location-based forecasts",
        link: "#",
        category: "Frontend",
        tech: ["React", "API Integration", "Chart.js"],
        image: "🌤️"
    },
    {
        title: "Social Media API",
        description: "RESTful API for social media platform with authentication and authorization",
        link: "#",
        category: "Backend",
        tech: ["Node.js", "Express", "JWT"],
        image: "🔗"
    },
];

const categories = ["All", "Frontend", "Backend", "Full Stack"];

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <motion.div
            className="projects-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="projects-container">
                {/* Header */}
                <motion.div
                    className="projects-header"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="projects-title">
                        My <span className="highlight-gradient">Projects</span>
                    </h1>
                    <p className="projects-subtitle">
                        A collection of my recent work and side projects
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="filter-buttons"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="projects-grid"
                    layout
                >
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            layout
                        >
                            <div className="project-icon">{project.image}</div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <motion.a
                                    href={project.link}
                                    className="project-link"
                                    whileHover={{ x: 5 }}
                                >
                                    View Project
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

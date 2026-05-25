import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Calendar, Star, Database, Cloud } from "lucide-react";
import {
    SiDotnet,
    SiSharp,
    SiNextdotjs,
    SiReact,
    SiMongodb,
    SiDocker,
    SiJsonwebtokens,
    SiGithub,
} from "react-icons/si";
import { useTilt } from "../hooks/useTilt";
import "./Project.css";

interface Tech {
    name: string;
    icon: React.ElementType;
}

interface Project {
    title: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    tech: Tech[];
    repos: { label: string; url: string }[];
    featured?: boolean;
}

const projects: Project[] = [
    {
        title: "AI-Powered English Center Management System",
        role: "Full-stack Developer",
        period: "04/2025 — 08/2025",
        description:
            "End-to-end management platform for English centers with class scheduling, attendance tracking, and student management — deployed on Microsoft Azure.",
        highlights: [
            "Built RESTful APIs with OData for server-side filtering, sorting & pagination — drastically reducing payload size on large tables.",
            "Implemented JWT-based authentication & role-based access control across all modules.",
            "Integrated QR-code check-in and external face-recognition API for attendance verification.",
            "Optimized EF Core queries with eager loading, projection, and N+1 mitigation.",
        ],
        tech: [
            { name: ".NET 8", icon: SiDotnet },
            { name: "C#", icon: SiSharp },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "SQL Server", icon: Database },
            { name: "MongoDB", icon: SiMongodb },
            { name: "Azure", icon: Cloud },
            { name: "JWT", icon: SiJsonwebtokens },
        ],
        repos: [
            { label: "Frontend", url: "https://github.com/quochuy14775/AICMSFE" },
            { label: "Backend", url: "https://github.com/quochuy14775/AICMSBE" },
        ],
        featured: true,
    },
    {
        title: "Taskify — Task & Project Management",
        role: "Full-stack Developer",
        period: "05/2024 — 07/2024",
        description:
            "Kanban-style task and project management application with role-based collaboration, containerized with Docker for consistent dev/prod environments.",
        highlights: [
            "Designed Controller — Service — Repository architecture with Dependency Injection for clean separation of concerns.",
            "OData-powered API endpoints for filtering, sorting & pagination at the database layer.",
            "JWT authentication with role-based authorization for multi-tenant access control.",
            "Dockerized full stack — consistent environments from local dev to production deployment.",
        ],
        tech: [
            { name: ".NET 8", icon: SiDotnet },
            { name: "C#", icon: SiSharp },
            { name: "React", icon: SiReact },
            { name: "SQL Server", icon: Database },
            { name: "JWT", icon: SiJsonwebtokens },
            { name: "Docker", icon: SiDocker },
        ],
        repos: [
            { label: "Frontend", url: "https://github.com/Neslep/Taskify.FE" },
            { label: "Backend", url: "https://github.com/neslep/taskify" },
        ],
    },
];

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    useTilt(ref, 4);

    return (
        <motion.div
            ref={ref}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="project-card-inner">
                <div className="project-meta">
                    <span className="project-period mono">
                        <Calendar size={12} strokeWidth={2} />
                        {project.period}
                    </span>
                    {project.featured && (
                        <span className="project-featured mono">
                            <Star size={12} strokeWidth={2} fill="currentColor" />
                            Featured
                        </span>
                    )}
                </div>

                <div className="project-head">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-role mono">{project.role}</p>
                </div>

                <p className="project-description">{project.description}</p>

                <ul className="project-highlights">
                    {project.highlights.map((h, i) => (
                        <li key={i}>
                            <span className="bullet" aria-hidden="true" />
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <div className="project-tech">
                    {project.tech.map(({ name, icon: Icon }) => (
                        <span key={name} className="tech-tag" title={name}>
                            <Icon className="tech-icon" />
                            <span className="tech-name">{name}</span>
                        </span>
                    ))}
                </div>

                <div className="project-actions">
                    {project.repos.map((r) => (
                        <a
                            key={r.label}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-action"
                        >
                            <SiGithub size={14} />
                            <span>{r.label}</span>
                            <ArrowUpRight size={12} strokeWidth={2} className="action-arrow" />
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <motion.div
            className="projects-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="projects-eyebrow mono">{"// selected.work"}</span>
                    <h1 className="projects-title">
                        Featured <span className="highlight-gradient">Projects</span>
                    </h1>
                    <p className="projects-subtitle">
                        End-to-end systems I built — from RESTful API design and EF Core
                        optimization to React/Next.js frontends and Azure deployment.
                    </p>
                </motion.div>

                <div className="projects-list">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} idx={idx} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

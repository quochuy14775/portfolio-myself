import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTilt } from "../hooks/useTilt";
import GitHubStats from "../components/GitHubStats/GitHubStats";
import "./About.css";

const skills = [
    "React", "TypeScript", "Node.js", "Next.js",
    "GSAP", "Tailwind", "PostgreSQL", "Docker",
    "Git", "GraphQL", "Vite", "Framer Motion"
];

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
}

const experiences: Experience[] = [
    {
        title: "Fullstack Developer",
        company: "Tri Thanh Software",
        period: "11/2024 — 12/2025",
        description:
            "Built and maintained production web applications using Vue 3 and ASP.NET Core Web API — full ownership from API design to frontend integration.",
        highlights: [
            "Designed RESTful APIs with EF Core + LINQ — optimized queries via eager loading (Include), projection (Select), and N+1 mitigation.",
            "Integrated OData ($filter, $orderby, $top, $skip) for server-side filtering and pagination, drastically reducing payload size on large tables.",
            "Applied OOP & SOLID with Controller–Service–Repository architecture and Dependency Injection to keep modules loosely coupled.",
            "Built a reusable Vue 3 component library (forms, tables, dialogs) — cut duplicate code and accelerated feature delivery.",
            "Improved app performance by trimming API response payloads, eliminating redundant requests, and refactoring components to prevent unnecessary re-renders.",
        ],
    },
    {
        title: "Backend Developer",
        company: "FPT Software Quy Nhơn",
        period: "04/2024 — 10/2024",
        description:
            "Developed RESTful APIs with ASP.NET Core in an Agile Scrum team, focusing on clean architecture and reliable error handling.",
        highlights: [
            "Built APIs with Controller–Service–Repository pattern; used IServiceCollection-based DI to decouple components.",
            "Implemented logging and global exception-handling middleware for centralized request/response tracking.",
            "Analyzed logs & stack traces to root-cause production issues and adjusted business logic accordingly.",
            "Collaborated with the ReactJS frontend team — defined response contracts and resolved integration issues.",
            "Worked with GitLab — branching strategy, merge requests, and active participation in code reviews.",
        ],
    },
];

function BentoCard({
    className = "",
    children,
    tiltMax = 4,
}: {
    className?: string;
    children: React.ReactNode;
    tiltMax?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useTilt(ref, tiltMax);
    return (
        <div ref={ref} className={`bento-card ${className}`}>
            <div className="bento-card-inner">{children}</div>
        </div>
    );
}

function LiveTime() {
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const hh = String(time.getHours()).padStart(2, "0");
    const mm = String(time.getMinutes()).padStart(2, "0");
    const ss = String(time.getSeconds()).padStart(2, "0");
    return (
        <>
            <span className="bento-label">Local time · Vietnam</span>
            <span className="bento-time mono">
                {hh}:{mm}<span className="bento-time-sec">:{ss}</span>
            </span>
            <span className="bento-sub">GMT+7 · {time.toLocaleDateString("en-US", { weekday: "long" })}</span>
        </>
    );
}

export default function About() {
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-card", {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.06,
            });
        }, skillsRef);
        return () => ctx.revert();
    }, []);

    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="about-container" ref={skillsRef}>
                <motion.div
                    className="about-hero"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="about-title">
                        About <span className="highlight-gradient">Me</span>
                    </h1>
                    <p className="about-subtitle">
                        Passionate developer crafting digital experiences with code.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="bento-grid">
                    {/* Bio — big card */}
                    <BentoCard className="bento-bio" tiltMax={3}>
                        <span className="bento-label">{"// who.am.i"}</span>
                        <h2 className="bento-heading">
                            I build performant, beautiful web apps.
                        </h2>
                        <p className="bento-paragraph">
                            Specializing in React, TypeScript, and modern frontend
                            architecture. I care about details — micro-interactions,
                            type safety, and shipping fast without breaking things.
                        </p>
                    </BentoCard>

                    {/* Status */}
                    <BentoCard className="bento-status">
                        <span className="bento-label">Status</span>
                        <div className="bento-status-row">
                            <span className="status-dot-lg" />
                            <span className="bento-status-text">Available</span>
                        </div>
                        <span className="bento-sub">Open to opportunities</span>
                    </BentoCard>

                    {/* Location */}
                    <BentoCard className="bento-location">
                        <span className="bento-label">Based in</span>
                        <h3 className="bento-big">Vietnam</h3>
                        <span className="bento-sub mono">10.76°N · 106.66°E</span>
                    </BentoCard>

                    {/* Live time */}
                    <BentoCard className="bento-clock">
                        <LiveTime />
                    </BentoCard>

                    {/* GitHub stats — custom heatmap */}
                    <BentoCard className="bento-github" tiltMax={2}>
                        <GitHubStats username="quochuy14775" />
                    </BentoCard>

                    {/* Skills */}
                    <BentoCard className="bento-skills" tiltMax={3}>
                        <span className="bento-label">Stack</span>
                        <div className="bento-skills-grid">
                            {skills.map((skill) => (
                                <span key={skill} className="bento-skill mono">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Experience — full width */}
                    <div className="bento-card bento-experience">
                        <div className="bento-card-inner">
                            <span className="bento-label">Experience</span>
                            <div className="timeline">
                                {experiences.map((exp, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="timeline-item"
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="timeline-marker" />
                                        <div className="timeline-content">
                                            <div className="exp-head">
                                                <h3 className="exp-title">{exp.title}</h3>
                                                <span className="exp-period mono">{exp.period}</span>
                                            </div>
                                            <p className="exp-company">{exp.company}</p>
                                            <p className="exp-description">{exp.description}</p>
                                            <ul className="exp-highlights">
                                                {exp.highlights.map((h, i) => (
                                                    <li key={i}>
                                                        <span className="exp-bullet" aria-hidden="true" />
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

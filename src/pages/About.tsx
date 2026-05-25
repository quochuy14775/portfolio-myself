import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTilt } from "../hooks/useTilt";
import "./About.css";

const skills = [
    "React", "TypeScript", "Node.js", "Next.js",
    "GSAP", "Tailwind", "PostgreSQL", "Docker",
    "Git", "GraphQL", "Vite", "Framer Motion"
];

const experiences = [
    {
        title: "Full Stack Developer",
        company: "Tech Company",
        period: "2022 — Present",
        description: "Building scalable web applications using modern technologies"
    },
    {
        title: "Frontend Developer",
        company: "Startup Inc",
        period: "2020 — 2022",
        description: "Created responsive and interactive user interfaces"
    }
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

                    {/* GitHub stats — embed */}
                    <BentoCard className="bento-github" tiltMax={3}>
                        <div className="bento-github-head">
                            <span className="bento-label">GitHub activity</span>
                            <a
                                href="https://github.com/yourname"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bento-link mono"
                            >
                                @yourname ↗
                            </a>
                        </div>
                        <img
                            src="https://github-readme-stats.vercel.app/api?username=yourname&show_icons=true&theme=transparent&hide_border=true&title_color=fafafa&text_color=a1a1aa&icon_color=fafafa"
                            alt="GitHub stats"
                            className="bento-github-img"
                            loading="lazy"
                        />
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
                                            <h3 className="exp-title">{exp.title}</h3>
                                            <p className="exp-company">{exp.company}</p>
                                            <p className="exp-period mono">{exp.period}</p>
                                            <p className="exp-description">{exp.description}</p>
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

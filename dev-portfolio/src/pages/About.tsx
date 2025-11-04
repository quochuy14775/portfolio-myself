import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./About.css";

const skills = [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "TypeScript", level: 85, icon: "📘" },
    { name: "Node.js", level: 80, icon: "🟢" },
    { name: "GSAP", level: 75, icon: "🎨" },
    { name: "CSS/SCSS", level: 88, icon: "🎨" },
    { name: "Git", level: 85, icon: "🔧" }
];

const experiences = [
    {
        title: "Full Stack Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description: "Building scalable web applications using modern technologies"
    },
    {
        title: "Frontend Developer",
        company: "Startup Inc",
        period: "2020 - 2022",
        description: "Created responsive and interactive user interfaces"
    }
];

export default function About() {
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".skill-bar-fill", {
                width: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.1,
                delay: 0.5
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
            <div className="about-container">
                {/* Hero Section */}
                <motion.div
                    className="about-hero"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="about-title">
                        About <span className="highlight-gradient">Me</span>
                    </h1>
                    <p className="about-subtitle">
                        Passionate developer crafting digital experiences
                    </p>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    className="bio-section"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bio-card">
                        <h2 className="section-title">My Story</h2>
                        <p className="bio-text">
                            I am a web developer specializing in React, TypeScript, and modern frontend technologies.
                            With a passion for creating beautiful and performant applications, I strive to deliver
                            exceptional user experiences.
                        </p>
                        <p className="bio-text">
                            I love building performant, beautiful, and user-friendly web applications that solve
                            real-world problems. My goal is to create seamless digital experiences that users love.
                        </p>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    ref={skillsRef}
                    className="skills-section"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2 className="section-title">Technical Skills</h2>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-card"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="skill-header">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-percent">{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                    <div
                                        className="skill-bar-fill"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                    className="experience-section"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h2 className="section-title">Experience</h2>
                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 + index * 0.2 }}
                                whileHover={{ x: 10 }}
                            >
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3 className="exp-title">{exp.title}</h3>
                                    <p className="exp-company">{exp.company}</p>
                                    <p className="exp-period">{exp.period}</p>
                                    <p className="exp-description">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

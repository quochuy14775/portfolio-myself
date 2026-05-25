import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useSpotlight } from "../../hooks/useSpotlight";
import "./Home.css";

const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer"];

export default function Home() {
    // HeroText refs & state
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
    const btnSecondaryRef = useRef<HTMLAnchorElement>(null);

    useSpotlight(sectionRef);
    useMagnetic(btnPrimaryRef, 0.3);
    useMagnetic(btnSecondaryRef, 0.3);

    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);

    // Enhanced GSAP animations with stagger
    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
            .fromTo(titleRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
            .fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.5"
            )
            .fromTo(ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.4"
            )
            .fromTo(avatarRef.current,
                { scale: 0.8, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1 },
                "-=0.8"
            );
    }, []);

    // Typing effect
    useEffect(() => {
        let index = 0;
        let timeout: NodeJS.Timeout;

        const type = () => {
            const currentRole = roles[roleIndex];
            if (index < currentRole.length) {
                setText(currentRole.slice(0, index + 1));
                index++;
                timeout = setTimeout(type, 100);
            } else {
                timeout = setTimeout(() => {
                    index = 0;
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                    setText("");
                    type();
                }, 2000);
            }
        };

        type();
        return () => clearTimeout(timeout);
    }, [roleIndex]);

    // Blobs refs & scroll parallax
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${scroll * 0.3}px) rotate(${scroll * 0.1}deg)`;
            if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${scroll * -0.2}px) rotate(${-scroll * 0.1}deg)`;
            if (blob3Ref.current) blob3Ref.current.style.transform = `translateY(${scroll * 0.15}px)`;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Mouse move effect for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            if (avatarRef.current) {
                gsap.to(avatarRef.current, {
                    x: x,
                    y: y,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={sectionRef} className="home-section">
            {/* Animated background grid */}
            <div className="grid-background"></div>

            {/* Particle Background */}
            <ParticleBackground />

            {/* HeroText */}
            <div className="hero-left">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 ref={titleRef} className="hero-title">
                        Hi, I'm <span className="highlight">Quoc Huy</span>
                        <br />
                        <span className="role">{text}</span>
                        <span className="blinking-cursor">|</span>
                    </h1>
                </motion.div>

                <p ref={subtitleRef} className="hero-subtitle">
                    I build robust and scalable software solutions that solve real-world problems efficiently.
                </p>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="cta-buttons">
                    <a ref={btnPrimaryRef} href="#contact" className="btn btn-primary">
                        <span>Get In Touch</span>
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    <a ref={btnSecondaryRef} href="#projects" className="btn btn-secondary">
                        View Projects
                    </a>
                </div>

                {/* Tech Stack Icons */}
                <div className="tech-stack">
                    {['React', 'TypeScript', 'Node.js', 'GSAP'].map((tech, index) => (
                        <motion.div
                            key={tech}
                            className="tech-badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, scale: 1.1 }}
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right Avatar with floating effect */}
            <div className="home-right">
                <div ref={avatarRef} className="avatar-container">
                    <div className="avatar-wrapper">
                        <img
                            src="/IMG_3159.jpg"
                            alt="Avatar"
                            className="avatar-img"
                        />
                        {/* Floating rings */}
                        <div className="avatar-ring ring-1"></div>
                        <div className="avatar-ring ring-2"></div>
                        <div className="avatar-ring ring-3"></div>
                    </div>

                    {/* Floating status badge */}
                    <motion.div
                        className="status-badge"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                    >
                        <span className="status-dot"></span>
                        Available for work
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Blobs */}
            <div ref={blob1Ref} className="blob blob1" />
            <div ref={blob2Ref} className="blob blob2" />
            <div ref={blob3Ref} className="blob blob3" />

            {/* Floating geometric shapes */}
            <motion.div
                className="floating-shape shape-1"
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="floating-shape shape-2"
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -180, -360]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 2 },
                    y: { duration: 2, repeat: Infinity }
                }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <p>Scroll Down</p>
            </motion.div>
        </section>
    );
}

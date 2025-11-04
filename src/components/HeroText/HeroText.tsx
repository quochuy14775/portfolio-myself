    import { useEffect, useRef, useState } from "react";
    import { gsap } from "gsap";
    import "./HeroText.css";

    const roles = ["React Developer", "Frontend Enthusiast", "TypeScript Lover"];

    interface HeroTextProps {
        onButtonClick?: () => void;
    }

    export default function HeroText({ onButtonClick }: HeroTextProps) {
        const titleRef = useRef<HTMLHeadingElement>(null);
        const subtitleRef = useRef<HTMLParagraphElement>(null);
        const buttonRef = useRef<HTMLAnchorElement>(null);

        const [text, setText] = useState("");
        const [roleIndex, setRoleIndex] = useState(0);

        useEffect(() => {
            const tl = gsap.timeline();
            tl.from(titleRef.current, { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
                .from(subtitleRef.current, { y: -30, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(buttonRef.current, { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
        }, []);

        useEffect(() => {
            let index = 0;
            let timeout: NodeJS.Timeout;

            const type = () => {
                const currentRole = roles[roleIndex];
                if (index < currentRole.length) {
                    setText(currentRole.slice(0, index + 1));
                    index++;
                    timeout = setTimeout(type, 150);
                } else {
                    timeout = setTimeout(() => {
                        index = 0;
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                        setText("");
                        type();
                    }, 1500);
                }
            };

            type();
            return () => clearTimeout(timeout);
        }, [roleIndex]);

        return (
            <div className="hero-left">
                <h1 ref={titleRef} className="hero-title">
                    Hi, I'm <span className="highlight">Quoc Huy</span>
                    <br />
                    <span className="role">{text}</span>
                    <span className="blinking-cursor">|</span>
                </h1>
                <p ref={subtitleRef} className="hero-subtitle">
                    I create modern and responsive web applications using React, TypeScript, and CSS.
                </p>
                <a
                    ref={buttonRef}
                    href="/projects"
                    className="hero-button"
                    onClick={onButtonClick}
                >
                    View Projects
                </a>
            </div>
        );
    }

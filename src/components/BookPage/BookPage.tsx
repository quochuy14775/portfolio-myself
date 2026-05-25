import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import "./BookPage.css";

interface BookPageProps {
    id: string;
    children: ReactNode;
    /** First page doesn't flip in (already visible on load) */
    isFirst?: boolean;
    /** Last page doesn't flip out */
    isLast?: boolean;
}

function useSmooth(mv: MotionValue<number>) {
    return useSpring(mv, { stiffness: 60, damping: 26, mass: 0.6 });
}

export default function BookPage({ id, children, isFirst = false, isLast = false }: BookPageProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        // 0 when bottom of section enters viewport bottom
        // 0.5 when section is centered
        // 1 when top of section leaves viewport top
        offset: ["start end", "end start"],
    });

    // Book page flip: rotates around horizontal axis (X)
    // Incoming page: -65deg → 0deg (flipping down toward viewer)
    // Outgoing page: 0deg → 65deg (flipping away upward)
    // Flat zone: page sits at rotateX=0 from 30% → 70% of scroll progress
    const rotateXRaw = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [isFirst ? 0 : -65, 0, 0, isLast ? 0 : 65]
    );
    const opacityRaw = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
    );
    const scaleRaw = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [isFirst ? 1 : 0.85, 1, 1, isLast ? 1 : 0.85]
    );
    // Shadow only visible while tilting; flat zone has no shadow
    const shadowRaw = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.6, 0, 0, 0.6]
    );

    const rotateX = useSmooth(rotateXRaw);
    const opacity = useSmooth(opacityRaw);
    const scale = useSmooth(scaleRaw);
    const shadow = useSmooth(shadowRaw);

    return (
        <div ref={ref} id={id} className="book-page-wrap">
            <motion.div
                className="book-page"
                style={{
                    rotateX,
                    opacity,
                    scale,
                    transformPerspective: 1800,
                    transformOrigin: "center center",
                }}
            >
                {children}
                {/* Page-flip shadow overlay */}
                <motion.div
                    className="book-page-shadow"
                    style={{ opacity: shadow }}
                    aria-hidden="true"
                />
            </motion.div>
        </div>
    );
}

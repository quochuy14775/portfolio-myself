import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./BookPage.css";

interface BookPageProps {
    id: string;
    children: ReactNode;
    isFirst?: boolean;
    isLast?: boolean;
}

function useSmooth(mv: MotionValue<number>) {
    return useSpring(mv, { stiffness: 60, damping: 26, mass: 0.6 });
}

export default function BookPage({ id, children, isFirst = false, isLast = false }: BookPageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(768);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Mobile: skip 3D flip entirely (causes sub-pixel blur on text).
    // Use a plain fade-in instead.
    const opacityRawMobile = useTransform(
        scrollYProgress,
        [0, 0.15, 0.85, 1],
        [isFirst ? 1 : 0.3, 1, 1, isLast ? 1 : 0.3]
    );
    const opacityMobile = useSmooth(opacityRawMobile);

    // Desktop: full book-flip
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
    const shadowRaw = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.6, 0, 0, 0.6]
    );

    const rotateX = useSmooth(rotateXRaw);
    const opacityDesktop = useSmooth(opacityRaw);
    const scale = useSmooth(scaleRaw);
    const shadow = useSmooth(shadowRaw);

    if (isMobile) {
        return (
            <div ref={ref} id={id} className="book-page-wrap book-page-wrap--mobile">
                <motion.div className="book-page book-page--flat" style={{ opacity: opacityMobile }}>
                    {children}
                </motion.div>
            </div>
        );
    }

    return (
        <div ref={ref} id={id} className="book-page-wrap">
            <motion.div
                className="book-page"
                style={{
                    rotateX,
                    opacity: opacityDesktop,
                    scale,
                    transformPerspective: 1800,
                    transformOrigin: "center center",
                }}
            >
                {children}
                <motion.div
                    className="book-page-shadow"
                    style={{ opacity: shadow }}
                    aria-hidden="true"
                />
            </motion.div>
        </div>
    );
}

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useTilt<T extends HTMLElement>(
    ref: RefObject<T | null>,
    max: number = 8
) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(hover: none)").matches) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(el, {
                rotationY: px * max,
                rotationX: -py * max,
                transformPerspective: 1000,
                transformOrigin: "center",
                duration: 0.4,
                ease: "power2.out",
            });
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        };

        const onLeave = () => {
            gsap.to(el, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.6,
                ease: "power3.out",
            });
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [ref, max]);
}

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useMagnetic<T extends HTMLElement>(
    ref: RefObject<T | null>,
    strength: number = 0.35
) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(hover: none)").matches) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * strength;
            const dy = (e.clientY - cy) * strength;
            gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
        };

        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [ref, strength]);
}

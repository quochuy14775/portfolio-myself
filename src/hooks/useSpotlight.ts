import { useEffect, RefObject } from "react";

export function useSpotlight<T extends HTMLElement>(ref: RefObject<T | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        };

        el.addEventListener("mousemove", onMove);
        return () => el.removeEventListener("mousemove", onMove);
    }, [ref]);
}

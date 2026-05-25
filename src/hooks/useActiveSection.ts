import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], offset: number = 0): string {
    const [active, setActive] = useState<string>(ids[0] ?? "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry most in view
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) {
                    setActive(visible[0].target.id);
                }
            },
            {
                rootMargin: `-${offset}px 0px -55% 0px`,
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids, offset]);

    return active;
}

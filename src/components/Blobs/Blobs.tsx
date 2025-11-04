import { useEffect, useRef } from "react";
import "./Blobs.css";

export default function Blobs() {
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${scroll * 0.3}px)`;
            if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${scroll * -0.2}px)`;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div ref={blob1Ref} className="blob" style={{ backgroundColor: "#FACC15", top: "10px", left: "10px" }} />
            <div ref={blob2Ref} className="blob" style={{ backgroundColor: "#EC4899", bottom: "10px", right: "20px" }} />
        </>
    );
}

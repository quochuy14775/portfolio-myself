import { useEffect } from "react";
import Home from "./Home/Home";
import About from "./About";
import Projects from "./Project";
import Contact from "./Contact";
import BookPage from "../components/BookPage/BookPage";

export default function OnePage() {
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
            const el = document.getElementById(hash);
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
            }
        }
    }, []);

    return (
        <main className="book">
            <BookPage id="home" isFirst>
                <Home />
            </BookPage>
            <BookPage id="about">
                <About />
            </BookPage>
            <BookPage id="projects">
                <Projects />
            </BookPage>
            <BookPage id="contact" isLast>
                <Contact />
            </BookPage>
        </main>
    );
}

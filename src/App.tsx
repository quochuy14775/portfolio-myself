import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Aurora from "./components/Aurora/Aurora";
import OnePage from "./pages/OnePage";
import Resume from "./pages/Resume";

function App() {
    return (
        <Router>
            <Aurora />
            <Navbar />
            <Routes>
                <Route path="/" element={<OnePage />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<OnePage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

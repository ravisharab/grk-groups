
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import KidsGame from './components/KidsGame';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import { Analytics } from '@vercel/analytics/react';
import VisitorAnalytics from './components/VisitorAnalytics';

// Existing GRK Groups homepage
function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />

      <section
        id="projects"
        className="bg-white px-6 py-24 text-center"
      >
        <h2 className="text-4xl font-bold text-slate-900">
          Our Projects
        </h2>

        <p className="mt-5 text-slate-600">
          Explore our upcoming business solutions.
        </p>
      </section>

      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>

      <footer className="bg-[#06152f] px-6 py-8 text-center text-slate-300">
        © {new Date().getFullYear()} GRK Groups.
        All rights reserved.
      </footer>

      {/* Keep Kids Shooting Game unchanged */}
      <KidsGame />
      <Analytics />
      <VisitorAnalytics />
    </>
  );
}

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ExperiencePage from './pages/ExperiencePage';
import CreativePage from './pages/CreativePage';
import ContactPage from './pages/ContactPage';
import { siteLinks } from './data';
import FloatingResume from './components/FloatingResume';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const routeTitles = {
      '/': 'Mohammed Rishin C K — Software Developer',
      '/about': 'About — Mohammed Rishin C K',
      '/work': 'Selected Work — Mohammed Rishin C K',
      '/experience': 'Experience — Mohammed Rishin C K',
      '/creative': 'Creative Work — Mohammed Rishin C K',
      '/contact': 'Contact — Mohammed Rishin C K',
    };
    document.title = routeTitles[pathname] || routeTitles['/'];
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <FloatingResume />
      <main id="main-content">
        <div className="page-transition" key={pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/creative" element={<CreativePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <div>
          <a className="footer__name" href="#main-content">Mohammed Rishin C K</a>
          <p>Software developer building dependable digital products.</p>
        </div>
        <div className="footer__right" aria-label="Social links">
          <a href={siteLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href={siteLinks.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <a href={siteLinks.email}>Email <span>↗</span></a>
        </div>
        <p className="footer__meta">© 2026 · Kerala, India · Riyadh, Saudi Arabia</p>
      </footer>
    </>
  );
}

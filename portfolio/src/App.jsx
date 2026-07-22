import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ExperiencePage from './pages/ExperiencePage';
import CreativePage from './pages/CreativePage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/creative" element={<CreativePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        <span>© 2026 Mohammed Rishin C K</span>
        <div className="footer__right">
          <a href="https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:rishinkpm@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}

import { resumeUrl } from '../data';

export default function FloatingResume() {
  return (
    <a
      className="floating-resume"
      href={resumeUrl}
      download="Mohammed_Rishin_CK_Resume_Software_developer.pdf"
      aria-label="Download Mohammed Rishin C K’s résumé as a PDF"
    >
      <span>Download résumé</span>
      <span className="floating-resume__icon" aria-hidden="true">↓</span>
    </a>
  );
}

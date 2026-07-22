import { Link } from 'react-router-dom';

export default function SectionLink({ to, children }) {
  return (
    <div className="section-link-wrap">
      <Link className="section-link" to={to}>
        <span>{children}</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

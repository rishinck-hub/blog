import { useInView } from '../hooks/useInView';

export default function Reveal({ children, delay = 0, dir = '', className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${dir ? `reveal--${dir}` : ''} ${visible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

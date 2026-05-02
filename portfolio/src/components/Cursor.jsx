import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const follower = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const fpos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.current.style.left = e.clientX + 'px';
      dot.current.style.top  = e.clientY + 'px';
    };
    const loop = () => {
      fpos.current.x += (pos.current.x - fpos.current.x) * 0.1;
      fpos.current.y += (pos.current.y - fpos.current.y) * 0.1;
      follower.current.style.left = fpos.current.x + 'px';
      follower.current.style.top  = fpos.current.y + 'px';
      raf.current = requestAnimationFrame(loop);
    };
    const onEnter = () => dot.current.classList.add('cursor--big');
    const onLeave = () => dot.current.classList.remove('cursor--big');

    window.addEventListener('mousemove', move);
    raf.current = requestAnimationFrame(loop);

    const attach = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={follower} className="cursor-follower" />
    </>
  );
}

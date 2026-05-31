import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    cam.position.z = 6;

    // ── Mouse tracking (normalised -1 to 1) ──
    const mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ════════════════════════════
    // 1. PARTICLE NETWORK
    // ════════════════════════════
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST   = 2.0;

    const pPositions  = [];
    const pVelocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) *  7,
        (Math.random() - 0.5) *  2
      ));
      pVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        0
      ));
    }

    // Dot geometry
    const dotGeo = new THREE.BufferGeometry();
    const dotArr = new Float32Array(PARTICLE_COUNT * 3);
    pPositions.forEach((p, i) => { dotArr[i*3]=p.x; dotArr[i*3+1]=p.y; dotArr[i*3+2]=p.z; });
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotArr, 3));

    // Mix white and red dots
    const dotColors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (Math.random() > 0.82) {
        // red accent dot
        dotColors[i*3]=0.91; dotColors[i*3+1]=0.25; dotColors[i*3+2]=0.04;
      } else {
        // white/muted
        const b = 0.18 + Math.random() * 0.25;
        dotColors[i*3]=b; dotColors[i*3+1]=b*0.97; dotColors[i*3+2]=b*0.94;
      }
    }
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // Line geometry (pre-allocate max possible)
    const MAX_LINES  = PARTICLE_COUNT * PARTICLE_COUNT;
    const lineArr    = new Float32Array(MAX_LINES * 6);
    const lineColArr = new Float32Array(MAX_LINES * 6); // colors per vertex
    const lineGeo    = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineArr, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColArr, 3));

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.22 })
    );
    scene.add(lineMat);

    // ════════════════════════════
    // 2. SMOKE / INK PARTICLES
    // ════════════════════════════
    const SMOKE_COUNT = 150;

    const smoke = Array.from({ length: SMOKE_COUNT }, (_, i) => ({
      x:       (Math.random() - 0.5) * 14,
      y:       -4.5 + Math.random() * 1.5,
      vx:      (Math.random() - 0.5) * 0.006,
      vy:       0.006 + Math.random() * 0.01,
      life:     Math.random(),
      maxLife:  0.5 + Math.random() * 1.0,
      size:     0.04 + Math.random() * 0.09,
      red:      i < SMOKE_COUNT * 0.4, // 40% red wisps
    }));

    const smokeGeo   = new THREE.BufferGeometry();
    const smokePos   = new Float32Array(SMOKE_COUNT * 3);
    const smokeColor = new Float32Array(SMOKE_COUNT * 3);
    const smokeSizes = new Float32Array(SMOKE_COUNT);
    smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));
    smokeGeo.setAttribute('color',    new THREE.BufferAttribute(smokeColor, 3));

    const smokePoints = new THREE.Points(
      smokeGeo,
      new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      })
    );
    scene.add(smokePoints);

    // ── Resize ──
    const onResize = () => {
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Intersection observer — pause when off screen ──
    let running = true;
    const observer = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(el);

    // ── Animation loop ──
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!running) return;

      const t = clock.getElapsedTime();

      // ─ Mouse world position (approx z=0 plane) ─
      const mx = mouse.x * (cam.position.z * Math.tan(THREE.MathUtils.degToRad(30)));
      const my = mouse.y * (cam.position.z * Math.tan(THREE.MathUtils.degToRad(30)) / cam.aspect);

      // ─ Update network particles ─
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = pPositions[i];
        const v = pVelocities[i];

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 1.8 && dist > 0.01) {
          const force = (1.8 - dist) / 1.8 * 0.006;
          v.x += (dx / dist) * force;
          v.y += (dy / dist) * force;
        }

        // Dampen
        v.x *= 0.98;
        v.y *= 0.98;

        p.add(v);

        // Bounce off edges
        if (Math.abs(p.x) > 6.5) v.x *= -1;
        if (Math.abs(p.y) > 4.0) v.y *= -1;

        dotArr[i*3]   = p.x;
        dotArr[i*3+1] = p.y;
        dotArr[i*3+2] = p.z;
      }
      dotGeo.attributes.position.needsUpdate = true;

      // ─ Rebuild lines ─
      let lc = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const d = pPositions[i].distanceTo(pPositions[j]);
          if (d < CONNECT_DIST) {
            const alpha = 1 - d / CONNECT_DIST;
            // Colour lines: red near red dots, white otherwise
            const ri = dotColors[i*3] > 0.5 || dotColors[j*3] > 0.5;
            const cr = ri ? 0.91 * alpha : 0.25 * alpha;
            const cg = ri ? 0.25 * alpha : 0.22 * alpha;
            const cb = ri ? 0.04 * alpha : 0.20 * alpha;

            lineArr[lc*6]   = pPositions[i].x; lineArr[lc*6+1] = pPositions[i].y; lineArr[lc*6+2] = 0;
            lineArr[lc*6+3] = pPositions[j].x; lineArr[lc*6+4] = pPositions[j].y; lineArr[lc*6+5] = 0;
            lineColArr[lc*6]=cr; lineColArr[lc*6+1]=cg; lineColArr[lc*6+2]=cb;
            lineColArr[lc*6+3]=cr; lineColArr[lc*6+4]=cg; lineColArr[lc*6+5]=cb;
            lc++;
            if (lc >= MAX_LINES) break;
          }
        }
        if (lc >= MAX_LINES) break;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;
      lineGeo.setDrawRange(0, lc * 2);

      // ─ Update smoke ─
      for (let i = 0; i < SMOKE_COUNT; i++) {
        const s = smoke[i];
        s.life += 0.007 + Math.random() * 0.003;

        if (s.life > s.maxLife) {
          s.x       = (Math.random() - 0.5) * 14;
          s.y       = -4.5 + Math.random() * 0.8;
          s.life    = 0;
          s.vx      = (Math.random() - 0.5) * 0.006;
          s.vy      = 0.006 + Math.random() * 0.01;
          s.red     = Math.random() < 0.4;
          s.maxLife = 0.5 + Math.random() * 1.0;
        }

        // Gentle curl using sine
        s.x += s.vx + Math.sin(s.y * 1.5 + t * 0.6) * 0.003;
        s.y += s.vy;

        // Cursor attraction for smoke
        const sdx = mx - s.x;
        const sdy = my - s.y;
        const sdist = Math.sqrt(sdx*sdx + sdy*sdy);
        if (sdist < 2.5 && sdist > 0.01) {
          s.x += (sdx / sdist) * 0.003;
          s.y += (sdy / sdist) * 0.003;
        }

        const a = 1 - s.life / s.maxLife;

        smokePos[i*3]   = s.x;
        smokePos[i*3+1] = s.y;
        smokePos[i*3+2] = -0.5; // slightly behind particles

        if (s.red) {
          smokeColor[i*3]   = 0.91 * a;
          smokeColor[i*3+1] = 0.25 * a * 0.5;
          smokeColor[i*3+2] = 0.04 * a * 0.2;
        } else {
          const b = 0.12 * a;
          smokeColor[i*3]   = b;
          smokeColor[i*3+1] = b * 0.97;
          smokeColor[i*3+2] = b * 0.94;
        }
      }
      smokeGeo.attributes.position.needsUpdate = true;
      smokeGeo.attributes.color.needsUpdate    = true;

      renderer.render(scene, cam);
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
    style={{
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    }}
    />
  );
}

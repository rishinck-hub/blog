"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import fontData from "three/examples/fonts/helvetiker_bold.typeface.json";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.15, 6.25);
    const group = new THREE.Group();
    scene.add(group);

    const font = new FontLoader().parse(fontData);
    const colors = [0xff2f1f, 0xff5a27, 0xff8b2c, 0xe8410a, 0xff6b32, 0xff2f1f];
    const letterMeshes: THREE.Mesh<TextGeometry, THREE.MeshPhysicalMaterial>[] = [];
    let cursorX = 0;

    "rishin".split("").forEach((letter, index) => {
      const geometry = new TextGeometry(letter, { font, size: 1.58, depth: 0.38, curveSegments: 16, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.035, bevelSegments: 7 });
      geometry.computeBoundingBox();
      geometry.center();
      const bounds = geometry.boundingBox;
      const width = bounds ? bounds.max.x - bounds.min.x : 1;
      const material = new THREE.MeshPhysicalMaterial({ color: colors[index], roughness: 0.18, metalness: 0.04, clearcoat: 1, clearcoatRoughness: 0.14, emissive: new THREE.Color(colors[index]).multiplyScalar(0.13) });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = cursorX + width / 2;
      mesh.position.y = Math.sin(index * 0.75) * 0.1;
      mesh.rotation.x = -0.1;
      group.add(mesh);
      letterMeshes.push(mesh);
      cursorX += width + 0.08;
    });

    const groupBounds = new THREE.Box3().setFromObject(group);
    group.position.x = -groupBounds.getCenter(new THREE.Vector3()).x;
    group.position.y = -0.12;
    group.rotation.set(-0.06, -0.18, -0.03);

    const ghostMaterial = new THREE.MeshBasicMaterial({ color: 0xf0ede8, transparent: true, opacity: 0.08, wireframe: true });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.09, 16, 96), ghostMaterial);
    torus.position.set(2.45, 1.05, -1.2);
    torus.rotation.set(0.9, 0.25, -0.45);
    scene.add(torus);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), new THREE.MeshPhysicalMaterial({ color: 0xe8410a, roughness: 0.24, clearcoat: 1 }));
    sphere.position.set(-2.55, -0.92, 0.3);
    scene.add(sphere);
    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const keyLight = new THREE.DirectionalLight(0xffe5d6, 3.4);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xe8410a, 7.5, 12);
    rimLight.position.set(3.5, -1.4, 2.2);
    scene.add(rimLight);

    const targetMouse = new THREE.Vector2();
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const onResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    let running = true;
    const observer = new IntersectionObserver(([entry]) => { running = entry.isIntersecting; }, { threshold: 0.05 });
    observer.observe(mount);
    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!running) return;
      const time = clock.getElapsedTime();
      mouse.lerp(targetMouse, 0.045);
      group.rotation.y = -0.2 + mouse.x * 0.18 + Math.sin(time * 0.45) * 0.035;
      group.rotation.x = -0.08 - mouse.y * 0.08 + Math.sin(time * 0.6) * 0.025;
      group.position.y = -0.12 + Math.sin(time * 0.85) * 0.06;
      letterMeshes.forEach((mesh, index) => {
        mesh.position.y = Math.sin(time * 1.15 + index * 0.72) * 0.045;
        mesh.rotation.z = Math.sin(time * 0.8 + index) * 0.012;
      });
      torus.rotation.z = time * 0.18;
      sphere.position.y = -1.1 + Math.sin(time * 1.2) * 0.14;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="hero__canvas" aria-hidden="true" />;
}

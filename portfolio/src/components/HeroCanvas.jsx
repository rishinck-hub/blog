import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

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
    const letters = 'rishin'.split('');
    const colors = [0xff2f1f, 0xff5a27, 0xff8b2c, 0xe8410a, 0xff6b32, 0xff2f1f];
    const letterMeshes = [];
    let cursorX = 0;

    letters.forEach((letter, index) => {
      const geometry = new TextGeometry(letter, {
        font,
        size: 1.58,
        depth: 0.38,
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.045,
        bevelSize: 0.035,
        bevelSegments: 7,
      });

      geometry.computeBoundingBox();
      geometry.center();

      const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      const material = new THREE.MeshPhysicalMaterial({
        color: colors[index],
        roughness: 0.18,
        metalness: 0.04,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        emissive: new THREE.Color(colors[index]).multiplyScalar(0.13),
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = cursorX + width / 2;
      mesh.position.y = Math.sin(index * 0.75) * 0.1;
      mesh.rotation.x = -0.1;
      group.add(mesh);
      letterMeshes.push(mesh);
      cursorX += width + 0.08;
    });

    const bounds = new THREE.Box3().setFromObject(group);
    const center = bounds.getCenter(new THREE.Vector3());
    group.position.x = -center.x;
    group.position.y = -0.12;
    group.rotation.set(-0.06, -0.18, -0.03);

    const accentGroup = new THREE.Group();
    scene.add(accentGroup);

    const redMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe8410a,
      roughness: 0.24,
      metalness: 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      transparent: true,
      opacity: 0.86,
    });
    const ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0xf0ede8,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });

    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.09, 16, 96), ghostMaterial);
    torus.position.set(2.45, 1.05, -1.2);
    torus.rotation.set(0.9, 0.25, -0.45);
    accentGroup.add(torus);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), redMaterial);
    sphere.position.set(-2.55, -0.92, 0.3);
    accentGroup.add(sphere);

    const smallSphere = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), redMaterial.clone());
    smallSphere.material.opacity = 0.64;
    smallSphere.position.set(2.05, -0.78, 0.6);
    accentGroup.add(smallSphere);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, 1.35, -1.4),
      new THREE.Vector3(-2.0, 1.9, -1.1),
      new THREE.Vector3(0.7, 1.35, -1.3),
      new THREE.Vector3(3.8, 1.7, -1.1),
    ]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.018, 8, false), ghostMaterial.clone());
    tube.material.opacity = 0.18;
    accentGroup.add(tube);

    const pointGeometry = new THREE.BufferGeometry();
    const pointCount = 70;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      pointPositions[index * 3] = (Math.random() - 0.5) * 9;
      pointPositions[index * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pointPositions[index * 3 + 2] = -1.8 + Math.random() * 1.4;
    }
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        color: 0xff5a20,
        size: 0.025,
        transparent: true,
        opacity: 0.38,
      })
    );
    scene.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));

    const keyLight = new THREE.DirectionalLight(0xffe5d6, 3.4);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xe8410a, 7.5, 12);
    rimLight.position.set(3.5, -1.4, 2.2);
    scene.add(rimLight);

    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const onMouseMove = event => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    let running = true;
    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(mount);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
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

      accentGroup.rotation.y = time * 0.09 + mouse.x * 0.08;
      accentGroup.rotation.x = mouse.y * 0.04;
      torus.rotation.z = time * 0.18;
      sphere.position.y = -1.1 + Math.sin(time * 1.2) * 0.14;
      smallSphere.position.y = -0.95 + Math.cos(time * 1.5) * 0.12;
      points.rotation.y = time * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      scene.traverse(object => {
        if (!object.isMesh && !object.isPoints) return;
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero__canvas" aria-hidden="true" />;
}

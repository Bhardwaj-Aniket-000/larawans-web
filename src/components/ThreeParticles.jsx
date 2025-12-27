import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeParticles = ({ color = '#EC4899', count = 100 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (window.innerWidth < 768) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: color,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const positions = particles.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        if (Math.abs(positions[i3]) > 50) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 50) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 50) velocities[i].z *= -1;
      }

      particles.attributes.position.needsUpdate = true;

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += mouse.x * 0.001;
      particleSystem.rotation.z += mouse.y * 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particles.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [color, count]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeParticles;

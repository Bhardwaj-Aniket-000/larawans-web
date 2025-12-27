import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeWaveAnimation = ({ color = '#EC4899', intensity = 1 }) => {
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
    camera.position.z = 5;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 3;
    scene.add(plane);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const vertices = geometry.attributes.position.array;
    const originalPositions = new Float32Array(vertices);

    let time = 0;
    const animate = () => {
      time += 0.02 * intensity;

      for (let i = 0; i < vertices.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        vertices[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      plane.rotation.z += 0.001;

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
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [color, intensity]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeWaveAnimation;

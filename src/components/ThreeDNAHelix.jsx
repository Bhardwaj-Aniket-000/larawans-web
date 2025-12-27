import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDNAHelix = ({ color1 = '#EC4899', color2 = '#8B5CF6' }) => {
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
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const helixGroup = new THREE.Group();
    const points = 100;
    const radius = 5;
    const height = 40;

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 8;
      const y = (i / points) * height - height / 2;

      const geometry1 = new THREE.SphereGeometry(0.3, 16, 16);
      const material1 = new THREE.MeshPhongMaterial({
        color: color1,
        emissive: color1,
        emissiveIntensity: 0.5,
        shininess: 100,
      });
      const sphere1 = new THREE.Mesh(geometry1, material1);
      sphere1.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );

      const geometry2 = new THREE.SphereGeometry(0.3, 16, 16);
      const material2 = new THREE.MeshPhongMaterial({
        color: color2,
        emissive: color2,
        emissiveIntensity: 0.5,
        shininess: 100,
      });
      const sphere2 = new THREE.Mesh(geometry2, material2);
      sphere2.position.set(
        Math.cos(angle + Math.PI) * radius,
        y,
        Math.sin(angle + Math.PI) * radius
      );

      helixGroup.add(sphere1);
      helixGroup.add(sphere2);

      if (i < points - 1) {
        const nextAngle = ((i + 1) / points) * Math.PI * 8;
        const nextY = ((i + 1) / points) * height - height / 2;

        const lineMaterial = new THREE.LineBasicMaterial({
          color: color1,
          transparent: true,
          opacity: 0.3,
        });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
          ),
          new THREE.Vector3(
            Math.cos(nextAngle) * radius,
            nextY,
            Math.sin(nextAngle) * radius
          ),
        ]);
        const line1 = new THREE.Line(lineGeometry, lineMaterial);
        helixGroup.add(line1);

        const lineMaterial2 = new THREE.LineBasicMaterial({
          color: color2,
          transparent: true,
          opacity: 0.3,
        });
        const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            Math.cos(angle + Math.PI) * radius,
            y,
            Math.sin(angle + Math.PI) * radius
          ),
          new THREE.Vector3(
            Math.cos(nextAngle + Math.PI) * radius,
            nextY,
            Math.sin(nextAngle + Math.PI) * radius
          ),
        ]);
        const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
        helixGroup.add(line2);
      }
    }

    scene.add(helixGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(color1, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(color2, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      helixGroup.rotation.y += 0.005;
      helixGroup.rotation.x = mouse.y * 0.3;
      helixGroup.rotation.z = mouse.x * 0.1;

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
      helixGroup.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      renderer.dispose();
    };
  }, [color1, color2]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeDNAHelix;

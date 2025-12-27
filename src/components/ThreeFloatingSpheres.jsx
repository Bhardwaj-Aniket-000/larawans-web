import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeFloatingSpheres = ({ count = 15, colors = ['#EC4899', '#F97316', '#8B5CF6'] }) => {
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

    const spheres = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1.5 + 0.5;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        emissive: color,
        emissiveIntensity: 0.3,
        shininess: 100,
      });

      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = (Math.random() - 0.5) * 80;
      sphere.position.y = (Math.random() - 0.5) * 80;
      sphere.position.z = (Math.random() - 0.5) * 50;

      sphere.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1,
          z: (Math.random() - 0.5) * 0.05,
        },
        originalY: sphere.position.y,
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatOffset: Math.random() * Math.PI * 2,
      };

      spheres.push(sphere);
      scene.add(sphere);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.01;

      spheres.forEach((sphere, index) => {
        sphere.position.x += sphere.userData.velocity.x;
        sphere.position.y += sphere.userData.velocity.y;
        sphere.position.z += sphere.userData.velocity.z;

        sphere.position.y += Math.sin(time + sphere.userData.floatOffset) * sphere.userData.floatSpeed;

        if (Math.abs(sphere.position.x) > 40) sphere.userData.velocity.x *= -1;
        if (Math.abs(sphere.position.y) > 40) sphere.userData.velocity.y *= -1;
        if (Math.abs(sphere.position.z) > 25) sphere.userData.velocity.z *= -1;

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

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
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      renderer.dispose();
    };
  }, [count, colors]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeFloatingSpheres;

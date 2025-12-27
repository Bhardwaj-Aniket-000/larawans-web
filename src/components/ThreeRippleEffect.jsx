import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeRippleEffect = ({ color = '#EC4899', ringCount = 5 }) => {
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
    camera.position.y = 15;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      const geometry = new THREE.TorusGeometry(5, 0.2, 16, 100);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0,
        shininess: 100,
      });

      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      ring.userData = {
        baseScale: 0.1,
        targetScale: 3,
        opacity: 0,
        delay: i * 30,
        active: false,
      };
      scene.add(ring);
      rings.push(ring);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(color, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 1;

      rings.forEach((ring, index) => {
        if (!ring.userData.active) {
          ring.userData.delay--;
          if (ring.userData.delay <= 0) {
            ring.userData.active = true;
            ring.scale.set(ring.userData.baseScale, ring.userData.baseScale, ring.userData.baseScale);
            ring.userData.opacity = 1;
          }
        } else {
          const progress = ring.scale.x / ring.userData.targetScale;
          
          if (progress < 1) {
            ring.scale.x += 0.02;
            ring.scale.y += 0.02;
            ring.scale.z += 0.02;
            
            ring.userData.opacity = 1 - progress;
            ring.material.opacity = ring.userData.opacity;
          } else {
            ring.userData.active = false;
            ring.userData.delay = ringCount * 30;
            ring.scale.set(ring.userData.baseScale, ring.userData.baseScale, ring.userData.baseScale);
          }
        }
      });

      scene.rotation.y += 0.002;
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);

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
      rings.forEach(ring => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      renderer.dispose();
    };
  }, [color, ringCount]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeRippleEffect;

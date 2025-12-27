import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = ({ image }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Texture
    const texture = new THREE.TextureLoader().load(image);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Plane
    const geometry = new THREE.PlaneGeometry(4, 2.5);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Mouse interaction (subtle)
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animate
    const animate = () => {
      plane.position.x += (mouse.x - plane.position.x) * 0.05;
      plane.position.y += (-mouse.y - plane.position.y) * 0.05;

      // subtle floating
      plane.rotation.z = Math.sin(Date.now() * 0.001) * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [image]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ThreeBackground;

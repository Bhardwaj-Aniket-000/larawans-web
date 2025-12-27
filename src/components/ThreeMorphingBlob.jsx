import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeMorphingBlob = ({ color = '#EC4899', speed = 1 }) => {
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
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      shininess: 100,
      wireframe: false,
      transparent: true,
      opacity: 0.7,
    });

    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    const wireframeGeometry = new THREE.IcosahedronGeometry(4.1, 4);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(color, 0.8);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const originalPositions = geometry.attributes.position.array.slice();
    const originalWireframePositions = wireframeGeometry.attributes.position.array.slice();

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.01 * speed;

      const positions = geometry.attributes.position.array;
      const wireframePositions = wireframeGeometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        const noise = 
          Math.sin(x * 0.5 + time) * 
          Math.cos(y * 0.5 + time) * 
          Math.sin(z * 0.5 + time);

        positions[i] = x + noise * 0.5;
        positions[i + 1] = y + noise * 0.5;
        positions[i + 2] = z + noise * 0.5;

        wireframePositions[i] = originalWireframePositions[i] + noise * 0.5;
        wireframePositions[i + 1] = originalWireframePositions[i + 1] + noise * 0.5;
        wireframePositions[i + 2] = originalWireframePositions[i + 2] + noise * 0.5;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      wireframeGeometry.attributes.position.needsUpdate = true;

      blob.rotation.x += 0.003;
      blob.rotation.y += 0.005;
      wireframe.rotation.x += 0.003;
      wireframe.rotation.y += 0.005;

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05;
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
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, [color, speed]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeMorphingBlob;

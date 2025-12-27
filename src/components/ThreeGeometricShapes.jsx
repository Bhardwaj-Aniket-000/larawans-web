import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeGeometricShapes = ({ shapeCount = 8 }) => {
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

    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.TetrahedronGeometry(1.5),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
    ];

    const colors = ['#EC4899', '#F97316', '#8B5CF6', '#06B6D4', '#10B981'];

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.3,
        wireframe: Math.random() > 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 40;
      mesh.position.z = (Math.random() - 0.5) * 20;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatOffset: Math.random() * Math.PI * 2,
      };

      shapes.push(mesh);
      scene.add(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.01;

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
      });

      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
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
      geometries.forEach(geo => geo.dispose());
      shapes.forEach(shape => shape.material.dispose());
      renderer.dispose();
    };
  }, [shapeCount]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeGeometricShapes;

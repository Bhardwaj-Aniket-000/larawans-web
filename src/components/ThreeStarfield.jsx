import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeStarfield = ({ starCount = 1000, shootingStars = true }) => {
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

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 200;
      starPositions[i + 1] = (Math.random() - 0.5) * 200;
      starPositions[i + 2] = (Math.random() - 0.5) * 200;

      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        starColors[i] = 1;
        starColors[i + 1] = 0.8;
        starColors[i + 2] = 0.9;
      } else if (colorChoice < 0.6) {
        starColors[i] = 0.8;
        starColors[i + 1] = 0.9;
        starColors[i + 2] = 1;
      } else {
        starColors[i] = 1;
        starColors[i + 1] = 1;
        starColors[i + 2] = 1;
      }

      starSizes[i / 3] = Math.random() * 2 + 0.5;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starsMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const shootingStarsArray = [];
    if (shootingStars) {
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(50 * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
        });

        const shootingStar = new THREE.Line(geometry, material);
        shootingStar.userData = {
          active: false,
          speed: Math.random() * 2 + 1,
          direction: new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize(),
          startPos: new THREE.Vector3(),
          timer: Math.random() * 200,
        };
        scene.add(shootingStar);
        shootingStarsArray.push(shootingStar);
      }
    }

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 1;

      stars.rotation.y += 0.0002;
      stars.rotation.x = mouse.y * 0.1;
      stars.rotation.z = mouse.x * 0.05;

      shootingStarsArray.forEach((shootingStar) => {
        if (!shootingStar.userData.active) {
          shootingStar.userData.timer--;
          if (shootingStar.userData.timer <= 0) {
            shootingStar.userData.active = true;
            shootingStar.userData.startPos.set(
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 100
            );
            shootingStar.material.opacity = 1;
          }
        } else {
          const positions = shootingStar.geometry.attributes.position.array;
          const dir = shootingStar.userData.direction;
          const speed = shootingStar.userData.speed;

          for (let i = positions.length - 3; i > 2; i -= 3) {
            positions[i] = positions[i - 3];
            positions[i + 1] = positions[i - 2];
            positions[i + 2] = positions[i - 1];
          }

          shootingStar.userData.startPos.add(
            dir.clone().multiplyScalar(speed)
          );

          positions[0] = shootingStar.userData.startPos.x;
          positions[1] = shootingStar.userData.startPos.y;
          positions[2] = shootingStar.userData.startPos.z;

          shootingStar.geometry.attributes.position.needsUpdate = true;

          shootingStar.material.opacity -= 0.01;

          if (shootingStar.material.opacity <= 0) {
            shootingStar.userData.active = false;
            shootingStar.userData.timer = Math.random() * 200 + 100;
            shootingStar.userData.direction = new THREE.Vector3(
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
            ).normalize();
          }
        }
      });

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
      starsGeometry.dispose();
      starsMaterial.dispose();
      shootingStarsArray.forEach(star => {
        star.geometry.dispose();
        star.material.dispose();
      });
      renderer.dispose();
    };
  }, [starCount, shootingStars]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeStarfield;

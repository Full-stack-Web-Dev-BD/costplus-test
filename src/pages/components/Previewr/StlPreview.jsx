import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import html2canvas from 'html2canvas';

const CADViewer = () => {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState('');

  const renderCADModel = () => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  };

  const captureScreenshot = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      setImageData(canvas.toDataURL('image/png'));
    });
  };

  return (
    <div>
      <button onClick={renderCADModel}>Render CAD Model</button>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
      {imageData && <img src={imageData} alt="Screenshot" />}
    </div>
  );
};

export default CADViewer;
import React, { useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import * as THREE from "three";

const GuestLayout: React.FC = () => {
  const { token, role } = useStateContext();
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
    });

    const cubes: THREE.Mesh[] = [];

    for (let i = 0; i < 30; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(cube);
      cubes.push(cube);
    }

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        cube.position.y += Math.sin(Date.now() * 0.001) * 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement); 
    };
  }, []);

  if (token) {
    if (role === "cyber") {
      return <Navigate to="/CyberDashboard" replace />;
    }
    if (role === "entreprise") {
      return <Navigate to="/EntrepriseDashboard" replace />;
    }
  }

  const navitems = [
    { label: "Cyber", path: "/CyberRegister" },
    { label: "Entreprise", path: "/EntrepriseRegister" },
  ];
  const connexion=[
    {label:"connexion",path:"/login"}
  ]
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-cyan-400 font-mono">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-black/20 min-h-screen">
        <header className="flex justify-between items-center p-5 ">
          <h4 className="text-2xl font-bold tracking-wide">Security<span className="text-cyan-400">Network</span></h4>
          {connexion.map((item)=>(
            <Link key={item.path} to={item.path} className="px-4 py-2 bg-cyan-400 text-black rounded-full hover:bg-cyan-500 shadow-lg">
              {item.label}
            </Link>
          ))}
        </header>
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <nav className="flex space-x-4 mt-6">
            {navitems.map((items)=>(
              <Link key={items.path} to={items.path} className="px-6 py-2 bg-cyan-600 text-black rounded-full hover:bg-cyan-500 shadow-md">
                {items.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 bg-black/90 p-10 rounded-lg shadow-neon backdrop-blur-md border border-cyan-200">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;

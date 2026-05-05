import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function ViewportFixer() {
  const { gl, camera, size } = useThree();
  useEffect(() => {
    gl.setSize(size.width, size.height);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }
  }, [gl, camera, size]);
  return null;
}

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  // THREE.Timer remplace THREE.Clock — plus d'avertissement de dépréciation
  const timerRef = useRef(new THREE.Timer());

  // Nettoyage du timer à l'unmount
  useEffect(() => {
    const timer = timerRef.current;
    return () => { timer.dispose?.(); };
  }, []);

  useFrame(() => {
    timerRef.current.update();
    const elapsed = timerRef.current.getElapsed();

    if (meshRef.current) {
      meshRef.current.rotation.x = elapsed * 0.15;
      meshRef.current.rotation.y = elapsed * 0.2;
    }
    if (groupRef.current) {
      const targetX = (Math.sin(elapsed * 0.3) * Math.PI) / 6;
      const targetY = (Math.cos(elapsed * 0.2) * Math.PI) / 6;
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <spotLight position={[-10, 10, 10]} intensity={3} color="#aaaaaa" />
      <directionalLight position={[-5, -10, -5]} intensity={1} color="#333333" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#1a1a1a"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
        <mesh rotation-y={Math.PI / 3} rotation-x={Math.PI / 4}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshStandardMaterial color="#888888" opacity={0.2} transparent />
        </mesh>
        <Sphere args={[2.3, 12, 12]}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </Sphere>
      </Float>
    </group>
  );
}

interface HeroSectionProps {
  onLanguageChange?: () => void;
}

export function HeroSection({ onLanguageChange }: HeroSectionProps) {
  const { t } = useTranslation();

  const navItems = [
    { key: 'services', label: t('nav.services') },
    { key: 'portfolio', label: t('nav.portfolio') },
    { key: 'contact', label: t('nav.contact') },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#050505] to-[#050505]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900/30 via-transparent to-transparent" />

      <nav className="absolute top-0 z-50 flex w-full items-center justify-between px-6 py-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center"
        >
          <div className="relative h-10 overflow-hidden text-2xl font-bold tracking-tighter text-white">
            <img
              src="/2.png"
              alt="Netmaroc Logo"
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                sib?.classList.remove('hidden');
              }}
            />
            <span className="hidden">NETMAROC</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-6"
        >
          <ul className="hidden space-x-8 text-sm font-medium tracking-wide text-zinc-400 md:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <a href={`#${item.key}`} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher onLanguageChange={onLanguageChange} />
        </motion.div>
      </nav>

      <main className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-6 lg:flex-row lg:justify-between lg:px-12">
        <div className="mt-20 flex w-full flex-col items-center text-center lg:mt-0 lg:w-1/2 lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-zinc-400" />
              {t('hero.badge')}
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 sm:text-6xl lg:text-7xl xl:text-8xl">
              {t('hero.title_line1')}<br />
              <span className="text-white">{t('hero.title_line2')}</span>
            </h1>

            <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
              {t('hero.subtitle')}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#050505] transition-all hover:bg-zinc-200"
              >
                {t('hero.cta_primary')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-zinc-800 bg-transparent px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-zinc-900"
              >
                {t('hero.cta_secondary')}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 h-full w-full opacity-50 lg:relative lg:z-0 lg:h-full lg:w-1/2 lg:opacity-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="absolute inset-0 lg:relative lg:h-full lg:w-full"
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              gl={{ antialias: true, alpha: true }}
            >
              <ViewportFixer />
              <AbstractShape />
            </Canvas>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

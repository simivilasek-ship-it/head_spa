"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import * as THREE from "three";

const FOREST = "#34443a";
const CREAM = "#f4efe6";
const SAGE = "#a9b8a5";

type ProgressApi = { current: number };

const ProgressContext = createContext<RefObject<ProgressApi> | null>(null);

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function ScrollObject() {
  const group = useRef<THREE.Group>(null);
  const progressRef = useContext(ProgressContext);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    if (!group.current || !progressRef?.current) return;

    const o = progressRef.current.current;
    const damp = 1 - Math.exp(-7 * delta);

    const rotY = o * Math.PI * 2;
    const rotX = THREE.MathUtils.lerp(-0.1, 0.38, o);

    const slide = smoothstep(0.28, 0.55, o);
    const posX = THREE.MathUtils.lerp(0, -1.55, slide);
    const posY = THREE.MathUtils.lerp(0, 0.12, slide);

    const zoom = smoothstep(0.62, 0.95, o);
    const camZ = THREE.MathUtils.lerp(4.6, 2.3, zoom);
    const camX = THREE.MathUtils.lerp(0, -0.4, zoom);

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      rotY,
      damp,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      rotX,
      damp,
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      posX,
      damp,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      posY,
      damp,
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      camZ,
      damp,
    );
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      camX,
      damp,
    );

    cameraTarget.set(group.current.position.x * 0.45, 0.05, 0);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.3}>
      <group ref={group}>
        <mesh castShadow>
          <torusKnotGeometry args={[0.72, 0.26, 220, 36]} />
          <meshPhysicalMaterial
            color={FOREST}
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.7}
            clearcoatRoughness={0.18}
            reflectivity={0.95}
            envMapIntensity={1.2}
            sheen={0.3}
            sheenColor={SAGE}
          />
        </mesh>
        <mesh rotation={[1.2, 0.15, 0]} scale={1.06}>
          <torusGeometry args={[0.98, 0.028, 20, 96]} />
          <meshPhysicalMaterial
            color={CREAM}
            metalness={0.9}
            roughness={0.15}
            transparent
            opacity={0.55}
            envMapIntensity={1.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#26302a"]} />
      <fog attach="fog" args={["#26302a", 7, 15]} />
      <ambientLight intensity={0.42} color={CREAM} />
      <directionalLight
        position={[4.2, 6.2, 3.2]}
        intensity={1.4}
        color="#fff8ef"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3.2, 1.8, -2.4]} intensity={0.4} color={SAGE} />
      <Environment preset="city" environmentIntensity={0.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#2c3932" roughness={0.92} metalness={0.08} />
      </mesh>
      <ScrollObject />
    </>
  );
}

function HtmlChapters({ progressRef }: { progressRef: RefObject<ProgressApi> }) {
  const panel = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const shown = useRef(0);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const o = progressRef.current?.current ?? 0;
      shown.current = THREE.MathUtils.lerp(shown.current, o, 0.12);

      if (panel.current) {
        const a =
          smoothstep(0.32, 0.48, shown.current) *
          (1 - smoothstep(0.72, 0.88, shown.current));
        panel.current.style.opacity = String(a);
        panel.current.style.transform = `translateY(${(1 - a) * 28}px)`;
      }
      if (detail.current) {
        const a = smoothstep(0.68, 0.82, shown.current);
        detail.current.style.opacity = String(a);
        detail.current.style.transform = `translateY(${(1 - a) * 18}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        ref={panel}
        className="absolute top-1/2 right-[5%] max-w-sm -translate-y-1/2 rounded-2xl border border-cream/20 bg-forest/60 p-6 text-cream opacity-0 shadow-2xl backdrop-blur-md md:right-[9%] md:p-8"
      >
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sage-light">
          Head Spa · Opava
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight md:text-4xl">
          Péče, která má tvar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/85 md:text-[0.95rem]">
          Scrollujte dál — objekt se otočí, ustoupí doleva a v závěru odhalí
          detail materiálu.
        </p>
      </div>
      <div
        ref={detail}
        className="absolute bottom-10 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-full border border-cream/25 bg-cream/90 px-5 py-3 text-center text-sm text-forest opacity-0 shadow-lg backdrop-blur-sm md:bottom-14"
      >
        Detail materiálu · metal 0.8 · rough 0.2 · soft clearcoat
      </div>
    </div>
  );
}

function ProgressProvider({
  sectionRef,
  children,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  children: (progressRef: RefObject<ProgressApi>) => ReactNode;
}) {
  const progressRef = useRef<ProgressApi>({ current: 0 });

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current.current = THREE.MathUtils.clamp(
        total > 0 ? scrolled / total : 0,
        0,
        1,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return (
    <ProgressContext.Provider value={progressRef}>
      {children(progressRef)}
    </ProgressContext.Provider>
  );
}

/**
 * Scroll-driven 3D scrollytelling (300vh + sticky Canvas).
 * Test: /scrolly-3d
 */
export function ScrollDrivenScene() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-ink">
      <ProgressProvider sectionRef={sectionRef}>
        {(progressRef) => (
          <div className="sticky top-0 h-svh w-full overflow-hidden">
            <Canvas
              className="!absolute inset-0 h-full w-full"
              shadows
              dpr={[1, 1.75]}
              camera={{ position: [0, 0.15, 4.6], fov: 42, near: 0.1, far: 40 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
              }}
            >
              <SceneLights />
            </Canvas>
            <HtmlChapters progressRef={progressRef} />
          </div>
        )}
      </ProgressProvider>
    </section>
  );
}

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = { progress: number; reduced: boolean };

const palette = ["#e4512b", "#f0ddd2", "#66848b", "#18292d"];

function Nodes({ progress }: { progress: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const points = useMemo(() => Array.from({ length: 196 }, (_, i) => {
    const phi = Math.acos(1 - 2 * (i + .5) / 196);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.15 + (i % 7) * .045;
    return new THREE.Vector3(Math.cos(theta) * Math.sin(phi) * r, Math.cos(phi) * r, Math.sin(theta) * Math.sin(phi) * r);
  }), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const phaseProgress = progress * 8;
    const stage = Math.min(7, Math.floor(phaseProgress));
    const phase = Math.min(1, phaseProgress);
    points.forEach((p, i) => {
      const target = p.clone().multiplyScalar(stage ? 1.5 + Math.min(stage, 2) * .35 : .84);
      if (stage === 2) target.set((i % 8 - 3.5) * .72, (Math.floor(i / 8) - 5.5) * .54, (i % 3 - 1) * .82);
      if (stage === 3) target.set((i % 9 - 4) * .68, (Math.floor(i / 9) - 5) * .47, .18 + (i % 4) * .36);
      if (stage === 4) {
        const ring = (i - 35) * .35;
        target.set(Math.cos(ring) * 3.4, Math.sin(ring) * 2.15, Math.sin(ring * 2) * .75);
      }
      if (stage === 5) target.set((i % 6 - 2.5) * 1.24, (Math.floor(i / 6) - 8) * .48, Math.sin(i * 1.7) * 1.25);
      if (stage === 6) target.set((i % 7 - 3) * .9, (Math.floor(i / 7) - 6) * .78 + 1.2, Math.cos(i * .6) * .7);
      if (stage === 7) target.copy(p).multiplyScalar(2.9);
      dummy.position.copy(target);
      const scale = .072 + (i % 5) * .014 + Math.min(1, phase) * .022;
      dummy.scale.setScalar(scale * (1 + Math.sin(clock.elapsedTime * 2 + i) * .15));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.rotation.y = clock.elapsedTime * .04 + phaseProgress * .24;
  });
  return <instancedMesh ref={ref} args={[undefined, undefined, points.length]}><sphereGeometry args={[1, 12, 12]} /><meshStandardMaterial color="#174349" emissive="#00a9b4" emissiveIntensity={.72} metalness={.68} roughness={.22} /></instancedMesh>;
}

function Connections({ progress }: { progress: number }) {
  const line = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < 66; i++) {
      const a = i * 2.399, b = (i + 9) * 2.399;
      const r = 2.2 + (i % 9) * .34;
      pos.push(Math.cos(a) * r, Math.sin(a * 1.7) * r * .7, Math.sin(a) * r * .4);
      pos.push(Math.cos(b) * r, Math.sin(b * 1.7) * r * .7, Math.sin(b) * r * .4);
    }
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  }, []);
  useFrame(({ clock }) => { if (line.current) { line.current.rotation.y = -clock.elapsedTime * .025; line.current.scale.setScalar(.28 + Math.min(1, progress * 8 / 2) * 2.35); } });
  return <lineSegments ref={line} geometry={geometry}><lineBasicMaterial color="#cbd8dc" transparent opacity={Math.min(.52, progress * 1.3)} /></lineSegments>;
}

function Architecture({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) { group.current.rotation.y = Math.sin(clock.elapsedTime * .2) * .16 - progress * .45; group.current.position.y = Math.sin(clock.elapsedTime * .7) * .12; } });
  const stage = Math.min(7, Math.floor(progress * 8));
  const software = stage >= 2 ? 1 : 0;
  const web = stage >= 3 ? 1 : 0;
  const commerce = stage >= 4 ? 1 : 0;
  const connect = stage >= 5 ? 1 : 0;
  const cloud = stage >= 6 ? 1 : 0;
  return <group ref={group}>
    <mesh scale={[1.2 + software * 2.1, 1.2 + software * 2.1, 1.2 + software * 2.1]}><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#162a31" metalness={.85} roughness={.18} emissive="#4e1c14" emissiveIntensity={.8} /></mesh>
    {[[-2.8,1.2,.4],[2.6,.8,-.5],[-1.9,-1.7,-.8],[1.6,-1.5,.65],[0,2.4,-1]].map((p,i)=><mesh key={i} position={p as [number,number,number]} scale={.45+software*.33}><boxGeometry args={[1,1,.25]} /><meshStandardMaterial color={palette[i % palette.length]} metalness={.6} roughness={.28} transparent opacity={.22 + software*.58} /></mesh>)}
    <group visible={web > .03} scale={1 + web * .5} rotation={[.15, -.24, 0]} position={[0, .1, .9]}>
      <mesh><boxGeometry args={[6.7,4.05,.16]} /><meshStandardMaterial color="#d7d9d4" metalness={.75} roughness={.22} transparent opacity={.16 + web*.45} /></mesh>
      <mesh position={[0,1.55,.14]}><boxGeometry args={[6.1,.06,.05]} /><meshBasicMaterial color="#e26b49" /></mesh>
      {[-1.9,0,1.9].map(x=><mesh key={x} position={[x,-.15,.15]}><boxGeometry args={[1.3,2.1,.04]} /><meshBasicMaterial color="#d3ebef" transparent opacity={.18} /></mesh>)}
    </group>
    <group visible={commerce > .03} rotation={[.7,0,.2]} scale={1+commerce*.25}>
      {[0,1,2,3,4].map(i=><mesh key={i} position={[Math.cos(i*1.256)*3.5,Math.sin(i*1.256)*2.2,-.4]}><octahedronGeometry args={[.28,1]} /><meshStandardMaterial color="#e4512b" emissive="#e4512b" emissiveIntensity={1.1} /></mesh>)}
    </group>
    <group visible={connect > .03} rotation={[0,.35,.1]}>
      {[-3,0,3].map((x, i)=><mesh key={x} position={[x, i === 1 ? 1.2 : -1.1, -.7]}><boxGeometry args={[.92,.92,.92]} /><meshStandardMaterial color="#1a3034" metalness={.85} roughness={.2} emissive="#e4512b" emissiveIntensity={.42} /></mesh>)}
    </group>
    <group visible={cloud > .03} position={[0,1.5,-1.4]}>
      {[-2,0,2].map((x,i)=><mesh key={x} position={[x, i*.42, 0]}><cylinderGeometry args={[.52,.7,2.4+i*.45,6]} /><meshStandardMaterial color="#bdd3d5" transparent opacity={.22} metalness={.7} roughness={.13} /></mesh>)}
    </group>
  </group>;
}

function Scene({ progress, reduced }: Props) {
  const rig = useRef<THREE.Group>(null);
  useFrame(({ camera, clock }) => {
    const stage = Math.min(7, Math.floor(progress * 8));
    const targets = [[0,.1,8.8],[-1.4,.4,8.2],[2.7,1,7.5],[-2,.7,7],[1.8,-1,6.7],[-3,.6,7.6],[.2,3.4,9.2],[0,.25,14.5]];
    const target = targets[stage];
    const x = target[0] + Math.sin(clock.elapsedTime*.12 + stage) * .22;
    const y = target[1] + Math.cos(clock.elapsedTime*.15 + stage) * .16;
    const z = target[2];
    camera.position.lerp(new THREE.Vector3(x, y, z), reduced ? .07 : .022);
    camera.lookAt(0, 0, 0);
    if (rig.current) { rig.current.rotation.z = Math.sin(clock.elapsedTime*.14) * .035; rig.current.position.x = THREE.MathUtils.lerp(2.7, 0, Math.min(1, progress * 8 / 1.5)); }
  });
  return <><color attach="background" args={["#030506"]} /><fog attach="fog" args={["#030506",7,22]} /><ambientLight intensity={.36} color="#b9cbd0" /><pointLight position={[4,5,5]} intensity={26} color="#e4512b" distance={16}/><pointLight position={[-5,-2,3]} intensity={28} color="#0b9da5" distance={13}/><group ref={rig}><Nodes progress={progress}/><Connections progress={progress}/><Architecture progress={progress}/></group></>;
}

export default function DigitalWorld(props: Props) {
  return <div className="webgl-world" aria-hidden="true"><Canvas dpr={[1,1.6]} gl={{antialias:false,alpha:false,powerPreference:"high-performance"}} camera={{position:[0,0,13],fov:43}}><Scene {...props}/></Canvas></div>;
}

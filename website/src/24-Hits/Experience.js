
import { Suspense, useMemo, useState } from 'react'
import Lights from './Lights.js'

import {
    shipPositionState,
    enemyPositionState,
    laserPositionState,
    scoreState
  } from "./gameState";
import { Physics } from '@react-three/rapier';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Html, OrbitControls,Float,Text,} from '@react-three/drei';
import CustomGeometryParticles from './CustomGeometryParticles.js';
import Spaceship from './SpaceShip.js';




const LASER_Z_VELOCITY = 0.7;
const ENEMY_SPEED = 0.001;



// Just a placeholder sphere to use with React Suspense while waiting for loaders to resolve.
function Loading()
 {
    return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          wireframe
          opacity={0.6}
          roughness={1}
          metalness={0}
        />
      </mesh>
    );
  }

  function Enemies({count=5}) 
  {
    const enemies = useRecoilValue(enemyPositionState);

    return (
      <group>
        {enemies.map((enemy) => (
          <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${enemy.x}`}>
            <sphereGeometry attach="geometry" args={[0.5, 8, 8]} />
            <meshStandardMaterial attach="material" color="pink" />
          </mesh>
        ))}
      </group>
    );
  }
  

  function LaserController() {
    const shipPosition = useRecoilValue(shipPositionState);
    const [lasers, setLasers] = useRecoilState(laserPositionState);
    const wall=useRef()
    const [score, setScore] = useRecoilState(scoreState);

    useFrame((state)=>
    {
      wall.current.position.z=shipPosition.position.z+5
    })

    return (
      <mesh
      ref={wall}
        position={[0, 0, 8]}
        rotation={[0,Math.PI,0]}
        onClick={() =>
          setLasers([
            ...lasers,
            {
              id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
              x: shipPosition.position.x,
              y: shipPosition.position.y,
              z: shipPosition.position.z,
              initial: Math.floor(shipPosition.position.z),
              velocity: [0, 0]
            }
          ])
        }
      >
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          color="orange"
          emissive="#ff0860"
          visible={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }
  
  // Draws all of the lasers existing in state.
  function Lasers() {
    const lasers = useRecoilValue(laserPositionState);
    return (
      <group>
        {lasers.map((laser) => (
          <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
            <sphereGeometry attach="geometry" args={[0.3,32,32]} />
            <meshStandardMaterial attach="material" emissive="yellow"  color="yellow" />
          </mesh>
        ))}
      </group>
    );
  }
  
  // Calculate the distance between two points in 3d space.
  // Used to detect lasers intersecting with enemies.
  
  // This component runs game logic on each frame draw to update game state.
  function GameTimer() {
    const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
    const [enemies, setEnemies] = useRecoilState(enemyPositionState);
    const shipPosition = useRecoilValue(shipPositionState);
    const range=useRef()
    const range1=useRef()
    const [score, setScore] = useRecoilState(scoreState);

    useFrame((state) => {
      range.current.position.z=shipPosition.position.z+30
      range1.current.position.z=state.camera.position.z+9
      range1.current.position.x=shipPosition.position.x
      

      // laser shooting and disappering
      setLaserPositions(
        lasers
          .map((laser) => ({
            id: laser.id,
            x: laser.x - laser.velocity[0],
            y: laser.y - laser.velocity[1],
            z: laser.z + LASER_Z_VELOCITY ,
            velocity: laser.velocity
          }))
          .filter((laser) => laser.z < (range.current.position.z))
      )

      const hitEnemies = enemies
      ? enemies.map(
          (enemy) =>
            lasers.filter(
              () =>
                lasers.filter((laser) => distance(laser, enemy) < 1).length > 0
            ).length > 0
        )
      : [];

      if (hitEnemies.includes(true) && enemies.length > 0) {
        setScore(score + 1);
        localStorage.setItem("hits",score) 
      }
   

  

      //moving enemies
      setEnemies(
        enemies
          .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z - ENEMY_SPEED }))
          .filter((enemy, idx) => !hitEnemies[idx] && enemy.z > 1)
      )


        return null;
    });

    return <>
    <group>
    <mesh ref={range} position={[0, 0, 100]} rotation={[0,Math.PI,0]}>
      <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          color="orange"
          emissive="#ff0860"
          visible={false}
          side={THREE.DoubleSide}
        />
    </mesh>
    <Text
    ref={range1}
         font='./bebas-neue-v9-latin-regular.woff'
         scale={3}
         position={[0,-2.5,0]}
         rotation={[0,Math.PI,0]}
        >
            HITS : {score}
            <meshBasicMaterial toneMapped={false}/>
        </Text>
    </group>
   
    </>
  }

  function distance(p1, p2) 
  {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;
    const c = p2.z - p1.z;
  
    return Math.sqrt(a * a + b * b + c * c);
  }
  
export default function Experience()
{
    return <>

        <OrbitControls makeDefault />
        <color args={['black']} attach="background"/>

        <Physics gravity={[0,0,0]}>
            {/* <Debug/> */}
            <Lights />
            <Suspense fallback={<Loading />}>
                <Spaceship/>
            </Suspense>  
            <Suspense>
              <Enemies/>
              <CustomGeometryParticles count={7000}/>
            </Suspense>
            <Lasers/>
            <LaserController/>
            <GameTimer/>
        </Physics>
          

    </>
}
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function CustomGeometryParticles(props)
{
    const { count } = props
    const points = useRef();

    //creating particle positions
    const particlesPosition = useMemo(() => 
    {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) 
        {
            let x = (Math.random() - 0.5) * 200;
            let y = (Math.random()-0.5) * 200;
            let z = (Math.random()) * 1200;
            positions.set([x, y, z], i * 3);
        }
        
        return positions;

    }, [count])

  //returning particle
  return <>
  <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.1} color="#5786F5" sizeAttenuation depthWrite={false} />
    </points>
  </>
       
}

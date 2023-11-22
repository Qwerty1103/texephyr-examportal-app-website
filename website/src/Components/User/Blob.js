import React, { useMemo, useRef, useState } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const Blob = () => {
  const mesh = useRef();
  const hover=useRef(false)
 
  
  const hoverClick = () => {
    if(hover.current)
    {
        hover.current = false;
    }
    else
    {
        hover.current = true;
    }
  };

  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    };
  });

    useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.4 * a;

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
       hover.current ? 1 : 0.25,
        0.02
      );
    }
  });
  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={[0, 0, 0]}
      onPointerOver={()=>hover.current=true}
      onPointerOut={()=>hover.current=false}
      onClick={hoverClick}
    >
      <icosahedronBufferGeometry args={[2.8, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;

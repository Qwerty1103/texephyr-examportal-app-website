import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";
import SoundEffects from "./SoundEffects";

import React from "react";

export default function Index() {
  return (
    <div className="texRaceContainer">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          <Experience />
        </Canvas>

        <Interface />
        
      </KeyboardControls>
      {/* <SoundEffects/> */}
      
    </div>
  );
}

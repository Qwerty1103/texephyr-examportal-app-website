import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { KeyboardControls } from '@react-three/drei'
import { Suspense } from 'react'
import Interface from './Interface'
import SoundEffects from './SoundEffects'

import React from "react";

export default function Index() {

  return (
    <div className="route51Container">
    <KeyboardControls
    map={[
        {name:'upward',keys:['ArrowUp','KeyW']},
        {name:'downward',keys:['ArrowDown','KeyS']},
        {name:'leftward',keys:['ArrowLeft','KeyA']},
        {name:'rightward',keys:['ArrowRight','KeyD']},
    ]}
    >
        <Suspense>
        <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [  0,3,8 ]            
        } }
    >
        <Experience/>
    </Canvas>
    </Suspense>
    <Interface/>
    {/* <SoundEffects/> */}
          
    </KeyboardControls>
</div>    
)
};
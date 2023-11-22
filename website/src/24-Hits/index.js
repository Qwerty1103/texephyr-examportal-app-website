import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import Experience from './Experience.js'
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import Interface from './Interface'
import SoundEffects from './SoundEffects'

import React from "react";

export default function Index() {

  return (
    <div className="hitContainer">
<KeyboardControls
    map={[
        {name:'forward',keys:['ArrowUp','KeyW']},
        {name:'backward',keys:['ArrowDown','KeyS']},
        {name:'leftward',keys:['ArrowLeft','KeyA']},
        {name:'rightward',keys:['ArrowRight','KeyD']},
    ]}
    >
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0,3,-12 ]
        } }
        >
        <RecoilRoot>
            <Experience />
        </RecoilRoot>  
        
    </Canvas>
    <Interface/>
    <SoundEffects/>

    </KeyboardControls>
    </div>
    
)}
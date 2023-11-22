import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { TextureLoader } from "three";
import { useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from 'three'
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { shipPositionState } from "./gameState";
import useGame from "../24-Hits/stores/useGame.js";
import { Html, OrbitControls,Float,Text,} from '@react-three/drei';




export default function Spaceship()
{
    const body=useRef()
    const ship=useGLTF('../Fighter_02.glb')

    const [suscribeKeys,getKeys]=useKeyboardControls()
    const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);

    const {rapier,world}=useRapier()
    const rapierWorld=world.raw()

    const [SmoothedCameraPosition]=useState(()=>new THREE.Vector3(0,0,-100))
    const [SmoothedCameraTarget]=useState(()=>new THREE.Vector3())

    const start=useGame((state)=>state.start)
    const end=useGame((state)=>state.end)
    const restart=useGame((state)=>state.restart)

    const reset=()=>
    {
        body.current.setTranslation({x:0,y:1,z:0})
        body.current.setLinvel({x:0,y:0,z:0})
        body.current.setAngvel({x:0,y:0,z:0})
    }

    useEffect(()=>
    {

        const unsubcribeReset=useGame.subscribe(
            (state)=>state.phase,
            (value)=>
            {
                if(value === 'ready')
                    reset()
            }
        )

       
        const unsubcribeAny=suscribeKeys(()=>
        {
            start()
        })

        return()=>
        {
            unsubcribeReset()
            unsubcribeAny()
        }
    },[])

    useFrame((state,delta)=>
    {
        //Controls
        const {forward,backward,leftward,rightward}=getKeys()
        const impulse={x:0,y:0,z:0}
        const torque={x:0,y:0,z:0}

        const impulseStrength=100*delta*1.5*2
        const torqueStrenght=10*delta*1.5

        if(rightward)
        {
            impulse.x-=impulseStrength   
            torque.z +=torqueStrenght 
        }
        
        if(leftward)
        {
            impulse.x+=impulseStrength
            torque.z -=torqueStrenght
        }

        if(forward)
        {
            impulse.z+=impulseStrength
        }

        if(backward)
        {
            impulse.z-=impulseStrength
        }
        
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        //Camera
        const bodyPosition=body.current.translation()

        setShipPosition({
            position: { x: bodyPosition.x, y: bodyPosition.y,z:bodyPosition.z },
            rotation: { z: 0, x:0, y: 0 }
        })

        const cameraPosition=new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z-=10
        cameraPosition.y+=3
        cameraPosition.x=0
      
        const cameraTarget=new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.x=0
        cameraTarget.y=bodyPosition.y
        cameraTarget.z=bodyPosition.z+10
        

        SmoothedCameraPosition.lerp(cameraPosition,10*delta)
        SmoothedCameraTarget.lerp(cameraTarget,10*delta)

        state.camera.position.copy(SmoothedCameraPosition)
        state.camera.lookAt(SmoothedCameraTarget)

        //phases
        if(bodyPosition.z >1150)
            end()    
 
    })

    return <>
    <group>
    <RigidBody
    ref={body}
    linearDamping={0.5}
    angularDamping={0.9}
    position={[0,-2,0]}
    >
        <primitive object={ship.scene} scale={0.3} />
    </RigidBody>
    
    <Text
         font='./bebas-neue-v9-latin-regular.woff'
         scale={24}
         position={[0,0,150]}
         rotation={[0,Math.PI,0]}
        >
            LEVEL 1
            <meshBasicMaterial toneMapped={false}/>
        </Text>

        <Text
         font='./bebas-neue-v9-latin-regular.woff'
         scale={24}
         position={[0,0,480]}
         rotation={[0,Math.PI,0]}
        >
            LEVEL 2
            <meshBasicMaterial toneMapped={false}/>
        </Text>

        <Text
         font='./bebas-neue-v9-latin-regular.woff'
         scale={24}
         position={[0,0,730]}
         rotation={[0,Math.PI,0]}
        >
            LEVEL 3
            <meshBasicMaterial toneMapped={false}/>
        </Text>
        <Text
         font='./bebas-neue-v9-latin-regular.woff'
         scale={24}
         position={[0,0,940]}
         rotation={[0,Math.PI,0]}
        >
            LEVEL 4
            <meshBasicMaterial toneMapped={false}/>
        </Text>
        <Text
         font='./bebas-neue-v9-latin-regular.woff'
         scale={24}
         position={[0,0,1150]}
         rotation={[0,Math.PI,0]}
        >
           FINISH
            <meshBasicMaterial toneMapped={false}/>
        </Text>
    </group>
    
    </>
}


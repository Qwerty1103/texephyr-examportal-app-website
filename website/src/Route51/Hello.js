import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody,useRapier} from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Group } from "three";
import * as THREE from 'three'
import { useState } from "react";
import useGame from "../Route51/stores/useGame.js";


export default function Hello()
{
    const body=useRef()
    const abc=useRef()
    const ufo=useGLTF('../Alt_UFO.glb')
    const [suscribeKeys,getKeys]=useKeyboardControls()

    const {rapier,world}=useRapier()
    const rapierWorld=world.raw()

    const [SmoothedCameraPosition]=useState(()=>new THREE.Vector3(0,-100,0))
    const [SmoothedCameraTarget]=useState(()=>new THREE.Vector3())

    const start=useGame((state)=>state.start)
    const end=useGame((state)=>state.end)
    const restart=useGame((state)=>state.restart)

    const collisionEnter=()=>
    {
       restart()
    }

    const reset=()=>
    {
        body.current.setTranslation({x:0,y:0,z:0})
        body.current.setLinvel({x:0,y:0,z:0})
        body.current.setAngvel({x:0,y:0,z:0})
        restart()
    }

    useEffect(()=>
    {
        const unsubscribeReset=useGame.subscribe(
            (state)=>state.phase,
            (value)=>
            {
                if(value==='ready')
                reset()
            }
        )
        const unsubcribeAny=suscribeKeys(()=>
        {
            start()
        })

        return()=>
        {
            unsubcribeAny()
            unsubscribeReset()
        }
    },[])

    
    useFrame((state,delta)=>
    {
        //Controls
        const {upward,downward,leftward,rightward}=getKeys()
        const impulse={x:0,y:0,z:0}

        const impulseStrength=7.5*delta
        
        if(rightward)
        {
            impulse.x+=impulseStrength    
        }
        if(downward)
        {
            impulse.z+=impulseStrength 
        }
        if(leftward)
        {
            impulse.x-=impulseStrength
        }
        if(upward)
        {
            impulse.z-=impulseStrength
        }
        body.current.applyImpulse(impulse)

        //Camera
        const bodyPosition=body.current.translation()

        const cameraPosition=new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.y+=15
        //cameraPosition.x-=10
      

        const cameraTarget=new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        

        SmoothedCameraPosition.lerp(cameraPosition,5*delta)
        SmoothedCameraTarget.lerp(cameraTarget,5*delta)

        state.camera.position.copy(SmoothedCameraPosition)
        state.camera.lookAt(SmoothedCameraTarget)

        //x=50
        if(bodyPosition.x >55)
        end()

        if(bodyPosition.x<-0.7)
        reset()
        
 
    })

    return <>

    <RigidBody 
    ref={body} 
    colliders='hull' 
    linearDamping={0.9}
    onCollisionEnter={collisionEnter}

    >
    <primitive object={ufo.scene} scale={0.006}/>
    </RigidBody>
     
    </>
}

useGLTF.preload('../UFO_Update1.glb')
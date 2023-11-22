import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";
import { useEffect } from "react";
import * as THREE from 'three'
import { useState } from "react";
import useGame from "../Texrace/stores/useGame.js";

import { PlaneGeometry } from "three";
import useSound from "use-sound";

export default function Player(props)
{ 
    const body=useRef()
    const upar=useRef()
    const [suscribeKeys,getKeys]=useKeyboardControls()
    const {rapier,world}=useRapier()
    const rapierWorld=world.raw()

    const [SmoothedCameraPosition]=useState(()=>new THREE.Vector3(0,0,100))
    const [SmoothedCameraTarget]=useState(()=>new THREE.Vector3())

    const start=useGame((state)=>state.start)
    const end=useGame((state)=>state.end)
    const blocksCount=useGame((state)=>state.blocksCount)
    const restart=useGame((state)=>state.restart)

    const raycaster = new THREE.Raycaster()

    const jump=()=>
    {
        const origin=body.current.translation()
        origin.y-=0.31
        const direction={x:0,y:-1,z:0}
        const ray=new rapier.Ray(origin,direction)
        const hit=rapierWorld.castRay(ray,10,true)

        if(hit.toi<0.15)
        {
             body.current.applyImpulse({x:0,y:0.5,z:0})
        }

             
    }

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

        const unsubcribeJump=suscribeKeys(
            (state)=> state.jump ,
            (value)=>
            {
                if(value)
                    jump()
            }
        )

        const unsubcribeAny=suscribeKeys(()=>
        {
            start()
        })

        return()=>
        {
            unsubcribeReset()
            unsubcribeJump()
            unsubcribeAny()
        }
    },[])

    useFrame((state,delta)=>
    {
        //CONTROLS
        const {forward,backward,leftward,rightward}=getKeys()


        const impulse={x:0,y:0,z:0}
        const torque={x:0,y:0,z:0}

        const impulseStrength=0.6*delta
        const torqueStrenght=0.2*delta

        if(forward)
        {
            impulse.z-=impulseStrength
            torque.x -=torqueStrenght
        }

        if(rightward)
        {
            impulse.x+=impulseStrength
            torque.z -=torqueStrenght
        }

        if(backward)
        {
            impulse.z+=impulseStrength
            torque.x +=torqueStrenght
        }

        if(leftward)
        {
            impulse.x-=impulseStrength
            torque.z +=torqueStrenght
        }


        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        //CAMERA
        const bodyPosition=body.current.translation()

        const cameraPosition=new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z+=2.25
        cameraPosition.y+=0.65

        const cameraTarget=new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y+=0.25

        SmoothedCameraPosition.lerp(cameraPosition,5*delta)
        SmoothedCameraTarget.lerp(cameraTarget,5*delta)

        state.camera.position.copy(SmoothedCameraPosition)
        state.camera.lookAt(SmoothedCameraTarget)

        //phases
        if(bodyPosition.z < -(props.limit*4+2))
            end()    
        
        if(bodyPosition.y < -4)
            restart()
})

    return  <RigidBody 
    ref={body} 
    position={[0,1,0]} 
    colliders='ball' 
    restitution={0.2} 
    friction={1} 
    linearDamping={0.5}
    angularDamping={0.5}
    >
        <mesh castShadow>
            <icosahedronGeometry args={[0.3,1]}/>
            <meshStandardMaterial flatShading color='mediumpurple'/>
        </mesh>
    </RigidBody>
}
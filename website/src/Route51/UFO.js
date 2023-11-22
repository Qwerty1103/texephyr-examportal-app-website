import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function UFO()
{
    const spinner=useRef()
    const control=useRef()
    const ufo=useGLTF('../Alt_UFO1.glb')


    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        spinner.current.rotation.z=a/10*3.14*2
        spinner.current.position.z=Math.sin(a/2)*4
        spinner.current.position.x=-Math.cos(a/2)*4
        spinner.current.position.y=Math.cos(a/2)
      });

    return<>

     <primitive ref={spinner} object={ufo.scene} rotation={[Math.PI/2,0,0]} position={[0,0,0]} scale={0.01}/>
    </>
}
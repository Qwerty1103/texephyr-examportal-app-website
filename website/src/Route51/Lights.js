import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Lights()
{
    const light=useRef()

    useFrame((state)=>
    {
        light.current.position.y=state.camera.position.y-1
        light.current.position.x=state.camera.position.x
        light.current.position.z=state.camera.position.z
        //light.current.target.position.y=state.camera.position.y-10
        // light.current.target.updateMatrixWorld()
        
    })

    return <>
        {/* <directionalLight
            castShadow
            position={ [ 4, 4, 1 ] }
            intensity={ 1.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        /> */}
        <pointLight
        ref={light}
        
        position={ [ 0,1,0] }
        color="#32CD32"
        distance={17}
        intensity={3}
        shadow-mapSize={ [ 1024, 1024 ] }
        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
        shadow-camera-top={ 10 }
        shadow-camera-right={ 10 }
        shadow-camera-bottom={ - 10 }
        shadow-camera-left={ - 10 }
        />  
        <ambientLight intensity={ 0 } />
    </>
}
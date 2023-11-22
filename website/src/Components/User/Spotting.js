import { BoxGeometry, Vector3 } from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, SpotLight, useDepthBuffer, OrbitControls} from '@react-three/drei'
import './spotting.css';
import modeltext from './tex-name3.glb'

function Loading()
 {
    return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <BoxGeometry attach="geometry" args={[5,5,2]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          wireframe
          opacity={0.6}
          roughness={1}
          metalness={0}
        />
      </mesh>
    );
  }

export default function Spotting() {

  
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50, near: 1, far: 20 }} className='herosection-spot'>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#8a39ed', 5, 20]} />

      {/* <ambientLight intensity={0.015} /> */}
 
      <Scene />
  


   
    </Canvas>
  )
}

function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  const depthBuffer = useDepthBuffer({ frames: 1 })
  const Texephyr=useGLTF(modeltext)

  const viewport = useThree((state) => state.viewport)
    return (
    <>

     <MovingSpot depthBuffer={depthBuffer} color="#e8d7fb" position={[viewport.width/2, 2, 1.5]} />
      <MovingSpot depthBuffer={depthBuffer} color="#e8d7fb" position={[-viewport.width/2, 2, 1.5]}/> 
      
      <mesh position={[0, -viewport.height/6, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>

<Suspense fallback={<Loading/>}>
<primitive object={Texephyr.scene} scale={viewport.width/8} position={[0,-viewport.height/10,0]}/>
</Suspense>
   

     
    </>
  )
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <>

  <SpotLight ref={light} penumbra={1.5} distance={12} angle={0.30} attenuation={5} anglePower={4} intensity={3} {...props} />
  
  </>
}

useGLTF.preload(modeltext)
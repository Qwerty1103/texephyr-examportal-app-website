import { OrbitControls } from '@react-three/drei'
import { Physics,Debug, RigidBody } from '@react-three/rapier'
import Gamename from './Gamename.js'
import Hello from './Hello.js'
import Lights from './Lights.js'
import Mazes from './Mazes.js'


export default function Experience()
{
    return <>

        <OrbitControls makeDefault />
        <color args={['#171717']} attach="background"/>

        <Physics gravity={[0,0,0]}>
            {/* <Debug/> */}

            <Lights />
            <Hello/>
            <Mazes/>
            <Gamename/>
            
        </Physics>


    </>
}
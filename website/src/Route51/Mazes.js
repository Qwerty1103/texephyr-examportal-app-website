import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useParams } from "react-router";

export default function Mazes()
{
    
    const {maze}=useParams()
    const mazes_path=['../Maze-1.glb','../Maze-2.glb','../Maze3.glb','../Maze4.glb']
    const mazzing=useGLTF(mazes_path[parseInt(maze)])

    mazzing.scene.children.forEach((mesh)=>
    {
        mesh.castShadow=true
    })

    return <RigidBody type="fixed" colliders="trimesh" rotation-y={-Math.PI/2} position-y={-2}>
        <primitive object={mazzing.scene} scale={2} />
        </RigidBody>
}
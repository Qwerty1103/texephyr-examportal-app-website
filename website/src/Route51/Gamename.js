import { Float,Text} from "@react-three/drei";
export default function Gamename()
{
    return <>
        <Float floatIntensity={1} rotationIntensity={0.1} position={[-7,0,0]} rotation={[-Math.PI/2,0,0]}>
            <Text 
            font='../bebas-neue-v9-latin-regular.woff'
            scale={20}
            maxWidth={0.10}
            textAlign="center"
            rotation-y={-0.25}
            >ROUTE 51
            <meshBasicMaterial toneMapped={false}/>
            </Text>
        </Float>   
    </>
}
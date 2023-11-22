import "@fontsource/chakra-petch";
import { Html, OrbitControls, Sky, Stars, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Navigate, useNavigate } from "react-router";
import useSound from "use-sound";
import testImage from "../Components/images/approved.png"
import testImage2 from "../Components/images/contact.png"
import { Text } from '@react-three/drei';

import "./style.css";

import SoundEffects from "./SoundEffects";
import { Modal, Button } from "react-bootstrap";
import Leaderboard from './Leaderboard';


function Home() {

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    const ship = useGLTF('../Fighter_02.glb')

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    })


    function startbutton() {
        if (!localStorage.getItem('userToken')) {
            alert("Please login or register to record your game");
            window.location.pathname = `/login`;
        }
        else {
            navigate("/HitGame")
        }

    }

    return (
        <>
            <div className="hitContainer">

                <div style={{ background: 'transparent', width: "80%", height: "80%", position: 'absolute', zIndex: 2, display: "flex", marginTop: '2%', marginLeft: "4%", fontWeight: 700 }}>


                    <div className="optionsContainer" style={{ width: '70%', height: '50%', marginTop: "0px", padding: "0px" }}>

                        <div style={{ top: '45px', left: '180px', fontSize: '94px', textAlign: "center", color: "white", marginTop: "5%" }}>24-HIT'S</div>
                        <div style={{ marginTop: "30px", color: 'white', fontWeight: 800, textAlign: "center", fontSize: "24px" }}>CONTROL AND ACCURACY</div>


                        <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", width: '100%' }} className="canvas-box" >

                            {/* <button className="effect"
                            style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "200px", borderRadius: "50%", marginTop: '10px', color: "white", background:"transparent", border: "none" }}
                           onClick={startbutton}
                        >
                            START
                        </button> */}

                            <Canvas
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 11]
                                }}
                            >
                                <color args={["#252731"]} attach="background" />
                                <OrbitControls makeDefault />

                                <directionalLight
                                    castShadow
                                    position={[4, 4, 1]}
                                    intensity={1.5}
                                    shadow-mapSize={[1024, 1024]}
                                    shadow-camera-near={1}
                                    shadow-camera-far={10}
                                    shadow-camera-top={10}
                                    shadow-camera-right={10}
                                    shadow-camera-bottom={- 10}
                                    shadow-camera-left={- 10}
                                />
                                <ambientLight intensity={0.5} />
                                <Suspense>
                                    <primitive object={ship.scene} scale={0.9} />
                                </Suspense>
                                <Text
                                    font='./bebas-neue-v9-latin-regular.woff'
                                    scale={10}
                                    position={[0, 3, -5]}
                                    rotation={[0, 2 * Math.PI, 0]}
                                >
                                    What I am looking at ?
                                    <meshBasicMaterial toneMapped={false} />
                                </Text>
                                <Text
                                    font='./bebas-neue-v9-latin-regular.woff'
                                    scale={5}
                                    position={[0, 2, -5]}
                                    rotation={[0, 2 * Math.PI, 0]}
                                >
                                    Drag to see
                                    <meshBasicMaterial toneMapped={false} />
                                </Text>

                                <Text
                                    font='./bebas-neue-v9-latin-regular.woff'
                                    scale={44}
                                    position={[0, 0, 50]}
                                    rotation={[0, Math.PI, 0]}
                                >
                                    TEXEPHYR 2023
                                    <meshBasicMaterial toneMapped={false} />
                                </Text>

                            </Canvas>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: "40%", height: "50%" }}>
                        <div style={{ padding: "30px 25px", width: '700px', margin: '5px', background: "transparent", borderRadius: "40px" }}>
                            <h3 style={{ padding: "0px 30px", paddingBottom: "10px", fontSize: "28px", color: "white", textAlign: "center" }}><b>INSTRUCTIONS TO PLAY</b></h3>

                            <div className="scrolling" style={{ padding: "30px 30px", overflowY: "scroll", height: "480px", background: "transparent" }}>
                                <p style={{ fontSize: "20px", lineHeight: "1.5", fontWeight: "700", color: "white" }}>
                                    Timer will initiate once you press any of the W, A, S, D keys.
                                    <br /><br />
                                    Use W,A,S,D keys to move in front, back, left and right respectively.
                                    <br /><br />
                                    Use the left mouse button to shoot.
                                    <br /><br />
                                    The aim is to hit all the 24 targets in the least time possible.
                                    <br /><br />
                                    Keep an eye on the timer as you move through the game and try to beat your previous time with each attempt.
                                    <br /><br />
                                    The spaceship is immune to collisions with targets so don’t worry and focus on shooting maximum targets.
                                    <br /><br />
                                    The aim of the game is to hit all the targets so control your ship speed accordingly.
                                    <br /><br />
                                    All the Best!!! Keep playing
                                </p>
                            </div>
                            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", width: '700px' }}>
                                <button
                                    style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "50px", borderRadius: "6%", marginTop: '10px', color: "white", background: "#777", border: "3px solid #fff" }}
                                    onClick={handleShow}
                                >
                                    LEADER-BOARD
                                </button>
                                <button
                                    style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "50px", borderRadius: "6%", marginTop: '10px', color: "white", background: "#777", border: "3px solid #fff" }}
                                    onClick={startbutton}
                                >
                                    START
                                </button>

                                <Modal show={showModal} onHide={handleClose} style={{ fontFamily: 'Chakra Petch' }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignContent: "center", height: "90vh" }}>
                                        <Modal.Header closeButton >
                                            <Modal.Title style={{ fontWeight: "bold", fontSize: "30px", color: "#d347fc" }}><br />LEADER-BOARD</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="scrolling scrolling-black" style={{ textAlign: "center", alignContent: "center", overflowY: "scroll" }}>
                                            <Leaderboard gameName="24hit" />
                                        </Modal.Body>
                                    </div>

                                </Modal>

                            </div>
                        </div>

                    </div>


                </div>



            </div>

            <div className="container d-none mobile-sm">
                <h2>
                Thanks for visiting our gaming section! To get the best possible experience, we recommend accessing our site on a PC.
                </h2>
            </div>
        </>
    );
}
useGLTF.preload('../Fighter_02.glb')
export default Home;

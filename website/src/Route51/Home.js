import "@fontsource/chakra-petch";
import { Html, OrbitControls, Sky, Stars, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Navigate, useNavigate } from "react-router";
import useSound from "use-sound";
import testImage from "../Components/images/game/Tex_Maze1.png"
import testImage1 from "../Components/images/game/Tex_Maze2.png"
import testImage2 from "../Components/images/game/Tex_Maze3.png"
import testImage3 from "../Components/images/game/Tex_Maze4.png"


import "./style.css";
import SoundEffects from "./SoundEffects";
import UFO from "./UFO";
import Leaderboard from './Leaderboard';

import { Modal, Button } from "react-bootstrap";

function Home() {

    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    const [type, setType] = useState("")


    const [showModal, setShow] = useState(false);

    const handleClose = () => { setShow(false); setType("") }
    const handleShow = () => setShow(true);


    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    })

    console.log(type)
    function startbutton() {

        if (!localStorage.getItem('userToken')) {
            alert("Please login or register to record your game");
            window.location.pathname = `/login`;
        }
        else {
            navigate(`/RouteGame/${counter}`)
        }


    }

    return (
        <>
            <div className="route51Container" >

                <div style={{ background: 'transparent', width: "80%", height: "80%", position: 'absolute', zIndex: 2, display: "flex", marginTop: '2%', marginLeft: "4%", fontWeight: 700 }}>


                    <div className="optionsContainer" style={{ width: '70%', height: '50%', marginTop: "0px", padding: "0px" }}>

                        <div style={{ top: '45px', left: '180px', fontSize: '94px', textAlign: "center", color: "white", marginTop: "5%" }}>ROUTE-51</div>
                        <div style={{ marginTop: "30px", color: 'white', fontWeight: 800, textAlign: "center", fontSize: "24px" }}>ESCAPE THE MAZE</div>

                        <hr style={{ marginLeft: "5%", color: "white", opacity: "100%", background: "white", width: "90%", marginTop: "5%" }} />


                        <div style={{ marginBottom: "10%", textAlign: "center", marginTop: "50px", color: 'white', fontWeight: 500, fontSize: "24px" }}>SELECT THE MAZE</div>


                        <div id="carouselExampleControlsNoTouching" class="carousel slide-fade" data-bs-touch="false" data-bs-interval="false" >
                            <div class="carousel-inner" style={{ display: "flex", paddingRight: "104px", justifyContent: "space-around", alignItems: "center" }}>
                                <div class="carousel-item active" style={{ width: "200px", height: "200px", transform: "rotate(90deg)" }}>
                                    <h3 style={{ color: "white", letterSpacing: "3px" }}>MAZE 1</h3>
                                    <img src={testImage} style={{ height: "auto" }} class="d-block w-100" alt="..." />

                                </div>
                                <div class="carousel-item" style={{ width: "200px", height: "200px", transform: "rotate(90deg)" }}>
                                    <h3 style={{ color: "white", letterSpacing: "3px" }}>MAZE 2</h3>

                                    <img src={testImage1} style={{ height: "auto" }} class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item" style={{ width: "200px", height: "200px", transform: "rotate(90deg)" }}>
                                    <h3 style={{ color: "white", letterSpacing: "3px" }}>MAZE 3</h3>

                                    <img src={testImage2} style={{ height: "auto" }} class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item" style={{ width: "200px", height: "200px", transform: "rotate(90deg)" }}>
                                    <h3 style={{ color: "white", letterSpacing: "3px" }}>MAZE 4</h3>

                                    <img src={testImage3} style={{ height: "auto" }} class="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button class="carousel-control-prev" onClick={() => counter == 0 ? setCounter(3) : setCounter(counter - 1)} type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" onClick={() => setCounter((counter + 1) % 4)} type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: "40%", height: "50%" }}>
                        <div style={{ padding: "30px 25px", width: '700px', margin: '5px', background: "transparent", borderRadius: "40px" }}>
                            <h3 style={{ padding: "0px 30px", paddingBottom: "10px", fontSize: "28px", color: "white", textAlign: "center" }}><b>INSTRUCTIONS TO PLAY</b></h3>

                            <div className="scrolling" style={{ padding: "30px 30px", overflowY: "scroll", height: "480px", background: "transparent" }}>
                                <p style={{ fontSize: "20px", lineHeight: "1.5", fontWeight: "700", color: "white" }}>
                                    After  pressing start the game, wait for a few moments till a starting point is visible.
                                    <br /><br />
                                    Timer will initiate once you press any of the W, A, S, D keys.
                                    <br /><br />
                                    Use W,A,S,D keys to move up, down, left and right respectively.
                                    <br /><br />
                                    The aim is to avoid collision with the wall and to reach the exit point in the least time possible.
                                    <br /><br />
                                    Keep an eye on timer as you move through the game and try to beat your previous time with each attempt
                                    <br /><br />
                                    All the Best!!! Keep playing
                                </p>
                            </div>

                        </div>
                        <div style={{ marginTop: "5px", display: "flex", justifyContent: "space-around", width: '700px' }}>
                            <button
                                style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "57px", marginTop: '10px', color: "white", background: "linear-gradient(179.39deg, #32CD32 0.53%, white 334.01%)", backdropfilter: "blur(47.5px)" }}
                                onClick={handleShow}
                            >
                                LEARDER-BOARD
                            </button>
                            <button
                                style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "57px", marginTop: '10px', color: "white", background: "linear-gradient(179.39deg, #32CD32 0.53%, white 334.01%)", backdropfilter: "blur(47.5px)" }}
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
                                        <select onChange={(e) => setType(e.target.value)}>
                                            <option selected disabled value="">Select Maze</option>
                                            <option value="Maze 1">Maze 1</option>
                                            <option value="Maze 2">Maze 2</option>
                                            <option value="Maze 3">Maze 3</option>
                                            <option value="Maze 4">Maze 4</option>
                                        </select>
                                        <Leaderboard type={type} />
                                    </Modal.Body>
                                </div>

                            </Modal>

                        </div>
                    </div>


                </div>

                <Canvas
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        position: [0, 0, 10]
                    }}
                >
                    <color args={["#252731"]} attach="background" />


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
                        <UFO />
                    </Suspense>

                </Canvas>

            </div>

            <div className="container d-none mobile-sm">
                <h2>
                Thanks for visiting our gaming section! To get the best possible experience, we recommend accessing our site on a PC.
                </h2>
            </div>
        </>
    );
}

export default Home;

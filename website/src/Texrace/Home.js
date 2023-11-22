import "@fontsource/chakra-petch";
import { Html, OrbitControls, Sky, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useSound from "use-sound";
import Leaderboard from './Leaderboard';
import "./style.css";
import { Modal, Button } from "react-bootstrap";
import SoundEffects from "./SoundEffects";

function Home() {
  const [state, setSate] = useState(false)

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  function challengeBtn() {
    setCount(50);
    if (!localStorage.getItem("userToken")) {
      alert("Please login or register to record your game");
      window.location.pathname = `/login`;
    }
    const elements = document.getElementsByClassName("radioBtn");
    for (var i = 0; i < elements.length; i++) {
      elements[i].checked = true;
    }
  }
  function startBtn() {
    const elements = document.getElementsByClassName("radioBtn");
    const propsNames = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked) propsNames.push(elements[i].value);
    }
    if (propsNames.length === 0) {
      alert("Select props");
      return;
    }
    const params = new URLSearchParams({
      level: count,
      propsNames: propsNames,
    });
    navigate({ pathname: "/TexraceGame", search: params.toString() });
  }
  useEffect(() => {
    console.log(count);
  }, [count]);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  })

  return (
    <>
    <div className="texRaceContainer">
      <div style={{ background: 'transparent', width: "80%", height: "80%", position: 'absolute', zIndex: 2, display: "flex", marginTop: '2%', marginLeft: "4%", fontWeight: 700 }}>

        <div className="optionsContainer" style={{ width: '70%', height: '50%', marginTop: "0px", padding: "0px" }}>

          <div style={{ marginTop: "30px", top: '45px', left: '180px', fontSize: '94px', textAlign: "center", color: "white" }}>TEX-RACE</div>
          <div style={{ marginTop: "30px", color: '#d347fc', fontWeight: 800, textAlign: "center", fontSize: "24px" }}>CUSTOMIZE YOUR GAME</div>

          <hr style={{ marginLeft: "5%", color: "white", opacity: "100%", background: "white", width: "90%" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "20px", marginTop: "20px", height: "50px" }}>

            <div style={{ textAlign: "left", color: 'white', fontWeight: 500, fontSize: "24px" }}>NO. OF OBSTACLES</div>

            <div style={{ display: "flex" }}>
              <button
                style={{ borderRadius: "10px", color: "white", display: 'inline-block', width: "50px", height: "50px", background: "linear-gradient(180deg,#d347fc, white)" }}
                onClick={() => {
                  if (count > 1) setCount(count - 1);
                }}
              >
                <span style={{ fontWeight: "bolder", fontSize: "24px" }}>-</span>
              </button>

              <input className="levelvalue" onChange={(e) => { if (e.target.value > 49) setCount(49); else setCount(e.target.value) }} value={count} style={{ width: "4vw", border: "none", color: "white", background: "transparent", fontSize: "28px", marginLeft: "10px", marginRight: "0px" }} />

              <button
                style={{ borderRadius: "10px", color: "white", display: 'inline-block', width: "50px", height: "50px", background: "linear-gradient(180deg,#d347fc, white)" }}
                onClick={() => {
                  if (count < 49) setCount(Number(count) + 1);
                }}
              >
                <span style={{ fontWeight: "bolder", fontSize: "24px" }}>+</span>
              </button>
            </div>

          </div>

          <div className="optionsContainer">
            <div style={{ marginBottom: "10px", marginTop: "10px", textAlign: "left", color: 'white', fontWeight: 500, fontSize: "24px" }}>CHOOSE YOUR OBSTACLES</div>
            <label style={{ marginTop: "18px", fontSize: '20px', textAlign: "left", color: "white" }}>
              <input
                type="checkbox"
                value="BlockAxe"
                name="Axe"
                className="radioBtn"
                style={{ marginRight: "20px" }}
              />
              AXE
            </label >
            <label style={{ marginTop: "18px", fontSize: '20px', textAlign: "left", color: "white" }}>
              <input
                type="checkbox"
                value="BlockLimbo"
                name="Limbo"
                className="radioBtn"
                style={{ marginRight: "20px" }}
              />
              LIMBO
            </label>
            <label style={{ marginTop: "18px", fontSize: '20px', textAlign: "left", color: "white" }}>
              <input
                type="checkbox"
                value="BlockSpinner"
                name="Spinner"
                className="radioBtn"
                style={{ marginRight: "20px" }}
              />
              SPINNER
            </label>
          </div>

          <hr style={{ marginTop: "5%", marginLeft: "5%", color: "white", opacity: "100%", background: "white", width: "90%" }} />

          <div style={{ textAlign: "center" }}>
            <div style={{ marginTop: '15px', color: 'white', fontWeight: 700, fontSize: "24px" }}><b>SET A RECORD AND GET ON THE LEADER-BOARD</b></div>
            <button
              style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "57px", marginTop: '15px', color: "rgba(255,255,255,0.79)", background: "linear-gradient(179.39deg, #D347FC 0.53%, #6CE6F9 234.01%)", backdropfilter: "blur(47.5px)" }}
              onClick={() => challengeBtn()}
            >
              CHALLENGE MODE
            </button>

          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "40%", height: "50%" }}>
          <div style={{ padding: "30px 25px", width: '700px', margin: '5px', background: "transparent", borderRadius: "40px" }}>
            <h3 style={{ padding: "0px 30px", paddingBottom: "10px", fontSize: "28px", color: "white", textAlign: "center" }}><b>INSTRUCTIONS TO PLAY</b></h3>

            <div className="scrolling" style={{ padding: "20px 30px", marginTop: "10px", overflowY: "scroll", height: "480px", background: "linear-gradient(136.42deg, rgba(204, 29, 255, 0.75) 2.01%, rgba(52, 126, 255, 0.75) 101.57%)" }}>
              <p style={{ fontSize: "20px", lineHeight: "1.5", fontWeight: "700", color: "white" }}>
              After  pressing start the game, wait for a few moments till a starting point is visible.
                <br /><br />
                Timer will initiate once you press any of the W, A, S, D keys.
                <br /><br />
                Use W,A,S,D keys to move in front, back, left and right respectively.
                <br /><br />
                For overcoming the obstacles and reaching higher platforms  jump using the space key
                <br /><br />
                The aim is to reach the finish point in the least time possible. So move fast, jump over obstacles and try to avoid any hazards on the way
                <br /><br />
                All the Best!!! Keep playing
              </p>
            </div>

          </div>
          <div style={{ marginTop: "5px", display: "flex", justifyContent: "space-around", width: '700px' }}>
            <button
              style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "57px", marginTop: '10px', color: "white", background: "linear-gradient(179.39deg, #D347FC 0.53%, #6CE6F9 234.01%)", backdropfilter: "blur(47.5px)" }}
              onClick={handleShow}
            >
              LEARDER-BOARD
            </button>
            <button
              style={{ padding: "1vw", borderRadius: "1vw", fontWeight: 600, display: 'inline-block', width: "200px", height: "57px", marginTop: '10px', color: "white", background: "linear-gradient(179.39deg, #D347FC 0.53%, #6CE6F9 234.01%)", backdropfilter: "blur(47.5px)" }}
              onClick={() => startBtn()}
            >
              START
            </button>
            
             <Modal show={showModal} onHide={handleClose}  style={{fontFamily:'Chakra Petch'}}>
              <div style={{display:"flex",flexDirection:"column",alignContent:"center",height:"90vh"}}>
              <Modal.Header closeButton >
                <Modal.Title style={{fontWeight:"bold",fontSize:"30px",color:"#d347fc"}}><br/>LEADER-BOARD</Modal.Title>
              </Modal.Header>
              <Modal.Body className="scrolling scrolling-black" style={{textAlign:"center",alignContent:"center", overflowY:"scroll"}}>
                <Leaderboard gameName="texrace"/>
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
          position: [-sizes.width / sizes.width * 4, sizes.height / sizes.height, 10]
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

        <Physics>
          <RigidBody colliders="ball" restitution={1} friction={0}>
            <mesh position={[-(sizes.width / sizes.width * 4), sizes.height / sizes.height, 0]}>
              <icosahedronGeometry args={[0.7, 1]} />
              <meshStandardMaterial flatShading color='mediumpurple' />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed" restitution={1} friction={0}>
            <mesh receiveShadow position={[-sizes.width / sizes.width * 4, -sizes.height / sizes.height * 7, 0]} rotation-x={- Math.PI * 0.5} rotation-z={- Math.PI * 0.1} scale={10}>
              <planeGeometry />
              <meshStandardMaterial color="greenyellow" />

            </mesh>
          </RigidBody>

        </Physics>

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

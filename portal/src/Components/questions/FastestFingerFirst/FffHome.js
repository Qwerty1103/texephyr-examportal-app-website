import React, { useEffect } from 'react'
import Modelbuilder from './Modelbuilder'
import Camera from '../../Proctoring/camera'
import { useLocation } from "react-router-dom";

function FffHome() {
  const location = useLocation();
  const id = location.state.roundid;
  const roundName = location.state.roundname;
  const camera = location.state.camera;

  return (
    <>
      { camera ? <Camera /> : null}
      <Modelbuilder roundid={id} roundname={roundName} />
    </>
  )
}

export default FffHome;

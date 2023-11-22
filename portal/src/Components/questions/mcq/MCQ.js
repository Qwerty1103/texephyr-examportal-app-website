import React from 'react'
import ModelBuilder from './ModelBuilder'
import Camera from '../../Proctoring/camera'
import { useLocation } from "react-router-dom";
function MCQ() {
  const location = useLocation();
  const id = location.state.roundid;
  const roundName = location.state.roundname;
  const camera = location.state.camera;
  return (
    <>
    {/* Main Page for Redering MCQ Model
          MCQ.js
            |ModelBuilder.js(Request Questions!)
              |BoilerPlate.js
    */}
    { camera ? <Camera /> : null}
        <div style={{height:"100%"}}>
          <ModelBuilder roundid={id} roundname={roundName}/>
        </div>
    </>
  )
}

export default MCQ
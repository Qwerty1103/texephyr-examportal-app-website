import { useKeyboardControls } from "@react-three/drei"
import useGame from "./stores/useGame"
import { addEffect } from "@react-three/fiber"
import './style.css'

import {useEffect,useRef,useState } from "react"
import { USERAPIURL } from "../Components/Constants";
import axios from "axios";
import SoundEffects from "./SoundEffects"
import useSound from "use-sound"
import { useLocation } from "react-router";
import React from "react";
import { useParams } from "react-router";

export default function Interface()
{
   const time=useRef()
   const message=useRef()
   const {maze}=useParams()

   const restart=useGame((state)=>state.restart)
   const phase=useGame((state)=>state.phase)
   const [userid, setuserid] = useState("");
   const [elapsedtime, setelapsedtime]=useState(0)
   const upward=useKeyboardControls((state)=>state.upward )
    const downward=useKeyboardControls((state)=>state.downward)
    const leftward=useKeyboardControls((state)=>state.leftward)
    const rightward=useKeyboardControls((state)=>state.rightward)

    useEffect(()=>
    {
      const unsubcribeEffect=addEffect(()=>
      {
         const state=useGame.getState()
         let elapsedTime=0

         if(state.phase==='playing')
         elapsedTime=Date.now()-state.startTime

         else if(state.phase==='ended')
         elapsedTime=state.endTime-state.startTime

         elapsedTime/=1000
         elapsedTime=elapsedTime.toFixed(2)
         
         if(time.current)
         time.current.textContent=elapsedTime

         setelapsedtime(elapsedTime);

      })


      if (localStorage.getItem("userToken")) {
         axios.get(USERAPIURL + "getWebUserId", {
             headers: { "Authorization": `${localStorage.getItem("userToken")}` }
         }).then((res) => {
             setuserid(res.data.id);
             
         }).catch((err) => {
             console.log(err);
         })
     }

      return()=>
      {
         unsubcribeEffect()
      }
    },[])


    useEffect(() => {
      if (phase === 'ended') {
          const sendScore = async () => {
            try {
              const res = await fetch(USERAPIURL + "sendGameScore", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ gameName: "Route51", userid: userid, time: elapsedtime,type:  "Maze "+(parseInt(maze)+1)}),
              });
      
              const msg = await res.json();
              
              message.current.textContent=msg
              
              // Display the message to the user using a separate component or library
            } catch (error) {
              console.error(error);
              // Handle the error appropriately
            }
          };
      
          sendScore();
        }
      }, [phase])
    
    return <div className="interface">

        {/* Time */}
        <div className="time"><span ref={time}>0.00</span></div>

        {/* Restart */}
        {phase === 'ended' && <div className="restart" onClick={restart}>RESTART</div>}

        {
          phase === 'ended' && <div style={{marginTop:"0px",fontSize:"20px"}} ref={message} className="restart messagecss"></div>
        }
        

        {/* Button */} 
        <div className="ctr">

        <div className="raw">
           <div className={`key ${upward ? 'active1' : ''}` }></div>
        </div>

        <div className="raw">
           <div className={`key ${leftward ? 'active1' : ''}`}></div>
           <div className={`key ${downward ? 'active1' : ''}`}></div>
           <div className={`key ${rightward ? 'active1' : ''}`}></div>
        </div>

       </div>
        
       <div style={{zIndex:0,fontSize:"50px",color:"white",position:"fixed",bottom:'0px',right:'20px',opacity:0.4,letterSpacing:'7px'}}>
            <h1>PSONK</h1>
        </div> 

    </div>
}
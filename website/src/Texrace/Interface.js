import { useKeyboardControls } from "@react-three/drei"
import {useEffect,useRef,useState } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "../Texrace/stores/useGame.js";
import { USERAPIURL } from "../Components/Constants";
import axios from "axios";

import SoundEffects from "./SoundEffects"
import useSound from "use-sound"
import { useLocation } from "react-router";

import React from "react";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Interface()
{
    let query = useQuery();
    var level = parseInt(query.get("level"));

    const time=useRef()
    const message=useRef()
    const [userid, setuserid] = useState("");
    const [elapsedtime, setelapsedtime]=useState(0)
    const restart=useGame((state)=>state.restart)
    const phase=useGame((state)=>state.phase)

    const forward=useKeyboardControls((state)=>state.forward )
    const backward=useKeyboardControls((state)=>state.backward)
    const leftward=useKeyboardControls((state)=>state.leftward)
    const rightward=useKeyboardControls((state)=>state.rightward)
    const jump=useKeyboardControls((state)=>state.jump)

    useEffect(()=>
    {
        const unsubcribedEffect=addEffect(()=>
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

        return ()=>
        {
            unsubcribedEffect()
        }
    },[])

    useEffect(() => {
        if (phase === 'ended' && level==50) {
            const sendScore = async () => {
              try {
                const res = await fetch(USERAPIURL + "sendGameScore", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ gameName: "TexRace", userid: userid, time: elapsedtime }),
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

    // const [state,setSate]=useState(true)
    // const soundUrl = './texraces.mp3';
    // const [play, { stop, isPlaying }] = useSound(soundUrl,{volume:1,loop:true,playbackRate:1,autoplay:true,interrupt: true});

    // function music()
    // {
    //     if(state)
    //         play()
    //     else
    //         stop()
    // }

    return <>
  
    <div className="interface">

        {/* Time */}
        <div ref={time} className="time">0.00</div>

        {/* Restart */}
        {phase === 'ended' && <div className="restart" onClick={restart}>RESTART</div>}

        {
          level==50 ? phase === 'ended' && <div style={{marginTop:"0px",fontSize:"20px"}} ref={message} className="restart messagecss"></div>: null
        }
     

        {/* Button */} 
        <div className="ctr">

        <div className="raw">
           <div onClick={forward} className={`key ${forward ? 'active1' : ''}` }></div>
        </div>

        <div className="raw">
           <div onClick={leftward} className={`key ${leftward ? 'active1' : ''}`}></div>
           <div onClick={backward} className={`key ${backward ? 'active1' : ''}`}></div>
           <div onClick={rightward} className={`key ${rightward ? 'active1' : ''}`}></div>
        </div>

        <div className="raw">
          <div onClick={jump} className={`key large ${jump ? 'active1' : ''}`}></div>
        </div>

       </div>  

       <div style={{zIndex:0,fontSize:"50px",color:"white",position:"fixed",bottom:'0px',right:'20px',opacity:0.4,letterSpacing:'7px'}}>
            <h1>PSONK</h1>
        </div> 

    </div>
    </>
}
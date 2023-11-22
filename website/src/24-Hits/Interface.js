import useGame from "../24-Hits/stores/useGame.js";
import { useKeyboardControls } from "@react-three/drei"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { addEffect } from "@react-three/fiber"
import axios from "axios";
import { USERAPIURL } from "../Components/Constants";


function refreshPage() {
    window.location.reload(false);
}

export default function Interface() {

    const time = useRef()
    const message=useRef()
    const [elapsedtime, setelapsedtime]=useState(0)
    const [userid, setuserid] = useState("");
    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)


    useEffect(() => {
        const unsubcribedEffect = addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0

            if (state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if (state.phase === 'ended')
            {
                elapsedTime = state.endTime - state.startTime
            }
                

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if (time.current)
                time.current.textContent = elapsedTime


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

        

        return () => {
            unsubcribedEffect()
        }
    }, [])

    useEffect(() => {
        console.log(parseInt(localStorage.getItem("hits")))
        if (phase === 'ended' && (parseInt(localStorage.getItem("hits")))>=23) {
            
            const sendScore = async () => {
              try {
                console.log("in post")
                const res = await fetch(USERAPIURL + "sendGameScore", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ gameName: "24Hit", userid: userid, time: elapsedtime }),
                });
                localStorage.removeItem("hits")
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
        <div className="time"><span className="timeCount" ref={time}>0.00</span></div>


        {/* Restart */}
        {phase === 'ended' && <div className="restart" onClick={refreshPage}>RESTART</div>}

        {
          (parseInt(localStorage.getItem("hits"))>=23) ? phase === 'ended' && <div style={{marginTop:"0px",fontSize:"20px"}} ref={message} className="restart messagecss"></div>: null
        }


        {/* Button */}
        <div className="ctr">

            <div className="raw">
                <div onClick={forward} className={`key ${forward ? 'active1' : ''}`}></div>
            </div>

            <div className="raw">
                <div onClick={leftward} className={`key ${leftward ? 'active1' : ''}`}></div>
                <div onClick={backward} className={`key ${backward ? 'active1' : ''}`}></div>
                <div onClick={rightward} className={`key ${rightward ? 'active1' : ''}`}></div>
            </div>

        </div>


        <div style={{zIndex:0,fontSize:"50px",color:"white",position:"fixed",bottom:'0px',right:'20px',opacity:0.4,letterSpacing:'7px'}}>
            <h1>PSONK</h1>
        </div> 


    </div>
}
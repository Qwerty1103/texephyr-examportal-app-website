import React, { useState, useEffect } from "react";

function Timer(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [done, setDone] = useState(false);

  useEffect(() => {
    setHours(Math.floor(props.time / 60));
    setMinutes(Math.floor(props.time % 60));
    setSeconds(0);
  }, [props.time]);

  useEffect(() => {
    if(done)
    {
      const startTime=localStorage.getItem("StartTime");
      const endTime=localStorage.getItem("EndTime");
      props.submitTest((endTime-startTime)/1000);
    }
  }, [done])
  
  const getTime = () => {
    if (seconds === 0) {
      if (minutes !== 0) setMinutes(minutes - 1);
      else {
        if (hours !== 0) {
          setHours(hours - 1);
          setMinutes(59);
        } else {
          setSeconds(59);
          setDone(true)
          return;
        }
      }
      setSeconds(59);
    } else {
      setSeconds(seconds - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  return (
    <>
      <div>
        <div id="mainTimerContainer" allowFullScreen>
          <div style={{ padding: "1vw", fontSize: "1vw" ,color:'white' }}>Timer:</div>
          <div className="Timer-SubContainer" id="hour" style={{color:'white',border:'none'}}>
            {hours}
          </div>
          <div className="Timer-SubContainer" id="minute" style={{color:'white',border:'none'}}>
            {minutes}
          </div>
          <div className="Timer-SubContainer" id="seconds" style={{color:'white',border:'none'}}>
            {seconds}
          </div>
        </div>
      </div>
    </>
  );
}

export default Timer;

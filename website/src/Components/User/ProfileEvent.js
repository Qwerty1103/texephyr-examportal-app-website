import React, { useEffect, useState } from "react";
import teamIcon from "../images/teamIcon.png"
import "./profileevent.css";
import Rodal from "rodal";
import Form2Update from "./Form2Update";
import Form3Update from "./Form3Update";
import Form4Update from "./Form4Update";
import Form5Update from "./Form5Update";
import { FRONTENDURL } from "../Constants";
/* test */
const ProfileEvent = (props) => {

  const [teamIconState, setTeamIconState] = useState("hideTeamIcon");
  const [visible, setVisible] = useState(false);

  useEffect(() => 
  {
    if(props.event.entries > 1)
    {
      setTeamIconState("showTeamIcon")
    }
    else
      setTeamIconState("hideTeamIcon")
  },[])

  let calDate = new Date(props.event.date);
  let day = calDate.toLocaleString('en-us', { weekday: 'long' });
  const timeString = props.event.time
// Prepend any date. Use your birthday.
  const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  );

  if(props.event.entries === 1)
  {
    return (
      <>
      <div className="col-lg-4">
        <div className="containerProfileEvent">
          <div className="containerTopProfileEvent">
            <h1>{props.event.name}</h1>
          </div>
  
          <ul className="container__subheading">
            <li>{day}</li>
            <li>{calDate.getUTCDate() + '/' + (calDate.getMonth()+1)}</li>
            <li>{timeString12hr}</li>
          </ul>
  
          <p className="container__p">{props.event.content}</p>
        </div>
      </div>
      </>
      
    );
  }
  else if(props.event.entries === 2 ) {
    return (
      <>
      <div className="col-lg-4">
        <div className="containerProfileEvent">
          <div className="containerTopProfileEvent">
            <h1>{props.event.name}</h1>
            <img onClick={() => setVisible(true)} className={`teamIcon ${teamIconState}`} src={teamIcon} alt="" />
            <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={() => setVisible(false)}>
                            <Form2Update id = {props.id} eventid = {props.event._id} close={() => window.location.replace(FRONTENDURL + "profile")} />
                        </Rodal>
                    </div>
          </div>
          <ul className="container__subheading">
            <li>{day}</li>
            <li>{calDate.getUTCDate() + '/' + (calDate.getMonth()+1)}</li>
            <li>{timeString12hr}</li>
          </ul>
  
          <p className="container__p">{props.event.content}</p>
        </div>
      </div>
      </>
      
    );
  }
  else if(props.event.entries === 3 ) {
    return (
      <>
      <div className="col-lg-4">
        <div className="containerProfileEvent">
          <div className="containerTopProfileEvent">
            <h1>{props.event.name}</h1>
            <img onClick={() => setVisible(true)} className={`teamIcon ${teamIconState}`} src={teamIcon} alt="" />
            <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={() => setVisible(false)}>
                            <Form3Update id = {props.id} eventid = {props.event._id} close={() => window.location.replace(FRONTENDURL + "profile")} />
                        </Rodal>
                    </div>
          </div>
          <ul className="container__subheading">
            <li>{day}</li>
            <li>{calDate.getUTCDate() + '/' + (calDate.getMonth()+1)}</li>
            <li>{timeString12hr}</li>
          </ul>
  
          <p className="container__p">{props.event.content}</p>
        </div>
      </div>
      </>
      
    );
  }
  else if(props.event.entries === 4 ) {
    return (
      <>
      <div className="col-lg-4">
        <div className="containerProfileEvent">
          <div className="containerTopProfileEvent">
            <h1>{props.event.name}</h1>
            <img onClick={() => setVisible(true)} className={`teamIcon ${teamIconState}`} src={teamIcon} alt="" />
            <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={() => setVisible(false)}>
                            <Form4Update id = {props.id} eventid = {props.event._id} close={() => window.location.replace(FRONTENDURL + "profile")} />
                        </Rodal>
                    </div>
          </div>
          <ul className="container__subheading">
            <li>{day}</li>
            <li>{calDate.getUTCDate() + '/' + (calDate.getMonth()+1)}</li>
            <li>{timeString12hr}</li>
          </ul>
  
          <p className="container__p">{props.event.content}</p>
        </div>
      </div>
      </>
      
    );
  }
  else if(props.event.entries === 5 ) {
    return (
      <>
      <div className="col-lg-4">
        <div className="containerProfileEvent">
          <div className="containerTopProfileEvent">
            <h1>{props.event.name}</h1>
            <img onClick={() => setVisible(true)} className={`teamIcon ${teamIconState}`} src={teamIcon} alt="" />
            <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={() => setVisible(false)}>
                            <Form5Update id = {props.id} eventid = {props.event._id} close={() => window.location.replace(FRONTENDURL + "profile")} />
                        </Rodal>
                    </div>
          </div>
          <ul className="container__subheading">
            <li>{day}</li>
            <li>{calDate.getUTCDate() + '/' + (calDate.getMonth()+1)}</li>
            <li>{timeString12hr}</li>
          </ul>
  
          <p className="container__p">{props.event.content}</p>
        </div>
      </div>
      </>
      
    );
  }

};

export default ProfileEvent;

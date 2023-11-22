import axios from "axios";
import Dropdown from 'react-dropdown';
import React, { useEffect, useState } from "react";
import { ADMINAPIURL, PORTALADMINAPI, USERAPIURL } from "../Constants";

import "./roundForm.css";

const RoundForm = (props) => {

  const [eventName, setEventName] = useState("");
  const [options, setOptions] = useState([]);
  const [roundName, setRoundName] = useState("");
  const [level, setLevel] = useState("0");
  const [type, setType] = useState("");
  const [rules, setRules] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  useEffect(() =>{
    axios.get(USERAPIURL + 'getAllEventNames').then((response) =>{
        setOptions(response.data)
    })
  },[])

  const formData = new FormData()

  const eventNameHandler = (event) => {
    setEventName(event.target.value);
  }
  const roundNameHandler = (event) => {
    setRoundName(event.target.value);
  };
  const levelHandler = (event) => {
    setLevel(event.target.value);
  };
  const typeHandler = (event) => {
    setType(event.target.value);
  };
  const rulesHandler = (event) => {
    setRules(event.target.value);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const startTimeHandler = (event) => {
    setStartTime(event.target.value);
  };
  const endTimeHandler = (event) => {
    setEndTime(event.target.value);
  };
  const durationHandler = (event) => {
    setDuration(event.target.value);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    formData.set('name', roundName)
    formData.set('eventName', eventName.value)
    formData.set('level', level)
    formData.set('type', type)
    formData.set('rules', rules)
    formData.set('date', new Date(date))
    formData.set('startTime', startTime)
    formData.set('endTime', endTime)
    formData.set('duration', duration)

    axios.post(
      PORTALADMINAPI + "add_round",
      formData
    ).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })

    console.log(formData);
  };

  return (
      <form id="roundForm" onSubmit={submitHandler}>
        <div className="roundAdder__container__roundForm swing-in-top-fwd ">

          <div className="roundAdder__container__roundForm-groupA">
            <label>Event Name</label>
            <Dropdown options={options} onChange={(value) => setEventName(value)} value={eventName} placeholder="Select an option" />
            <label>Round Name</label>
            <input type="text" placeholder="Enter Round Name" value={roundName} onChange={roundNameHandler} required />
            <label>Level</label>
            <input type="number" placeholder="Enter Level" value={level} onChange={levelHandler} required />
          </div>

          <div className="roundAdder__container__roundForm-groupB">
            <label>Type</label>
            <div onChange={typeHandler}>
              <input type="radio" value="MCQS" name="type" /> MCQs
              <input type="radio" value="CODING" name="type" /> Coding
              <input type="radio" value="PUZZLE" name="type" /> Puzzle
              <input type="radio" value="FFF" name="type" /> FFF
              <input type="radio" value="PSUEDOCODE" name="type" /> PSUEDOCODE
            </div>
          </div>

          <div className="roundAdder__container__roundForm-groupC">
            <label>Rules</label>
            <input type="text"  placeholder= "Enter Rules"  value={rules}  onChange={rulesHandler} required />
          </div>

          <div className="roundAdder__container__roundForm-groupD">
            <div>
              <label>Date</label>
              <input type="date" placeholder="" value = {date} onChange={dateHandler} required />
            </div>
            <div>
              <label>Start Time</label>
              <input type="time" placeholder="" value = {startTime} onChange={startTimeHandler} required />
            </div>
            <div>
              <label>End Time</label>
              <input type="text" placeholder="" value = {endTime} onChange={endTimeHandler} required />
            </div>
            <div>
              <label>Duration</label>
              <input type="number" placeholder="" value = {duration} onChange={durationHandler} required />
            </div>
          </div>

          <div className="roundAdder__container__button">
            <button className="btn" type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button className="btn" type="submit">
              Add Round
            </button>
          </div>

        </div>
      </form>
    );
}

export default RoundForm;

import axios from "axios";
import React, { useState } from "react";
import { ADMINAPIURL } from "../Constants";

import "./eventForm.css";

const EventForm = (props) => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [dept, setDept] = useState("");
  const [entries, setEntries] = useState("0");
  const [rounds, setRounds] = useState("0");
  const [fees, setFees] = useState("0");

  const formData = new FormData()

  const fileChange = event => {
    if(event.target && event.target.files[0]){
      console.log(event.target.files[0])
      formData.set("proof",event.target.files[0])
    }
  }

  const eventNameHandler = (event) => {
    setEventName(event.target.value);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const timeHandler = (event) => {
    setTime(event.target.value);
  };

  const durationHandler = (event) => {
    setDuration(event.target.value);
  };
  const detailsHandler = (event) => {
    setDetails(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const entriesHandler = (event) => {
    setEntries(event.target.value);
  };
  const roundsHandler = (event) => {
    setRounds(event.target.value);
  };
  const feesMHandler = (event) => {
    setFees(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    formData.set('name', eventName)
    formData.set('date', new Date(date))
    formData.set('time', time)
    formData.set('details', details)
    formData.set('description', description)
    formData.set('dept', dept)
    formData.set('entries', entries)
    formData.set('duration', duration)
    formData.set('rounds', rounds)
    formData.set('fees', fees)

    axios.post(
      ADMINAPIURL + "createEvent",
      formData
    ).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })

    console.log(formData);
  };

  return (
    <form id="eventForm" onSubmit={submitHandler}>
      <div className="eventAdder__container__eventForm swing-in-top-fwd ">
        <div className="eventAdder__container__eventForm-groupA">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Event Title"
            value={eventName}
            onChange={eventNameHandler}
            required
          />
        </div>
        <div className="eventAdder__container__eventForm-groupB">
          <div>
            <label>Date</label>
            <input type="date" placeholder="" value = {date} onChange={dateHandler} required />
          </div>
          <div>
            <label>Time</label>
            <input type="time" placeholder="" value = {time} onChange={timeHandler} required />
          </div>

          <div>
            <label>Duration</label>
            <input
              type = "string"
              placeholder="Duration in Hrs"
              value={duration}
              onChange={durationHandler}
              required
            />
          </div>
        </div>

        {/* {(date !== "" && time !== "" && duration !== "")
        ? <p>The event will take place on {date} at {time} for {duration}</p>
        : <p></p>
      } */}

        <div className="eventAdder__container__eventForm-groupC">
          <label>Details</label>
          <textarea rows={10}
            type="text"
            placeholder= "Enter Details"
            value={details}
            onChange={detailsHandler}
            required
          />

          <label>Description</label>
          <textarea rows={3}
            type="text"
            placeholder= "Enter Description (Brief about Event)"
            value={description}
            onChange={descriptionHandler}
            required
          />

          <label>Department</label>
          <input
            type="text"
            placeholder= "Enter Department"
            value={dept}
            onChange={e => setDept(e.target.value)}
            required
          />
        </div>

        <div className="eventAdder__container__eventForm-groupD">
          <div>
            <label>Entries</label>
            <input
              type="number"
              value={entries}
              onChange={entriesHandler}
              required
            />
          </div>
          <div>
            <label>No of round</label>
            <input type="number" value={rounds} onChange={roundsHandler} required />
          </div>
          <div>
            <label>Fees</label>
            <input
              type="number"
              value={fees}
              onChange={feesMHandler}
              required
            />
          </div>
        </div>

        <div className="eventAdder__container__eventForm-imgUpload">
          <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={fileChange} />
        </div>

        <div className="eventAdder__container__button">
          <button className="btn" type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className="btn" type="submit">
            Add Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;

import React, { useState } from "react";
import EventForm from './EventForm'

import "./eventAdder.css";

const EventAdder = () => {
  const [formToggled, setFormToggled] = useState(false);
  const clickHandler = () => {
    setFormToggled(true);
  };

  const cancelClickHandler = () => {
    setFormToggled(false);
  };
  return (
    <div className="eventAdder__container">
      {!formToggled && (
        <button className="btn" type="button" onClick={clickHandler}>
          Add Event
        </button>
      )}
      {formToggled && <EventForm onCancel={cancelClickHandler} />}
    </div>
  );
};

export default EventAdder;

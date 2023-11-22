import React, { useState } from "react";
import RoundForm from './RoundForm'

import "./roundAdder.css";

const RoundAdder = () => {
  const [formToggled, setFormToggled] = useState(false);
  const clickHandler = () => {
    setFormToggled(true);
  };

  const cancelClickHandler = () => {
    setFormToggled(false);
  };
  return (
    <div className="roundAdder__container">
      {!formToggled && (
        <button className="btn" type="button" onClick={clickHandler}>
          Add Round
        </button>
      )}
      {formToggled && <RoundForm onCancel={cancelClickHandler} />}
    </div>
  );
};

export default RoundAdder;
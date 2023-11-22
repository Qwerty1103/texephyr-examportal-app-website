import React from "react";

import "./eventCarouselItem.css"

const EventCarouselItem = (props) => {
  return (
    <div
      className="carousel__container"
      style={{ backgroundImage: `url(${props.image})`}}
    >
      <div className="carousel__container__content">
        <h1>{props.heading}</h1>
        <p>{props.para}</p>
      </div>
    </div>
  );
};

export default EventCarouselItem;
//

import EventCarouselItem from "./EventCarouselItem.js";
import images from "../../image.js";
import './eventCarousel.css'
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { USERAPIURL } from "../Constants.js";

function EventCarousel() {
  // const [s2p2, sets2p2] = useState("")
  // const [s2p3, sets2p3] = useState("")
  // const [s2p4, sets2p4] = useState("")
  // const [s2p5, sets2p5] = useState("")
  // const [s2p6, sets2p6] = useState("")
  // const [s2p7, sets2p7] = useState("")

  // useEffect(() => {
  //   axios(
  //     {
  //       method: "POST",
  //       url: USERAPIURL + "getContent",
  //       data: { "page": "home" }
  //     }
  //   )
  //     .then((response) => {
  //       sets2p2(response.data.content.s2p2)
  //       sets2p3(response.data.content.s2p3)
  //       sets2p4(response.data.content.s2p4)
  //       sets2p5(response.data.content.s2p5)
  //       sets2p6(response.data.content.s2p6)
  //       sets2p7(response.data.content.s2p7)
  //     }
  //     )
  //     .catch((err) => { console.log(err) })
  // }, [])

  const data = [
    {
      id: 1,
      heading:"Build Your Network",
      para:"Texephyr provides tools and resources for networking, such as webinars and networking events, which can help you expand your reach and build your professional brand. ",
      image: images.background03
    },
    {
      id: 2,
      heading:"World Class Workshops",
      para: "Texephyr brings you world-class workshops that help you develop new interests or polish your existing skills. Join us in exploring the evolving world of technology.",
      image: images.background02
    },
    {
      id: 3,
      heading: "Expert Endorsed Certificates",
      para: "Step Up Your Game with certificates provided by Established companies and experts. At Texephyr, each participant is presented with a certificate of excellence for their efforts.",
      image: images.background01
    },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide:1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  let names = ['Certificates', 'Networking', 'Workshops']

  const CustomDot = ({ index, onClick, active }) => {
    return (
      <div className="eventSlider__container__navLinks">
        <li
          className={active ? "active" : "inactive"}
          onClick={() => onClick()}
        >
          <Link to="">{names[index]}</Link>
        </li>
      </div>
    );
  };

  const product = data.map((item) => (
    <EventCarouselItem
      key={item.id}
      heading={item.heading}
      para={item.para}
      image={item.image}
    />
  ));

  return (
    // <!-- Main Carousel Section Start -->z

    <>
      <Carousel
        responsive={responsive}
        additionalTransfrom={-720}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={7000}
        centerMode={true}
        infinite={true}
        itemClass="carouselItem"
        containerClass="carousel-container"
        keyBoardControl={true}
        renderButtonGroupOutside={false}
        focusOnSelect={true}
        renderDotsOutside={true}
        showDots={true}
        dotListClass=" navlinks custom-dot-list-style"
        customDot={<CustomDot />}
      >
        {product}
      </Carousel>

    </>

    /* <!-- Main Carousel Section End --> */
  );
}

export default EventCarousel;
//

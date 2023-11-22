import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import EventCarouselItem from "./EventCarouselItem.js";
import images from "../../image.js";
import { USERAPIURL } from "../Constants.js";
import axios from "axios";

function SmallCarousel() {
/* test */
  const [s2p2, sets2p2] = useState("")
  const [s2p3, sets2p3] = useState("")
  const [s2p4, sets2p4] = useState("")
  const [s2p5, sets2p5] = useState("")
  const [s2p6, sets2p6] = useState("")
  const [s2p7, sets2p7] = useState("")

  useEffect(() => {
    axios(
      {
        method: "POST",
        url: USERAPIURL + "getContent",
        data: { "page": "home" }
      }
    )
      .then((response) => {
        sets2p2(response.data.content.s2p2)
        sets2p3(response.data.content.s2p3)
        sets2p4(response.data.content.s2p4)
        sets2p5(response.data.content.s2p5)
        sets2p6(response.data.content.s2p6)
        sets2p7(response.data.content.s2p7)
      }
      )
      .catch((err) => { console.log(err) })
  }, [])

  const data = [
    {
      id: 1,
      heading: s2p2,
      para: s2p3,
      image: images.background03
    },
    {
      id: 2,
      heading: s2p4,
      para: s2p5,
      image: images.background02
    },
    {
      id: 3,
      heading: s2p6,
      para: s2p7,
      image: images.background01
    }
  ];

  const product = data.map((item) => (
    <EventCarouselItem
      key={item.id}
      heading={item.heading}
      para={item.para}
      image={item.image}
    />
  ));

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <Carousel interval={null}>
        <Carousel.Item>{product[0]}</Carousel.Item>
        <Carousel.Item>{product[1]}</Carousel.Item>
        <Carousel.Item>{product[2]}</Carousel.Item>
      </Carousel>
    </>
  );
}

export default SmallCarousel;

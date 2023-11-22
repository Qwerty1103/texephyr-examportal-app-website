import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { USERAPIURL } from "../Constants";

import "./contactForm.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [thoughts, setThoughts] = useState("");

  let formData = new FormData()

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const thoughtsHandler = (event) => {
    setThoughts(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    formData.set('name', name)
    formData.set('email', email)
    formData.set('thoughts', thoughts)
    
    axios(
      {
        method: "POST",
        url: USERAPIURL + "contactUs",
        data: { "name": name, "email": email, "thoughts": thoughts }
      }
    )
      .then(() => {
        toast.success("We have received your Query")
      }
      )
      .catch((err) => { console.log(err) })

    setName('');
    setEmail('');
    setThoughts('');
  };

  return (
    <div className="contactForm__container">
      <form id="contact-form" onSubmit={submitHandler}>
        <div className="contactForm__container-start">
          <input
            id = "input"
            className="i_text"
            type="text"
            placeholder="Name"
            onChange={nameHandler}
            value={name}
          />
          <input
            id = "input"
            className="i_text"
            type="email"
            placeholder="Your Email"
            onChange={emailHandler}
            value={email}
          />
          <textarea
            onChange={thoughtsHandler}
            value={thoughts}
            placeholder = "Save your Thoughts"
            className="i_text"
            id="w3review"
            name="w3review"
            rows="10"
          ></textarea>
        </div>

        <div className="contactForm__container-end">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

//

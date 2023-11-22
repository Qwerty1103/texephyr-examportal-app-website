import React from "react";

import "./contactUs.css";

import contact from "../images/contact.png";
import ContactForm from "./ContactForm";
import Navbar from "./Navbar";
import Footer from './Footer'

const ContactUs = () => {
  return (
    <>
    <Navbar />
    <section className="joining-section">
      <div className="contactPage">
        <div className="contactUs__container">
          <section className="contactUs__container__form">
            <ContactForm />
          </section>
          <section className="contactUs__container__content">
            <div className="contactUs__container__content-top">
              <img className="top-img" src={contact} alt="Contact US" />
              <h1>CONTACT</h1>
              <h1>US</h1>
            </div>
            <div className="contactUs__container__content-bot">
              <p className="contact_p">
                At Texephyr, we value your thoughts and suggestions, and we are
                always available to assist you with any queries you may have. Our
                team is dedicated to providing you with the best possible
                experience and ensuring that your voice is heard. If you have any
                questions or concerns, please don't hesitate to reach out to us.
                You can contact us through our website by filling out the form on
                our "Contact Us" page, or you can email us directly at texephyr23.communications@gmail.com. We will do our best to respond to your inquiry as
                soon as possible. Thank you for your interest in Texephyr, and we
                look forward to hearing from you soon.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};
//
export default ContactUs;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { AUTHAPIURL, FRONTENDURL, USERAPIURL } from "../Constants";
import { useLocation, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useEffect } from "react";

import { FilePond } from "react-filepond";

import "filepond/dist/filepond.min.css";

import imageCompression from "browser-image-compression";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";
import Footer from "./Footer";

// import Validate from './Validation/Validate.js'

const RegisterPage = () => {
  const navigate = useNavigate();


  const [errors, setErrors] = useState([]);



  const location = useLocation();

  const [email, setEmail] = useState("");
  

  let formData = new FormData();



  const Validate = (values) => {
    let errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.email === "") {
      errors.email = "Email cannot be blank";
    }
    if (!email_pattern.test(values.email)) {
      errors.email = "Please Enter Correct Email";
    }

    

    return errors;
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    formData.set("email", email);
   

    let values = {
    
      email: email,
     
    };

    let errors = Validate(values);
    setErrors(errors);

    if(Object.keys(errors).length === 0)
    {
        axios
        .post(USERAPIURL + "forgotPass", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => {
            if(res.status==200)
            {
                toast.success(res.data.message);
            }
            else
            {
                toast.success(res.data.message);
            }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="registerPage">
          <div className="registerImage"></div>

          <div className="registerFormContainer justify-content-center">
            <div className="headingContainer"></div>
            <Form className="registerForm" encType="multipart/form-data">
              <h1 className="head1">PASSWORD RESET</h1>
              
              <Form.Control
                type="email"
                className="registerFormInput"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              
              <div
                className="registerSubmitButton"
                onClick={handleSubmit}
                type="submit"
              >
                Proceed
              </div>
            </Form>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default RegisterPage;

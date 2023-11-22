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
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(null);
  const [progressVisible, setProgressVisible] = useState("hide");

  const [errors, setErrors] = useState([]);

  function login() {
    navigate("/login", { state: { path: FRONTENDURL + "profile" } });
  }

  const compressImage = async (image) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (p) => setProgress(p),
    };

    const compressedImage = await imageCompression(image, options);
    return compressedImage;
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      axios
        .get(USERAPIURL + "getUser", {
          headers: { Authorization: `${localStorage.getItem("userToken")}` },
        })
        .then(() => {
          window.location.replace(FRONTENDURL);
        })
        .catch((err) => {
          localStorage.removeItem("userToken");
          toast.error(err.response.data.error);
          login();
        });
    }
  });

  const location = useLocation();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [college, setCollege] = useState("MIT WPU");
  const [uploaded, setUploaded] = useState("notUploaded");

  let formData = new FormData();

  const fileChange = (image) => {
    setImage(image);
    setUploaded("uploaded");
    if (!image[0].file) setProgressVisible("hide");
  };

  const Validate = (values) => {
    let errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.name.length < 2) {
      errors.name = "Name must be longer than 2 letters.";
    }
    if (values.name === "") {
      errors.name = "Name cannot be blank";
    }

    if (values.college.length < 2 || values.college === "") {
      errors.college = "College Name cannot be blank";
    }

    if (values.email === "") {
      errors.email = "Email cannot be blank";
    }
    if (!email_pattern.test(values.email)) {
      errors.email = "Please Enter Correct Email";
    }

    if (values.password === "") {
      errors.password = "Password cannot be blank";
    }

    if (values.password.length < 8) {
      errors.password = "Password must have more than 8 characters";
    }

    if (values.phone === "") {
      errors.phone = "Please enter a phone number";
    }
    if (
      values.phone.toString().length > 10 ||
      values.phone.toString().length < 10
    ) {
      errors.phone = "Please enter a 10 Digit Phone Number";
    }

    return errors;
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    let phoneInt = parseInt(phone);

    formData.set("name", fname);
    formData.set("phone", phoneInt);
    formData.set("email", email);
    formData.set("college", college);
    formData.set("password", password);

    let values = {
      name: fname,
      email: email,
      password: password,
      phone: phoneInt,
      college: college,
      image: image,
    };

    let errors = Validate(values);
    setErrors(errors);

    if(image.length === 0)
    {
        toast.error("Please Add ID Proof")
    }
    else if(Object.keys(errors).length === 0)
    {
      setProgressVisible("show");
      compressImage(image[0].file)
      .then((file) => {
        formData.set("proof", file);
          axios
            .post(AUTHAPIURL + "createUser", formData, {
              headers: { "content-type": "multipart/form-data" },
            })
            .then((res) => {
              localStorage.setItem("userToken", res.data.authToken);
              toast.success("Account Created Successfully");
              if (location.state) window.location.replace(location.state.path);
              else {
                window.location.replace(FRONTENDURL);
              }
            })
            .catch((err) => {
              toast.error(err.response.data.error);
            });
      })
      .catch((err) => {
        toast.error(err);
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="registerPage">
          <div className="registerImage"></div>

          <div className="registerFormContainer">
            <div className="headingContainer"></div>
            <Form className="registerForm" encType="multipart/form-data">
              <h1 className="head1">Create Account</h1>
              <Form.Control
                type="text"
                className="registerFormInput"
                placeholder="Name"
                required
                onChange={(e) => setFname(e.target.value)}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              <Form.Control
                type="email"
                className="registerFormInput"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <Form.Control
                type="text"
                className="registerFormInput"
                placeholder="Phone No. (WhatsApp)"
                required
                onChange={(e) => setphone(e.target.value)}
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
              <Form.Control
                type="text"
                className="registerFormInput"
                value={college}
                required
                onChange={(e) => setCollege(e.target.value)}
              />
              {errors.college && <p style={{ color: "red" }}>{errors.college}</p>}

              <Form.Control
                type="password"
                className="registerFormInput"
                placeholder="Password (Min 8 Characters)"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <div className="UploadNProgress">
                <FilePond
                  files={image}
                  onupdatefiles={(image) => {
                    if((image[0].file.type === "image/png") || (image[0].file.type === "image/jpeg") || (image[0].file.type === "image/jpg"))
                    {
                      fileChange(image);
                    }
                    else
                      toast.error("Please Upload in .PNG or .JPG Format")
                  }}
                  allowMultiple={false}
                  instantUpload={false}
                  accept="image/png, image/jpeg, image/jpg"
                  name="files"
                  labelIdle="Upload ID Proof"
                  />
                <div className={`Progress ${progressVisible}`}>
                  Image Uploaded: {progress} %
                </div>
              </div>
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

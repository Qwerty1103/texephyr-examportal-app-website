import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";


import { Button, Card, Form } from "react-bootstrap";
import { PORTALQUES, USERAPIURL } from "../Constants";
import { toast } from "react-hot-toast";

const RoundActivate = () => {
  const [activated, setActivated] = useState(false);
  const [rounds, setRounds] = useState([]);

  const [qualified, setQualified] = useState("");
  const [r_id, setR_id] = useState();
  const formData = new FormData();

  const submitHandler = (event) => {
    event.preventDefault();

    formData.set("qualifed", qualified);
    formData.set("r_id", r_id);
    console.log(formData);
    
    axios
    .post(PORTALQUES + "round_activate", {
      n: qualified,
      r_id: r_id
    })
    .then(() => {
      toast.success("Round Activated")
    })
    .catch((err) => {
      toast.error("Could not activate Round")
    });

    return false;
  };

  
  useEffect(()=>{
    axios 
    .get(USERAPIURL + "fetchRounds", {

    })
    .then(function (response) {
      console.log(response.data.rounds)
      setRounds(response.data.rounds);
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
        
    })

  },[]);


  return (
    <Fragment>
      
    
    <div className="container">
     
    {rounds.map((round)=>(
         <Card className="d-flex flex-row my-4" key = {round._id}>
          <Card.Body>{round.name}</Card.Body>
          <Card.Body>{round._id}</Card.Body>   
          <Card.Body>{round.date}</Card.Body>
          <Button onClick={() => {
            setActivated(true)
            setR_id(round._id)
            }}>Activate</Button>
        </Card>
        ))}

      {activated && (
        <Form onSubmit="event.preventDefault();"  >
          <Form.Group className="mb-3">
            <Form.Label size="xl">Qualified</Form.Label>
            <Form.Control
              className="form-control"
              type="number"
              placeholder="Enter number"
              value={qualified}
              onChange={(event) => {
                setQualified(event.target.value);
              }}
            />
          </Form.Group>
          
          <Button variant="primary" type="submit" onClick={submitHandler}>
            Activate
          </Button>
          <Button
            className="m-2"
            variant="danger"
            type="button"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      )}
    </div>
    </Fragment>
    
  );
};

export default RoundActivate;

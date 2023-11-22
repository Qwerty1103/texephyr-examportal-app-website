import React from 'react'
import { EVENTIMG } from '../Constants'
import "./eventcard.css"

function EventCard(props) {
    const {name, time, desc, entries, dept, rounds} = props.element
    const date = props.element.date.slice(0, 10)
    const image = EVENTIMG + props.element.image
    const status = String(props.element.status)
    return (
        <div>
            <div className="card mb-3" style={{maxWidth: " 540px"}}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img id = "eventImage" src = {image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{desc}</p>
                            <div className="card-content-container">
                                <h6 className="card-content">Date: {date}</h6>
                                <h6 className="card-content">Time: {time}</h6>
                                <h6 className="card-content">Entries: {entries}</h6>
                                <h6 className="card-content">Department: {dept}</h6>
                                <h6 className="card-content">Rounds: {rounds}</h6>
                                <h6 className="card-content">Status: {status}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard


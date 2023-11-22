import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ADMINAPIURL, USERAPIURL } from '../Constants'
import './adminPages.css'

function AdminAbout() {

    useEffect(() => {
        axios(
            {
                method: "POST",
                url: USERAPIURL + "getContent",
                data: { "page": "about" }
            }
        )
            .then((response) => {
                sets1p1(response.data.content.s1p1)
                sets1p2(response.data.content.s1p2)
                sets1p3(response.data.content.s1p3)
            }
            )
            .catch((err) => { console.log(err) })
    }, [])

    const onSubmit = () => {
        const newdata =
        {
            "s1p1": s1p1,
            "s1p2": s1p2,
            "s1p3": s1p3
        }

        axios(
            {
                method: "POST",
                url: ADMINAPIURL + "postContent",
                data: { "page": "about", newdata }
            }
        )
            .then((response) => {
                alert(response.data.message)
            })
            .catch((err) => {
                alert(err.response.data.err)
            })
    }

    const [s1p1, sets1p1] = useState("")
    const [s1p2, sets1p2] = useState("")
    const [s1p3, sets1p3] = useState("")

    return (
        <>
            <div className="aboutPage">
                <div className='section'>
                    <div className="sectionContainer aboutContainer">
                        <div className="sectionText">
                            Section 1
                        </div>
                        <form className='cmsForm'>
                            <input className='sectionInput' value={s1p1} type="text" onChange={(e) => { sets1p1(e.target.value) }} />
                            <textarea className='sectionTextArea' cols="30" rows="15" value={s1p2} onChange={(e) => { sets1p2(e.target.value) }}>
                            </textarea>
                            <textarea className='sectionTextArea' cols="30" rows="15" value={s1p3} onChange={(e) => { sets1p3(e.target.value) }}>
                            </textarea>
                        </form>
                    <div className="submitBtn my-4">
                        <button onClick={onSubmit} className='submitButton'>Submit</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAbout;

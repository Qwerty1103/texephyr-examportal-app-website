import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ADMINAPIURL, USERAPIURL } from '../Constants'
import './adminPages.css'

export default function AdminHome() {

  useEffect(() => {
    axios(
      {
        method: "POST",
        url: USERAPIURL + "getContent",
        data: { "page": "home" }
      }
    )
    .then((response) => {
      sets1p1(response.data.content.s1p1)
      sets1p2(response.data.content.s1p2)
      sets2p1(response.data.content.s2p1)
      sets2p2(response.data.content.s2p2)
      sets2p3(response.data.content.s2p3)
      sets2p4(response.data.content.s2p4)
      sets2p5(response.data.content.s2p5)
      sets2p6(response.data.content.s2p6)
      sets2p7(response.data.content.s2p7)
    }
    )
    .catch((err) => {console.log(err)})
  }, [])

  const onSubmit = () =>
  {
    const newdata = 
    {
      "s1p1": s1p1,
      "s1p2": s1p2,
      "s2p1": s2p1,
      "s2p2": s2p2,
      "s2p3": s2p3,
      "s2p4": s2p4,
      "s2p5": s2p5,
      "s2p6": s2p6,
      "s2p7": s2p7
    }

    axios(
      {
        method: "POST",
        url: ADMINAPIURL + "postContent",
        data: { "page": "home", newdata }
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
  const [s2p1, sets2p1] = useState("")
  const [s2p2, sets2p2] = useState("")
  const [s2p3, sets2p3] = useState("")
  const [s2p4, sets2p4] = useState("")
  const [s2p5, sets2p5] = useState("")
  const [s2p6, sets2p6] = useState("")
  const [s2p7, sets2p7] = useState("")

  return (
    <>
      <div className="homePage">
        <div className='section'>
          <div className="sectionContainer">
            <div className="sectionText">
              Section 1
            </div>
            <form className='cmsForm'>
              <input className='sectionInput' value={s1p1} type="text" onChange={(e) => { sets1p1(e.target.value) }} />
              <textarea className='sectionTextArea' cols="30" rows="15" value={s1p2} onChange={(e) => { sets1p2(e.target.value) }}>
              </textarea>
            </form>
          </div>
        </div>
        <div className='section'>
          <div className="sectionContainer">
            <div className="sectionText">
              Section 2
            </div>
            <form className='s2CmsForm'>
              <div>
                <input className='sectionInput s2Heading' value={s2p1} type="text" onChange={(e) => { sets2p1(e.target.value) }} />
              </div>
              <div className='s2Cards'>
                <div className="s2Card">

                  <input className='sectionInput' value={s2p2} type="text" onChange={(e) => { sets2p2(e.target.value) }} />
                  <textarea className='sectionTextArea' cols="30" rows="15" value={s2p3} onChange={(e) => { sets2p3(e.target.value) }}>
                  </textarea>
                </div>
                <div className="s2Card">

                  <input className='sectionInput' value={s2p4} type="text" onChange={(e) => { sets2p4(e.target.value) }} />
                  <textarea className='sectionTextArea' cols="30" rows="15" value={s2p5} onChange={(e) => { sets2p5(e.target.value) }}>
                  </textarea>
                </div>
                <div className="s2Card">

                  <input className='sectionInput' value={s2p6} type="text" onChange={(e) => { sets2p6(e.target.value) }} />
                  <textarea className='sectionTextArea' cols="30" rows="15" value={s2p7} onChange={(e) => { sets2p7(e.target.value) }}>
                  </textarea>
                </div>
              </div>
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

import React from 'react'

function Resultpage(props) {
  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
        <h1>Result Page</h1>
    </div>
    <div>
        {props.score}
    </div>
    </>
  )
}

export default Resultpage
import { cloneElement, useState } from "react"
import "./intro.css";

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false)
  return (
    <>
      {cloneElement(children, { ready: clicked })}
      <div className={`intro-fullscreen intro-bg ready"} ${clicked && "clicked"}`}>
        <div >
          <a href="javascript:void(0);" onClick={() => setClicked(true)}>
            {"click to continue"}
          </a>
        </div>
      </div>
    </>
  )
}

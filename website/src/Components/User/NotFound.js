import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import "./notfound.css"

function NotFound() {
  return (
    <>
	<Navbar />
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
				<h2>Page not found</h2>
			</div>
			<Link to="/">Homepage</Link>
		</div>
	</div>
    </>
  )
}
/* test */
export default NotFound

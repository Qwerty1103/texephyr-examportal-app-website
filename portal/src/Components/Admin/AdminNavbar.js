import React from 'react'
import { Link } from 'react-router-dom'
import "./adminnav.css"

function AdminNavbar() {
    return (
        <div>
            <ul className="nav justify-content-center bg-dark">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Events</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/addround">Add Round</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/activate">Activate Round</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/stats">Stats</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminNavbar
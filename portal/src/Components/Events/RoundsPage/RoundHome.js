import "./styles.css";
import React, { useEffect, useState } from "react";
import RoundList from "./RoundList";
import PermanentDrawerLeft from "./SideNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FRONTENDURL, USERAPIURL } from "../../Constants";
import Navbar from "../../Navbar";
import profileImage from "../../images/profileImage.png";

const 	App = () => {
	const [rounds, setRounds] = useState([]);
	const [userid, setuserid] = useState("");
	const [name, setusername] = useState("");
	const navigate = useNavigate();
	
	function login() {
		navigate("/login", { state: { path: FRONTENDURL + 'round/u/' } })
	}

	useEffect(() => {
		if (localStorage.getItem("userTokenPortal")) {
			axios.get(USERAPIURL + "getUserForPortal", {
				headers: { "Authorization": `${localStorage.getItem("userTokenPortal")}` }
			}).then((res) => {
				setuserid(res.data.currentUser._id);
				setusername(res.data.currentUser.name);
			}).catch((err) => {
				localStorage.removeItem('userTokenPortal');
				login();
			})
		} else {
			login();
		}
	})

	useEffect(() => {
		fetch(`${USERAPIURL}/rounds`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userid: userid })
		}).then(async (r) => {
			var res = await r.json();
			setRounds(res);
		});
	}, [userid]);
	return (
		<div className="portalPage">
		<Navbar />
			<div className="roundHomeContainer">
				{/* <PermanentDrawerLeft /> */}
				<div className="profile">
					<img src={profileImage} className="profileImage" />
					<div className="profileDetails">
						<h2 className="profileName">{name}</h2>
						<h3 className="profileID">{userid}</h3>
					</div>
				</div>
				<div className="roundVisible">
					Your Upcoming Rounds 
					<RoundList events={rounds} />
				</div>
			</div>
		</div>
	);
};

export default App;

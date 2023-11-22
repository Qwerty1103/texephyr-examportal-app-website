import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FRONTENDURL, USERAPIURL } from "../../Constants";
import { useLocation } from 'react-router-dom';
import Camera from '../../Proctoring/camera'
import { ToastContainer } from "react-toastify";
import "./instructions.css"

function InstructionsPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const id = location.state.roundid;
	const roundName = location.state.roundname;
	const camera = location.state.camera;
	const [timeLeft, setTimeLeft] = useState(5);
	const [flag, setFlag] = useState(false);
	const [proceedEnabled, setProceedEnabled] = useState(false);
	const [type, setType] = useState("");
	const [rules, setRules] = useState("");
	const [userid, setuserid] = useState("");
	const [name, setusername] = useState("");
	const [block, setBlock] = useState(true);
	function login() {
		navigate("/login", { state: { path: FRONTENDURL + 'round/u/' } })
	}

	function handleCameraChange(val) {
		setBlock(val);
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
	}, []);

	useEffect(() => {
		const data = { roundId: id }
		const response = fetch(USERAPIURL + "rules", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		});
		response.then(async (r) => {
			const res = await r.json();
			setType(res.type);
			setRules(res.rules)
		});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime > 0) {
					return prevTime - 1;
				} else {
					return 0;
				}
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (timeLeft === 0) {
			if (block == false || camera == false) {
				setProceedEnabled(true);
				setFlag(true);
			}
		}
	}, [timeLeft, block]);

	const handleProceedClick = () => {
		const element = document.documentElement;
		if (!document.fullscreenElement) {
			element.requestFullscreen();
		}
		if (proceedEnabled) {
			navigate(`/round/u/${type}`, { state: { roundname: roundName, roundid: id, camera: camera } });
		}
	};




	return (
		<div className="instructionsPageContainer">
			<ToastContainer/>
			 { camera ? <Camera setBlock= {handleCameraChange} /> : null}
			<div className="instructionsPage">
				<div className="instructionsPageLeft">
					<div className="instructionHeading">
						Instructions
					</div>
					<strong style={{ color: "red", fontSize: "20px" }}>Please Read the following instructions carefully.</strong>
					<div dangerouslySetInnerHTML={{__html: rules}} className="instructionRules"></div>
				</div>
				<div className="instructionsPageRight">
					<p className="instructionRoundName">{roundName.replace("_", " ")}</p>
					<p>Time to Proceed: {timeLeft} seconds</p>
					<button className="instructionsBtn" onClick={handleProceedClick} disabled={!proceedEnabled}>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
}

export default InstructionsPage;

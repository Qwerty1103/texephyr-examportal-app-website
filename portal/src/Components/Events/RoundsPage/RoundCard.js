import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dateIcon from "../../images/dateIcon.png"
import clockIcon from "../../images/clockIcon.png"
import durationIcon from "../../images/durationIcon.png"
const RoundCard = (props) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	let date = new Date(props.date);
	let time = date.toLocaleTimeString(undefined, { timeStyle: 'short' });
	let shownDate = date.toUTCString().slice(0, 16);
	const navigate = useNavigate();
	function handleButtonClick() {
		// Write code here of whether user access that event or not. By default i have set all can access
		//window.location+=`${props.name}/${props.roundId}/instruction`
		navigate('instruction', { state: { roundname: props.name, roundid: props.roundId, camera: props.camera } });

	}
	return (
		<div className="roundCard">
			<div className="roundDetails">
				<p className="roundName">
					{props.name.replace("_"," ")}
				</p>
				<p className="roundSubdetail">
					<img className="roundIcon" src={dateIcon} alt="" />
					{shownDate}
				</p>
				<p className="roundSubdetail">
					<img className="roundIcon" src={clockIcon} alt="" />
					{time}
				</p>
				<p className="roundSubdetail">
					<img className="roundIcon" src={durationIcon} alt="" />
					{props.duration} Mins
				</p>
			</div>
			<button
				className="startRoundBtn"
				onClick={handleButtonClick}
				disabled={isButtonDisabled}
			>
				Start
			</button>
		</div>
	);
};

export default RoundCard;
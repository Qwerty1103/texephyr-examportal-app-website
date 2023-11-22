import React from "react";
import RoundCard from "./RoundCard";

const EventList = (props) => {
	return (
		<div className="roundCardContainer">
			{props.events.map((element) => (
				<RoundCard
					key={element[0].id}
					name={element[0].name}
					location={element[0].location}
					date={element[0].date}
					duration={element[0].time}
					roundId={element[0]["_id"]}
					camera={element[0].camera}
				/>
			))}
		</div>
	);
};

export default EventList;

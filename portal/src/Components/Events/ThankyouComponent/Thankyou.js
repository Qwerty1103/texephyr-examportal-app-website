import React from "react";

function ThankYouPage() {
	const handleProceedClick = () => {
		// Proceed to the next page
		window.location = "/events"
	};

	return (
		<div>
			<div className="line-text">
				<h1>Thank You!</h1>
			</div>

			<p>Your test is complete!</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
				animi.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, labore!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
				quidem!
			</p>
			<button onClick={handleProceedClick}>Proceed</button>
		</div>
	);
}

export default ThankYouPage;

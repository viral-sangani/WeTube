import React from "react"
import { Button } from "@material-ui/core"
import { isAuthenticated } from "../_helper/auth"
import axios from "axios"

export default function SubscribeButton({
	hasSubscribed,
	slug,
	totalSub,
	setTotalSub
}) {
	const [subscribed, setSubscribed] = React.useState(hasSubscribed)
	const handleAddSubscription = () => {
		setSubscribed(subscribed ? false : true)
		setTotalSub(
			subscribed ? (totalSub = totalSub - 1) : (totalSub = totalSub + 1)
		)
		let url = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/channel/subscribe/${slug}`
		axios
			.get(url, {
				headers: {
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				console.log(res.data)
			})
	}

	if (!isAuthenticated()) {
		return (
			<div>
				<Button variant="contained" disableElevation disabled>
					Login to Subscribe
				</Button>
			</div>
		)
	}
	return (
		<div>
			{subscribed ? (
				<Button
					variant="contained"
					disableElevation
					onClick={handleAddSubscription}
				>
					Subscribed
				</Button>
			) : (
				<Button
					style={{
						backgroundColor: "red",
						color: "white"
					}}
					variant="contained"
					onClick={handleAddSubscription}
					disableElevation
				>
					Subscribe
				</Button>
			)}
		</div>
	)
}

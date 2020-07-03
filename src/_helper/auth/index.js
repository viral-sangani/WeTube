const API = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/`

export const signup = (user) => {
	return fetch(`${API}/api/users/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then((res) => {
			return res.json()
		})
		.catch((err) => console.log(err))
}

export const signin = (user) => {
	return fetch(`${API}/api/token/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then((res) => {
			return res.json()
		})
		.catch((err) => console.log(err))
}

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data))
		next()
	}
}

export const signout = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt")
		next()
	}
}

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"))
	} else {
		return false
	}
}

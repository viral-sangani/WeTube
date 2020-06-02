import React, { useState, createContext } from "react"

export const GeneralContext = createContext()

export const GeneralProvider = (props) => {
	const [channels, setChannels] = useState([])

	return (
		<GeneralContext.Provider
			value={{
				channels,
				setChannels
			}}
		>
			{props.children}
		</GeneralContext.Provider>
	)
}

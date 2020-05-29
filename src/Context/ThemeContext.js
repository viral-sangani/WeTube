import React, { useState, createContext } from "react"

export const ThemeToggleContext = createContext()

export const ThemeToggleProvider = (props) => {
	const [themeMode, setTheme] = useState("light")
	const toggleTheme = () => {
		if (themeMode === "light") {
			setTheme("dark")
		} else {
			setTheme("light")
		}
	}
	const [open, setOpen] = useState(true)
	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}
	return (
		<ThemeToggleContext.Provider
			value={{
				open,
				handleDrawerOpen,
				handleDrawerClose,
				themeMode,
				toggleTheme
			}}
		>
			{props.children}
		</ThemeToggleContext.Provider>
	)
}

import React, { useState, createContext } from "react"

export const ThemeToggleContext = createContext()

export const ThemeToggleProvider = (props) => {
	const [themeMode, setTheme] = useState(
		window.localStorage.getItem("theme") || "dark"
	)
	const toggleTheme = () => {
		if (themeMode === "light") {
			setTheme("dark")
			window.localStorage.setItem("theme", "dark")
		} else {
			setTheme("light")
			window.localStorage.setItem("theme", "light")
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

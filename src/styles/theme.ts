"use client";

export const theme = {
	colors: {
		white: "#fff",
		dark: "#002a32",
		secondaryDark: "#4b5563",
		greenAccent: "#22af27",
		bg: "#fef4ff",
		hotPink: "#FF6B9D",
		softMagenta: "#F093FB",
		button: "linear-gradient(108deg, #FF6B9D 0%, #F093FB 100%)",
		buttonRevert: "linear-gradient(279deg, #FF6B9D 0%, #F093FB 100%)",
		tertiary: "#aaaaaa",
	},
	spacing: (factor: number) => `${factor * 0.5}rem`,
	border: {
		dark: "1px solid #002a32",
		secondaryDark: "1px solid #4b5563",
		gray: "1px solid #aaaaaa",
		pink: "1px solid #FF6B9D",
		transparent: "1px solid transparent",
		radius: "4px",
	},
	shadow: {
		button:
			"0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)",
	},
	fontFamily: {
		body: "'Kodchasan', sans-serif",
		logo: "'Handlee', cursive",
		inter: "'Inter', sans-serif",
	},
} as const;

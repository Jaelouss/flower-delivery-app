import { Theme as EmotionTheme } from '@emotion/react';

export const theme = {
	colors: {
		dark: '#002a32',
		secondaryDark: '#4b5563',
		greenAccent: '#22af27',
		bg: '#fef4ff',
		hotPink: '#FF6B9D',
		softMagenta: '#F093FB',
		button: 'linear-gradient(108deg, #FF6B9D 0%, #F093FB 100%)',
		tertiary: '#aaaaaa',
	},
	spacing: (factor: number) => `${factor * 0.5}rem`,
	border: {
		dark: '1px solid #002a32',
		gray: '1px solid #aaaaaa',
		radius: '4px',
	},
	fontFamily: {
		body: "'Kodchasan', sans-serif",
		logo: "'Handlee', cursive",
	},
} as const;

declare module '@emotion/react' {
	export interface Theme extends EmotionTheme {
		colors: typeof theme.colors;
		spacing: typeof theme.spacing;
		border: typeof theme.border;
		fontFamily: typeof theme.fontFamily;
	}
}

export type Theme = typeof theme;

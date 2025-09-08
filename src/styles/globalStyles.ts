"use client";

import "@a1rth/css-normalize";
import { css } from "@emotion/react";
import { theme } from "./theme";

export const globalStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html,
	body {
		height: 100%;
	}

	body {
		display: flex;
		flex-direction: column;
		margin: 0;
		background: ${theme.colors.bg};
		color: ${theme.colors.dark};
		line-height: normal;
		min-height: 100vh;
		padding-inline: ${theme.spacing(10.5)};
		 max-width: 1440px;
		  margin: 0 auto;
	}

	main {
		flex: 1;
		margin-top:88px;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: ${theme.spacing(3)} 0 ${theme.spacing(2)};
		color: ${theme.colors.dark};
	}

	img {
		max-width: 100%;
	}
`;

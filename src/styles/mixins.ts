"use client";

import { css } from "@emotion/react";

export type AlignItems =
	| "flex-start"
	| "center"
	| "flex-end"
	| "stretch"
	| "baseline";
export type JustifyContent =
	| "flex-start"
	| "center"
	| "flex-end"
	| "space-between"
	| "space-around"
	| "space-evenly"
	| "stretch";

export const flexColumn = (
	align: AlignItems = "flex-start",
	justify: JustifyContent = "flex-start",
	gap = "8px",
) => css`
	display: flex;
	flex-direction: column;
	align-items: ${align};
	justify-content: ${justify};
	gap: ${gap};
`;

export const flexRow = (
	align: AlignItems = "center",
	justify: JustifyContent = "flex-start",
	gap = "8px",
) => css`
	display: flex;
	flex-direction: row;
	align-items: ${align};
	justify-content: ${justify};
	gap: ${gap};
`;
export const hidden = () => css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;`;

"use client";

import styled from "@emotion/styled";
import type { AlignItems, JustifyContent } from "../mixins";

interface BoxProps {
	column?: boolean;
	row?: boolean;
	align?: AlignItems;
	justify?: JustifyContent;
	gap?: string;
	width?: string;
	maxWidth?: string;
	height?: string;
	border?: string;
	borderRadius?: string;
	padding?: string;
	margin?: string;
	zIndex?: string;
	position?: string;
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	cursor?: string;
	background?: string;
	children?: React.ReactNode;
}

export const Box = styled.div<BoxProps>`
	display: flex;
	flex-direction: ${({ column }) => (column ? "column" : "row")};
	align-items: ${({ align }) => align || "center"};
	justify-content: ${({ justify }) => justify || "center"};
	gap: ${({ gap }) => gap || "0"};
	width: ${({ width }) => width || "100%"};
	height: ${({ height }) => height || "auto"};
	max-width: ${({ maxWidth }) => maxWidth || "unset"};
	border: ${({ border }) => border || "none"};
	border-radius: ${({ borderRadius }) => borderRadius || "0"};
	padding: ${({ padding }) => padding || "0"};
	margin: ${({ margin }) => margin || "0"};
	position: ${({ zIndex, position }) => (position ? position : zIndex ? "relative" : "static")};
	z-index: ${({ zIndex }) => zIndex || "auto"};
	top: ${({ top }) => top || "auto"};
	right: ${({ right }) => right || "auto"};
	bottom: ${({ bottom }) => bottom || "auto"};
	left: ${({ left }) => left || "auto"};
	cursor: ${({ cursor }) => cursor || "default"};
	background:${({ background }) => background || "transparent"};
`;

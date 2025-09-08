"use client";

import styled from "@emotion/styled";
import { theme } from "../theme";

interface LogoTextProps {
	fontSize?: string;
	color?: string;
	fontWeight?: number;
	textAlign?: string;
	children?: string;
}

export const LogoText = styled.p<LogoTextProps>`
	color: ${({ color }) => color || theme.colors.dark};
	font-size: ${({ fontSize }) => fontSize || "24px"};
	font-weight: ${({ fontWeight }) => fontWeight || 400};
	font-family: ${theme.fontFamily.logo};
	text-align: ${({ textAlign }) => textAlign || "start"};
`;

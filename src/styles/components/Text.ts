"use client";

import styled from "@emotion/styled";
import { theme } from "../theme";

interface TextProps {
	fontSize?: string;
	color?: string;
	fontWeight?: number;
	children?: string;
}

export const Text = styled.p<TextProps>`
	color: ${({ color }) => color || theme.colors.dark};
	font-size: ${({ fontSize }) => fontSize || "16px"};
	font-weight: ${({ fontWeight }) => fontWeight || 400};
`;

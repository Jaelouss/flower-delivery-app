"use client";

import styled from "@emotion/styled";
import type { IconProps } from "@phosphor-icons/react";
import { flexRow } from "../mixins";
import { theme } from "../theme";

interface Props extends IconProps {
	$size?: number[];
	color?: string;
	position?: string;
}

export const Icon = styled.span<Props>`
	position: ${(props) => [props.position ?? "static"]};
	svg {
		${flexRow()}
		width: ${(props) => props.$size?.[0] ?? 32}px;
		height: ${(props) => props.$size?.[1] ?? 32}px;
		color: ${(props) => props.color ?? theme.colors.dark};
	}
`;

"use client";

import styled from "@emotion/styled";
import { theme } from "@styles";

interface ExternalLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	address?: string;
	noWrap?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
	address,
	target = "_blank",
	rel = "noopener noreferrer",
	noWrap,
	...props
}) => {
	return (
		<StyledExternalLink target={target} rel={rel} noWrap={noWrap} {...props}>
			{address}
		</StyledExternalLink>
	);
};

const StyledExternalLink = styled.a<{ noWrap?: boolean }>`
	color: ${theme.colors.dark};
	text-decoration: underline solid;
	white-space: ${({ noWrap }) => (noWrap ? "nowrap" : "normal")};
`;

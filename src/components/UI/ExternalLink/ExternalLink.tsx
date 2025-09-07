'use client';

import { theme } from '@styles';
import styled from '@emotion/styled';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	children: string;
	noWrap?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
	children,
	target = '_blank',
	rel = 'noopener noreferrer',
	noWrap,
	...props
}) => {
	return (
		<StyledExternalLink target={target} rel={rel} noWrap={noWrap} {...props}>
			{children}
		</StyledExternalLink>
	);
};

const StyledExternalLink = styled.a<{ noWrap?: boolean }>`
	color: ${theme.colors.dark};
	text-decoration: underline solid;
	white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};
`;

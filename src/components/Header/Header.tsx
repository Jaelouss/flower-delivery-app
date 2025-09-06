'use client';

import styled from '@emotion/styled';
import { flexRow, theme } from '@styles';
import { Cart, LogoMain, Navigation } from '@components';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
	return (
		<StyledHeader>
			<LogoMain />
			<Navigation />
			<Cart />
		</StyledHeader>
	);
};
const StyledHeader = styled.header`
	${flexRow('center', 'space-between')}
	padding: 24px 8px;
	border-radius: ${theme.border.radius};
	border-bottom: ${theme.border.dark};
	background: ${theme.colors.bg};
`;

"use client";

import { LogoMain } from "@UI";
import { Cart, Navigation } from "@components";
import styled from "@emotion/styled";
import { flexRow, theme } from "@styles";

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
	${flexRow("center", "space-between")}
	padding: 24px 8px;
	border-radius: ${theme.border.radius};
	border-bottom: ${theme.border.dark};
	background: ${theme.colors.bg};

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1272px;
  z-index: 9999;
`;

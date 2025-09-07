"use client";

import styled from "@emotion/styled";
import LogoIcon from "@icons/LogoIcon.svg";
import { Box, flexRow, Icon, LogoText, theme } from "@styles";
import Link from "next/link";

export interface LogoMainProps {}

export const LogoMain: React.FC<LogoMainProps> = () => {
	return (
		<Box width='auto' gap='4px'>
			<StyledLink href='/'>
				<Icon $size={[48, 40]} color={theme.colors.hotPink}>
					<LogoIcon />
				</Icon>
				<LogoText>FlowerLover</LogoText>
			</StyledLink>
		</Box>
	);
};
const StyledLink = styled(Link)`
${flexRow("flex-end", "center")}`;

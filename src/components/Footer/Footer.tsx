"use client";

import { GoogleLink } from "@UI";
import styled from "@emotion/styled";
import {
	EnvelopeSimpleIcon,
	FacebookLogoIcon,
	InstagramLogoIcon,
	TelegramLogoIcon,
	WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { Box, flexColumn, flexRow, Icon, Text, theme } from "@styles";

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
	return (
		<StyledFooter>
			<List>
				<Item>
					<Text fontWeight={500} fontSize='24px'>
						Contact Us
					</Text>
					<Box gap='8px'>
						<Icon>
							<WhatsappLogoIcon />
						</Icon>
						<Icon>
							<EnvelopeSimpleIcon />
						</Icon>
						<Icon>
							<TelegramLogoIcon />
						</Icon>
					</Box>
				</Item>
				<Item>
					<Text fontWeight={500} fontSize='24px'>
						Social
					</Text>
					<Box gap='8px'>
						<Icon>
							<FacebookLogoIcon />
						</Icon>
						<Icon>
							<InstagramLogoIcon />
						</Icon>
					</Box>
				</Item>
				<Item>
					<GoogleLink isLogo />
				</Item>
			</List>
			<p>© 2025 All right reserved</p>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer`
	${flexColumn("center", "center", "48px")}
	padding: 24px 98px;
	border-radius: ${theme.border.radius};
	border-top: ${theme.border.dark};
`;
const List = styled.ul`
	width: 100%;
	${flexRow("center", "space-between")}
`;
const Item = styled.li`
	${flexColumn("center", "center", "16px")}
	width: 265px;
`;

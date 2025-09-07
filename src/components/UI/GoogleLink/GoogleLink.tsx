"use client";

import { MapPinIcon } from "@phosphor-icons/react";
import { Box, Icon, LogoText, Text } from "@styles";
import { ExternalLink } from "../ExternalLink/ExternalLink";

export interface Location {
	lat: number;
	lng: number;
}

export interface GoogleLinkProps {
	isLogo?: boolean;
	text?: string;
	location?: Location;
	address?: string;
}

export const GoogleLink: React.FC<GoogleLinkProps> = ({
	isLogo,
	text,
	location,
	address,
}) => {
	if (isLogo) {
		return (
			<>
				<LogoText textAlign='center'>FlowerLover</LogoText>
				<Box gap='8px'>
					<Icon>
						<MapPinIcon />
					</Icon>
					<ExternalLink
						href='https://www.google.com/maps/search/?api=1&query=Київ,+вул.+Генерала+Шаповалова+20'
						noWrap
						address='Kyiv, Gen. Shapovalov St 20'
					/>
				</Box>
			</>
		);
	}

	if (!location) return null;

	return (
		<Box width='auto' gap='12px'>
			{text && (
				<Text fontSize='18px' fontWeight={700}>
					{text}
				</Text>
			)}
			<Icon>
				<MapPinIcon />
			</Icon>
			<ExternalLink
				href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
				address={address}
			/>
		</Box>
	);
};

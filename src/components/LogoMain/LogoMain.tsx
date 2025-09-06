'use client';

import { Box, Icon, LogoText, theme } from '@styles';
import LogoIcon from './LogoIcon.svg';

export interface LogoMainProps {}

export const LogoMain: React.FC<LogoMainProps> = () => {
	return (
		<Box width='auto' gap='4px'>
			<Icon $size={[48, 40]} color={theme.colors.hotPink}>
				<LogoIcon />
			</Icon>
			<LogoText>FlowerLover</LogoText>
		</Box>
	);
};

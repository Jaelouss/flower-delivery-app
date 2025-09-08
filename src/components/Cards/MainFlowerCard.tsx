import { ImageSet } from "@UI";
import { Box, theme } from "@styles";
import type { ComponentProps } from "react";

export interface MainFlowerCardProps extends ComponentProps<typeof Box> {
	name: string;
}

export const MainFlowerCard: React.FC<MainFlowerCardProps> = ({
	name,
	...rest
}) => {
	const FOLDER = "main";

	return (
		<Box
			align="flex-start"
			justify="flex-end"
			padding="26px 26px 64px 26px"
			border={theme.border.dark}
			borderRadius={theme.border.radius}
			width='fit-content'
			position="absolute"
			{...rest}
		>
			<ImageSet
				folder={FOLDER}
				name={name}
				width={293}
				height={267}
				alt="Bouquet of flowers"

			/>
		</Box>
	);
};

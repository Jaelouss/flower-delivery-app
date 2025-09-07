"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box } from "@styles";

export const FlowerLoader = () => {
	return (
		<Box padding='8px'>
			<DotLottieReact
				src='/loader/loading.lottie'
				loop
				autoplay
				style={{ width: 750, height: 750 }}
			/>
		</Box>
	);
};

"use client";

import { Box } from "@styles";
import dynamic from "next/dynamic";
import React from "react";

const DotLottieReact = dynamic(
	() =>
		import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
	{ ssr: false },
);

interface FlowerLoaderProps {
	width?: number;
	height?: number;
}

export const FlowerLoader: React.FC<FlowerLoaderProps> = React.memo(
	({ width = 500, height = 500 }) => {
		return (
			<Box padding='8px'>
				<DotLottieReact
					src='/loader/loading.lottie'
					loop
					autoplay
					style={{ width, height }}
				/>
			</Box>
		);
	},
);

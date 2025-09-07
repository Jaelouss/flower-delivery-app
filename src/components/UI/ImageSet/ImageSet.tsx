"use client";

interface ImageProps {
	name: string;
	folder: string;
	alt: string;
	width?: number;
	height?: number;
}

export const ImageSet: React.FC<ImageProps> = ({
	name,
	folder,
	alt,
	width,
	height,
}) => {
	const imgPath = `/pictures/${folder}/${name}`;

	return (
		<picture>
			<source
				srcSet={`${imgPath}.webp 1x, ${imgPath}-2x.webp 2x`}
				type='image/webp'
			/>
			<img
				src={`${imgPath}.jpg`}
				alt={alt}
				width={width}
				height={height}
				style={{
					display: "block",
					objectFit: "cover",
					maxWidth: "unset",
					height: `${height + "px"}`,
					width: `${width + "px"}`,
				}}
			/>
		</picture>
	);
};

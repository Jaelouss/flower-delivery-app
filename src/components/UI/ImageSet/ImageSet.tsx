'use client';
import Image from 'next/image';
interface ImageProps {
	name: string;
	folder: string;
	alt: string;
	width?: number;
	height?: number;
}

export const ImageSet: React.FC<ImageProps> = ({ name, folder, alt, width, height }) => {
	const basePath = `/images/pictures/${folder}`;


	return (
		<picture>
			<source
				srcSet={`${basePath}/${name}.webp 1x, ${basePath}/${name}-2x.webp 2x`}
				type='image/webp'
			/>
			<Image
				src={`${basePath}/${name}.jpg`}
				alt={alt}
				width={width}
				height={height}
			/>
		</picture>
	);
};

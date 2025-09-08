"use client";

import { CustomButton } from "@UI";
import { MainFlowerCard } from "@components";
import styled from "@emotion/styled";
import { Box, theme } from "@styles";
import { useRouter } from "next/navigation";

export default function ShopPage() {
	const router = useRouter();

	return (
		<Section>
			<Title>
				Fresh <Span>flowers</Span>
				<br />
				<Shift />
				pure <Span>emotions</Span>
			</Title>
			<Box maxWidth='1164px' position='relative' justify='flex-start'>
				<CustomButton
					onClick={() => router.push("/shop")}
					variant='primary'
					margin='178px 47px 234px 0 '
					value='Shop now'
				/>
				<MainFlowerCard
					name='bouquetOfFlowers1'
					zIndex='1'
					top='7%'
					right='40%'
				/>
				<MainFlowerCard
					name='bouquetOfFlowers2'
					zIndex='2'
					top=' 20%'
					right='18%'
				/>
				<MainFlowerCard
					name='bouquetOfFlowers3'
					zIndex='3'
					top='-6%'
					right='0'
				/>
			</Box>
		</Section>
	);
}
const Section = styled.section`
	height: 100%;
	padding-top: 81px;
	padding-left: 108px;
	background-image: url('/waves.svg');
	background-position: -80px 30px;
	background-repeat: no-repeat;
	background-size: auto 362px;
`;
const Title = styled.h1`
	color: ${theme.colors.dark};
	font-size: 80px;
	font-weight: 400;
	margin: 0;
`;
const Span = styled.span`
	color: ${theme.colors.greenAccent};
`;
const Shift = styled.span`
	display: inline-block;
	width: 242px;
`;

'use client';

import styled from '@emotion/styled';
import { Box, theme } from '@styles';
import { CustomButton, MainFlowerCard } from '@UI';

export default function ShopPage() {
	return (
		<Section>
			<Title>
				Fresh <Span>flowers</Span>
				<br />
				<Shift />
				pure <Span>emotions</Span>
			</Title>
			<CustomButton onClick={() => { }} variant='primary' margin='178px 0 0 0 ' value='Shop now' />
			<Box>
			<MainFlowerCard name='bouquetOfFlowers1'/>
			<MainFlowerCard name='bouquetOfFlowers2'/>
			<MainFlowerCard name='bouquetOfFlowers3'/>
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
	background-size: cover;
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

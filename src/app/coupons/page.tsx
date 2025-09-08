"use client";

import { CouponCard } from "@components";
import styled from "@emotion/styled";
import { WarningCircleIcon } from "@phosphor-icons/react";
import { Box, flexColumn, flexRow, Icon, Text, theme } from "@styles";
import { useCoupons } from "@/lib/api/coupons";

export interface PageProps {}

export default function Page() {
	const coupons = useCoupons();

	return (
		<StyledSection>
			<Title>Coupons</Title>
			<List>
				{coupons?.map((c) => (
					<CouponCard coupon={c} key={c.code} />
				))}
			</List>
			<Box
				padding='16px'
				gap='12px'
				borderRadius={theme.border.radius}
				border='2px solid rgba(34, 175, 39, 0.40)'
				background='rgba(34, 175, 39, 0.10)'
			>
				<Icon $size={[24, 24]} color={theme.colors.dark}>
					<WarningCircleIcon />
				</Icon>
				<Text fontSize='18px' color='#000'>
					Check back later for new coupons
				</Text>
			</Box>
		</StyledSection>
	);
}
const StyledSection = styled.section`
${flexColumn("flex-start", "center", "24px")};
width:100%;
margin-block:40px;
`;
const Title = styled.h1`
color: ${theme.colors.dark};
font-size: 32px;
font-weight: 500;
margin:0;
`;
const List = styled.ul`
${flexRow("center", "center", "24px")};
flex-wrap:wrap;
`;

"use client";

import styled from "@emotion/styled";
import { flexColumn, theme } from "@styles";

export interface PageProps {}

export default function Page() {
	return (
		<StyledSection>
			<Title>Checkout</Title>
			<List>
				<LeftItem></LeftItem>
				<RightItem></RightItem>
			</List>
		</StyledSection>
	);
}
const StyledSection = styled.section`
${flexColumn("center", "center", "24px")};
margin-block:40px;
`;
const Title = styled.h1`
color: ${theme.colors.dark};
text-align: center;
font-size: 32px;
font-weight: 500;
width:100%;
`;
const List = styled.ul`
${flexColumn("center", "center", "24px")};

`;
const LeftItem = styled.li`
${flexColumn("center", "center", "24px")};
width: 731.0px;
`;
const RightItem = styled.li`
${flexColumn("center", "center", "24px")};
width: 516.0px;
`;

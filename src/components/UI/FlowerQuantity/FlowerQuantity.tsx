"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Minus from "@icons/Minus.svg";
import Plus from "@icons/Plus.svg";
import { Box, flexRow, theme } from "@styles";

export interface FlowerQuantityProps {
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	quantity: number;
}

export const FlowerQuantity: React.FC<FlowerQuantityProps> = ({
	setQuantity,
	quantity,
}) => {
	return (
		<Box justify='flex-end'>
			<ButtonLeft onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
				<Minus />
			</ButtonLeft>
			<NumberCount>{quantity}</NumberCount>
			<ButtonRight onClick={() => setQuantity((prev) => prev + 1)}>
				<Plus />
			</ButtonRight>
		</Box>
	);
};
const Button = css`
${flexRow()};
padding:4px;
width: 24.0px;
height: 24.0px;
border:none;
background: ${theme.colors.bg};
${flexRow("center", "center")}
`;
const ButtonLeft = styled.button`
${Button}
border-radius: 4px 0 0 4px;
`;
const ButtonRight = styled.button`
${Button}
border-radius: 0 4px 4px 0;
`;
const NumberCount = styled.span`
display: inline-flex;
    align-items: center;
    justify-content: center;
color: ${theme.colors.dark};
text-align: center;
font-size: 16px;
font-weight: 400;
width:24px;
height: 24px;
background: ${theme.colors.bg}

`;

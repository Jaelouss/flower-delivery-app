"use client";

import { FlowerQuantity } from "@UI";
import styled from "@emotion/styled";
import { TrashSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useCartStore } from "@store/useCartStore";
import { Box, Icon, theme } from "@styles";
import { useEffect, useState } from "react";
import type { CartItem } from "@/types/apiTypes";

export interface OrderItemsCardProps {
	flower: CartItem;
	isOrderPage?: boolean;
}

export const OrderItemsCard: React.FC<OrderItemsCardProps> = ({
	flower,
	isOrderPage,
}) => {
	const [count, setCount] = useState(flower.quantity);
	const { updateQuantity, removeFromCart } = useCartStore();

	useEffect(
		() => updateQuantity(flower.flowerId, count),
		[count, flower.flowerId, updateQuantity],
	);

	return (
		<>
			<Box gap='16px'>
				<Img src={flower.flowerPic} alt={flower.name} />
				<Box column gap='8px' justify='center' align='flex-start'>
					<Title>{flower.name}</Title>
					<Descr>{flower.description}</Descr>
				</Box>
			</Box>
			<Box width='fit-content' gap='12px' align='center' justify='flex-end'>
				{isOrderPage ? (
					<Qty>{"Qty:" + flower.quantity}</Qty>
				) : (
					<FlowerQuantity quantity={count} setQuantity={setCount} />
				)}
				<Price>{flower.price}</Price>
				{!isOrderPage && (
					<Btn type='button' onClick={() => removeFromCart(flower.flowerId)}>
						<Icon>
							<TrashSimpleIcon />
						</Icon>
					</Btn>
				)}
			</Box>
		</>
	);
};
const Title = styled.p`
color: #1F2937;
font-size: 16px;
font-weight: 700;
`;
const Descr = styled.span`
color: ${theme.colors.secondaryDark};
width:100%;
`;
const Price = styled.span`
color: ${theme.colors.greenAccent};
font-size: 20px;
font-weight: 700;
line-height: 28px;
width:80px;
`;
const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;
const Btn = styled.button`
all:unset;
cursor:pointer;
`;
const Qty = styled.span`
color: ${theme.colors.dark};
font-size: 14px;
line-height: 20px;
`;

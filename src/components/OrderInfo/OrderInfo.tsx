"use client";
import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { Box, Fieldset, flexColumn, flexRow, theme } from "@styles";
import { OrderItemsCard } from "../Cards/OrderItemsCard";

export interface OrderInfoProps {
	deliveryTime?: string | null;
}

export const OrderInfo: React.FC<OrderInfoProps> = ({ deliveryTime }) => {
	const { items, total, delivery, totalQuantity, appliedCoupon } =
		useCartStore();

	return (
		<Fieldset>
			<ItemList>
				{items.map((item) => (
					<Item key={item.flowerId}>
						<OrderItemsCard flower={item} />
					</Item>
				))}
			</ItemList>
			<Box column gap='8px'>
				<Box justify='space-between'>
					<OrderData>Total Quantity</OrderData>
					<OrderTotal>{totalQuantity}</OrderTotal>
				</Box>
				<Box justify='space-between'>
					<OrderData>Delivery</OrderData>
					<Delivery>{delivery > 0 ? delivery : "Free"}</Delivery>
				</Box>
				<Box justify='space-between'>
					<OrderData>Delivery time</OrderData>
					<OrderTotal>{deliveryTime || "---"}</OrderTotal>
				</Box>
				<Box justify='space-between'>
					<OrderData>Coupon</OrderData>
					<OrderTotal>
						{appliedCoupon?.discount ? "-" + appliedCoupon?.discount + "%" : "Coupon hasn't used"}
					</OrderTotal>
				</Box>
			</Box>
			<Box justify='space-between'>
				<TotalTitle>Total</TotalTitle>
				<TotalValue>{total}</TotalValue>
			</Box>
		</Fieldset>
	);
};
const ItemList = styled.ul`
${flexColumn("flex-start", "stretch", "16px")};
width:100%;
height: 256px;
overflow-y: auto;
`;
const Item = styled.li`
${flexRow("center", "space-between", "16px")};
border-radius: 4px;
width:100%;
`;
const OrderData = styled.span`
color: ${theme.colors.secondaryDark};`;
const OrderTotal = styled.span`
color: ${theme.colors.dark};
font-weight: 700;
`;
const Delivery = styled.span`
color: ${theme.colors.greenAccent};
font-weight: 700;
`;
const TotalTitle = styled.span`
color: ${theme.colors.dark};
font-size: 24px;
font-weight: 700;
`;
const TotalValue = styled.span`
font-size: 24px;
font-weight: 700;
background: ${theme.colors.button};
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`;

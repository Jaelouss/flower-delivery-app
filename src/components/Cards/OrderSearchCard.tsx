"use client";

import { GoogleLink } from "@UI";
import styled from "@emotion/styled";
import { Box, flexColumn, flexRow, theme } from "@styles";
import { useShops } from "@/lib/api/shops";
import type { ApiOrder } from "@/types/apiTypes";
import { OrderItemsCard } from "./OrderItemsCard";

export interface OrderSearchCardProps {
	order: ApiOrder;
}

export const OrderSearchCard: React.FC<OrderSearchCardProps> = ({ order }) => {
	const { data: shops } = useShops();
	const orderedShop = shops?.find(
		(shop) => String(shop._id) === String(order?.shopId),
	);

	const formattedCreatedAt = order?.createdAt
		? new Date(order.createdAt).toLocaleString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		: "No data";

	return (
		<StyledSection>
			<OrderNo>#{order.orderId}</OrderNo>
			<List>
				<LeftItem>
					<ItemList>
						{order?.items.map((item) => (
							<Item key={String(item.flowerId)}>
								<OrderItemsCard isOrderPage flower={item} />
							</Item>
						))}
					</ItemList>
				</LeftItem>
				<RightItem>
					<Box justify='space-between'>
						<OrderInfoTitle>{orderedShop?.name}</OrderInfoTitle>
						<GoogleLink
							location={orderedShop?.location}
							address={orderedShop?.address}
						/>
					</Box>
					<Box column gap='8px'>
						<Box justify='space-between'>
							<OrderInfoTitle>Name</OrderInfoTitle>
							<OrderInfoValue>{order?.name || "No data"}</OrderInfoValue>
						</Box>
						<Box justify='space-between'>
							<OrderInfoTitle>Email</OrderInfoTitle>
							<OrderInfoValue>{order?.email || "No data"}</OrderInfoValue>
						</Box>
						<Box justify='space-between'>
							<OrderInfoTitle>Phone Number</OrderInfoTitle>
							<OrderInfoValue>{order?.phone || "No data"}</OrderInfoValue>
						</Box>
						<Box justify='space-between'>
							<OrderInfoTitle>Address</OrderInfoTitle>
							<OrderInfoValue>{order?.address || "No data"}</OrderInfoValue>
						</Box>
						<Box justify='space-between'>
							<OrderInfoTitle>Date</OrderInfoTitle>
							<OrderInfoValue>{formattedCreatedAt}</OrderInfoValue>
						</Box>
					</Box>
					<Box justify='space-between'>
						<OrderInfoTitle>Total</OrderInfoTitle>
						<TotalValue>{order?.total}</TotalValue>
					</Box>
				</RightItem>
			</List>
		</StyledSection>
	);
};
const StyledSection = styled.section`
${flexColumn("flex-start", "center", "24px")}
padding: 24px;
border-radius: ${theme.border.radius};
background: ${theme.colors.white};
width: 100%;
`;
const OrderNo = styled.h2`
color: ${theme.colors.dark};
font-size: 24px;
font-weight: 700;
`;
const List = styled.ul`
${flexRow("center", "space-between")}
width:100%
`;
const LeftItem = styled.li`
width: 692.0px;
`;
const RightItem = styled.li`
	${flexColumn("flex-start", "center", "28px")};
background: #FFF;
border-radius: 4px;

width: 492.0px;
`;
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
const TotalValue = styled.span`
font-weight: 700;
background: ${theme.colors.button};
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 16px;

`;
const OrderInfoTitle = styled.span`
color: ${theme.colors.dark};
font-weight: 700;
`;
const OrderInfoValue = styled.span`
color: ${theme.colors.dark};
font-weight: 400;
`;

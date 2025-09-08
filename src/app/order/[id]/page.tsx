"use client";

import { CustomButton, GoogleLink } from "@UI";
import { OrderItemsCard } from "@components";
import styled from "@emotion/styled";
import { useOrderSearchStore } from "@store/useOrderSearchStore";
import { Box, flexColumn, flexRow, theme } from "@styles";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/lib/api/order";
import { useShops } from "@/lib/api/shops";

export default function Page() {
	const { id } = useParams();
	const { data: order } = useOrder(String(id));
	const { data: shops } = useShops();
	const orderedShop = shops?.find(
		(shop) => String(shop._id) === String(order?.shopId),
	);
	const router = useRouter();
	const { save } = useOrderSearchStore();
	const formattedCreatedAt = order?.createdAt
		? new Date(order.createdAt).toLocaleString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		: "No data";

	const handleRedirect = () => {
		save({
			email: order?.email,
			phone: order?.phone,
		});

		router.push(
			`/order?name=${encodeURIComponent(order?.name || "")}&email=${encodeURIComponent(order?.email || "")}`,
		);
	};

	return (
		<StyledSection>
			<Title>Order details</Title>
			<List>
				<LeftItem>
					<GoogleLink
						text={orderedShop?.name}
						location={orderedShop?.location}
						address={orderedShop?.address}
					/>
					<ItemList>
						{order?.items.map((item) => (
							<Item key={String(item.flowerId)}>
								<OrderItemsCard
									isOrderPage
									flower={{
										...item,
										flowerId: String(item.flowerId),
										shopId: item.shopId ? String(item.shopId) : "",
										description: item.description || "",
										flowerPic: item.flowerPic || "",
									}}
								/>
							</Item>
						))}
					</ItemList>
				</LeftItem>
				<RightItem>
					<RightItemBox>
						<Box column gap='16px'>
							<Box justify='space-between'>
								<InfoTitle>ID</InfoTitle>
								<InfoTitle>{id}</InfoTitle>
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
						</Box>
						<Box
							border='border-top: 1px solid var(--Dark, #002A32)'
							justify='space-between'
						>
							<TotalTitle>Total</TotalTitle>
							<TotalValue>{order?.total}</TotalValue>
						</Box>
					</RightItemBox>
					<CustomButton
						padding='16px 72px'
						variant='secondary'
						value='See orders history'
						onClick={handleRedirect}
					/>
				</RightItem>
			</List>
		</StyledSection>
	);
}
const StyledSection = styled.section`
	${flexColumn("center", "center", "24px")};
	margin-block: 40px;
`;
const Title = styled.h1`
	color: ${theme.colors.dark};
	text-align: center;
	font-size: 32px;
	font-weight: 500;
	width: 100%;
	margin: 0;
`;
const List = styled.ul`
	${flexRow("flex-start", "center", "24px")};
`;
const LeftItem = styled.li`
		${flexColumn("flex-start", "center", "16px")};
	width: 731px;
	padding: 24px 16px 24px 24px;
	border-radius: 4px;
background: #FFF;
`;

const RightItem = styled.li`
	${flexColumn("flex-start", "center", "24px")};
`;
const RightItemBox = styled.div`
	${flexColumn("flex-start", "center", "66px")};
	width: 516px;
padding: 24px;
border-radius: 4px;
background: #FFF;
`;
const InfoTitle = styled.span`
color: #1F2937;
font-size: 24px;
font-weight: 700;
`;
const ItemList = styled.ul`
${flexColumn("flex-start", "stretch", "16px")};
width:100%;
overflow-y: auto;
`;
const Item = styled.li`
${flexRow("center", "space-between", "16px")};
border-radius: 4px;
width:100%;
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
const OrderInfoTitle = styled.span`
color: ${theme.colors.dark};
font-weight: 700;
`;
const OrderInfoValue = styled.span`
color: ${theme.colors.dark};
font-weight: 400;
`;

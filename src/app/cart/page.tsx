"use client";

import { CheckoutForm, GoogleMap, OrderInfo } from "@components";
import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { useShopStore } from "@store/useShopStore";
import { Fieldset, flexColumn, flexRow, Text, theme } from "@styles";
import { useCallback, useState } from "react";

export default function Page() {
	const { selectedShop } = useShopStore();
	const { items } = useCartStore();
	const [userAddress, setUserAddress] = useState<{
		city: string;
		street: string;
		deliveryTime?: string | null;
	} | null>(null);

	const handleAddressChange = useCallback(
		(address: { city: string; street: string } | null) => {
			if (address) {
				setUserAddress({
					...address,
					deliveryTime: undefined,
				});
			} else {
				setUserAddress(null);
			}
		},
		[],
	);

	const handleDeliveryTimeCalculated = useCallback((time: string | null) => {
		setUserAddress((prev) => {
			if (prev) {
				return {
					...prev,
					deliveryTime: time,
				};
			}
			return prev;
		});
	}, []);

	if (!selectedShop && items.length < 1) {
		return (
			<StyledSection>
				<Title>Checkout</Title>
				<SubTitle>No Order Yet!</SubTitle>
				<Text>Please select shop and add flower to cart!</Text>
			</StyledSection>
		);
	}

	return (
		<StyledSection>
			<Title>Checkout</Title>
			<List>
				<LeftItem>
					<Fieldset>
						<GoogleMap
							storeLocation={selectedShop?.location}
							userAddress={userAddress}
							onDeliveryTimeCalculated={handleDeliveryTimeCalculated}
						/>
					</Fieldset>
					<OrderInfo deliveryTime={userAddress?.deliveryTime} />
				</LeftItem>
				<RightItem>
					<CheckoutForm
						deliveryTime={userAddress?.deliveryTime}
						onAddressChange={handleAddressChange}
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
	${flexColumn("center", "center", "24px")};
	width: 731px;
`;

const RightItem = styled.li`
	${flexColumn("center", "center", "24px")};
	width: 516px;
`;

const SubTitle = styled.h2`
	margin: 0;
	color: #1F2937;
	font-size: 24px;
	font-weight: 500;
`;

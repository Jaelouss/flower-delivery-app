"use client";

import { GoogleLink, SortOrderButton } from "@UI";
import styled from "@emotion/styled";
import { X } from "@phosphor-icons/react";
import { useCartStore } from "@store/useCartStore";
import { useShopStore } from "@store/useShopStore";
import { Box, flexColumn, Icon, theme } from "@styles";
import type { Location } from "../UI/GoogleLink/GoogleLink";

export interface ProductSectionProps {
	title: string;
	shopName?: string;
	shopAddress?: string;
	shopLocation?: Location;
	isShop?: boolean;
	isFlowers?: boolean;
	$isClose?: boolean;
	children: React.ReactNode;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
	title,
	shopName,
	shopAddress,
	shopLocation,
	isShop,
	isFlowers,
	$isClose,
	children,
}) => {
	const {
		sortByPrice,
		sortByName,
		setSortByPrice,
		setSortByName,
		setSelectedShop,
	} = useShopStore();
	const { clearCart } = useCartStore();
	return (
		<StyledSection>
			<Box justify='space-between'>
				<Title>{title}</Title>
				{isShop && !$isClose && (
					<Box justify='flex-end' gap='10px'>
						<GoogleLink
							text={shopName}
							location={shopLocation}
							address={shopAddress}
						/>
						<ResetBtn
							onClick={() => {
								setSelectedShop(null);
								clearCart();
							}}
						>
							<Icon>
								<X />
							</Icon>
						</ResetBtn>
					</Box>
				)}
				{isFlowers && $isClose && (
					<Box gap='16px' justify='flex-end'>
						<SortOrderButton
							changeSortOrder={setSortByPrice}
							sortOrder={sortByPrice}
							sortType='Price'
						/>
						<SortOrderButton
							changeSortOrder={setSortByName}
							sortOrder={sortByName}
							sortType='Name'
						/>
					</Box>
				)}
			</Box>
			{children}
		</StyledSection>
	);
};
const StyledSection = styled.section<{ $isClose?: boolean }>`
  ${flexColumn("center", "center", "48px")}
  padding: 48px;
  background-image: url('/waves-cropped.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-size: auto 273px;
  margin-block: 40px;
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 10px 0 rgba(31, 41, 55, 0.10);
  border-radius: ${theme.border.radius};
  height: ${({ $isClose }) => ($isClose ? "138px" : "auto")};
  overflow: ${({ $isClose }) => ($isClose ? "hidden" : "visible")};
  pointer-events: ${({ $isClose }) => ($isClose ? "none" : "auto")};
  transition: height 0.3s ease;
`;

const Title = styled.h2`
color:${theme.colors.dark};
font-size: 32px;
font-weight: 500;
margin:0;
white-space:nowrap;
`;
const ResetBtn = styled.button`
	background: transparent;
	border: none;
	color: #333;
	font-size: 20px;
	font-weight: bold;
	cursor: pointer;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background 0.2s;
	

	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}
`;

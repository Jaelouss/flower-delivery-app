"use client";

import { CustomButton, FlowerQuantity, GoogleLink } from "@UI";

import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { useShopStore } from "@store/useShopStore";
import { Box, flexColumn, theme } from "@styles";
import Image from "next/image";
import { useState } from "react";
import type { ApiFlower, ApiShop } from "@/types/apiTypes";
import { AddToFavorite } from "../AddToFavorite/AddToFavorite";

export interface ProductCardProps {
	shop?: ApiShop;
	flower?: ApiFlower;
}

export const ProductCard: React.FC<ProductCardProps> = ({ shop, flower }) => {
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCartStore();
	const { setSelectedShop } = useShopStore();

	const handleAddToCart = () => {
		if (!flower) return;

		addToCart({
			flowerId: flower._id,
			name: flower.name,
			price: flower.price,
			description: flower.description,
			shopId: flower.shopId,
			flowerPic: flower.flowerPic,
			quantity,
		});
	};

	switch (true) {
		case Boolean(shop):
			return (
				<Card>
					<ClickableBox
						gap='10px'
						column
						onClick={() => setSelectedShop(shop!)}
					>
						<Box column gap='4px'>
							<Title>{shop?.name}</Title>
							<Description>{shop?.description}</Description>
						</Box>
						<Box position='relative' width='202px' height='202px'>
							<Image
								src={shop?.imageUrl || ""}
								alt={shop?.description || ""}
								fill
								sizes='202px'
								style={{ objectFit: "cover" }}
							/>
						</Box>
					</ClickableBox>
					<GoogleLink location={shop?.location} address={shop?.address} />
				</Card>
			);

		case Boolean(flower):
			return (
				<Card>
					<Box position='relative' width='202px' height='202px'>
						<Image
							src={flower?.flowerPic || ""}
							alt={flower?.description || ""}
							fill
							sizes='202px'
							style={{ objectFit: "cover" }}
						/>

						<AddToFavorite flowerId={flower?._id!} />
					</Box>
					<Box column gap='4px'>
						<List>
							<ItemTitle>
								<Title>{flower?.name}</Title>
								<Description>{flower?.description}</Description>
							</ItemTitle>
							<ItemOrder>
								<Box justify='space-between'>
									<Price>{flower?.price} ₴</Price>
									<FlowerQuantity
										quantity={quantity}
										setQuantity={setQuantity}
									/>
								</Box>
								<CustomButton
									onClick={handleAddToCart}
									value='Add to cart'
									variant='primary'
									isFullWidth
									margin='8px 0 0 0'
								/>
							</ItemOrder>
						</List>
					</Box>
				</Card>
			);

		default:
			return null;
	}
};
const ClickableBox = styled(Box)`
  cursor: pointer;
  & * {
    cursor: pointer;
  }
  &:hover {
    & * {
      cursor: pointer;
    }
  }
`;
const Card = styled.li`
${flexColumn("center", "center", "10px")}
padding: 24px;
border-radius: ${theme.border.radius};
border: ${theme.border.gray};
background: rgba(255, 255, 255, 0.01);
backdrop-filter: blur(2.5px);
width: min-content;

`;
const Title = styled.h2`
color:${theme.colors.dark};
font-size: 18px;
font-weight: 700;
margin: 0;
`;
const Description = styled.p`

color: ${theme.colors.secondaryDark};
`;
const List = styled.ul`
${flexColumn("flex-start", "center", "32px")}
width: 100%
`;
const Price = styled.span`
color:${theme.colors.greenAccent};
font-size: 20px;
font-weight: 700;
line-height: 28px;
white-space:nowrap;
`;
const ItemTitle = styled.li`
${flexColumn("flex-start", "center", "8px")}
width: 202.0px;
height: 69.0px;
`;
const ItemOrder = styled.li`
${flexColumn("flex-start", "center", "8px")}
width: 202.0px;
height: 90.0px;
`;

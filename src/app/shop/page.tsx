"use client";

import { CustomButton } from "@UI";
import styled from "@emotion/styled";
import { useShopStore } from "@store/useShopStore";
import { flexRow } from "@styles";
import { useState } from "react";
import { useFlowers } from "@/lib/api/flowers";
import { useShops } from "@/lib/api/shops";
import { ProductCard, ProductSection } from "@components";

export default function Page() {
	const [page, setPage] = useState(1);
	const shops = useShops();
	const { selectedShopId, sortByPrice, sortByName } = useShopStore();
	const selectedShop = shops.data?.find((shop) => shop._id === selectedShopId);

	const { data } = useFlowers(
		{
			shopId: selectedShopId as string,
			sort: sortByPrice === null ? "name" : "price",
			order: sortByPrice === null ? sortByName : sortByPrice,
			page,
		},
		{ enabled: !!selectedShopId },
	);

	const flowers = data?.flowers || [];
	const pagination = data?.pagination;

	const isShopsClosed = !selectedShop;
	const isFlowersClosed = !!selectedShop;

	function handlePageChange(page: number, totalPages?: number) {
		if (page < (totalPages || 1)) {
			return page + 1;
		} else if (page > 1) {
			return page - 1;
		}
		return page;
	}

	function getPageButtonText(page: number, totalPages?: number) {
		if (page < (totalPages || 1)) return "Show more";
		if (page > 1) return "Show less";
		return "";
	}

	return (
		<>
			<ProductSection
				title='Choose shop'
				isShop
				shopAddress={selectedShop?.address}
				shopLocation={selectedShop?.location}
				shopName={selectedShop?.name}
				$isClose={isShopsClosed}
			>
				{isShopsClosed && (
					<List>
						{shops.data?.map((shop) => (
							<ProductCard key={shop._id} shop={shop} />
						))}
					</List>
				)}
			</ProductSection>

			<ProductSection
				title='Choose flowers'
				isFlowers
				$isClose={isFlowersClosed}
			>
				{isFlowersClosed && (
					<>
						<List>
							{flowers?.map((flower) => (
								<ProductCard key={flower._id} flower={flower} />
							))}
						</List>
						{flowers.length > 0 && (
							<CustomButton
								variant='secondary'
								value={getPageButtonText(page, pagination?.totalPages)}
								onClick={() =>
									setPage(handlePageChange(page, pagination?.totalPages))
								}
							/>
						)}
					</>
				)}
			</ProductSection>
		</>
	);
}

const List = styled.ul`
	${flexRow("center", "center", "48px")}
	flex-wrap: wrap;
	align-self: stretch;
`;

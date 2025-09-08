"use client";

import { CustomButton } from "@UI";
import { ProductCard, ProductSection } from "@components";
import styled from "@emotion/styled";
import { useFavoritesStore } from "@store/useFavoritesStore";
import { useShopStore } from "@store/useShopStore";
import { flexRow } from "@styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFlowers } from "@/lib/api/flowers";
import { useShops } from "@/lib/api/shops";

function ClientPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const shops = useShops();
	const { ids } = useFavoritesStore();
	const {
		selectedShopId,
		setSelectedShop,
		sortByPrice,
		setSortByPrice,
		sortByName,
		setSortByName,
	} = useShopStore();

	const [page, setPage] = useState(1);

	useEffect(() => {
		const shopIdParam = searchParams.get("shopId");
		const sortPriceParam = searchParams.get("sortByPrice");
		const sortNameParam = searchParams.get("sortByName");
		const pageParam = searchParams.get("page");

		if (shopIdParam) {
			const fullShop = shops.data?.find((s) => s._id === shopIdParam) || null;
			if (fullShop) setSelectedShop(fullShop);
		}
		if (sortPriceParam === "asc" || sortPriceParam === "desc")
			setSortByPrice(sortPriceParam);
		if (sortNameParam === "asc" || sortNameParam === "desc")
			setSortByName(sortNameParam);
		if (pageParam) setPage(Number(pageParam));
	}, [
		searchParams,
		shops.data,
		setSelectedShop,
		setSortByName,
		setSortByPrice,
	]);

	const { data } = useFlowers(
		{
			shopId: selectedShopId as string,
			sort: sortByPrice ? "price" : "name",
			order: sortByPrice ?? sortByName ?? "asc",
			page,
			favoriteIds: ids,
		},
		{ enabled: !!selectedShopId },
	);

	const flowers = data?.flowers || [];
	const pagination = data?.pagination;
	const selectedShop = shops.data?.find((shop) => shop._id === selectedShopId);
	const isShopsClosed = !selectedShop;
	const isFlowersClosed = !!selectedShop;

	useEffect(() => {
		if (!selectedShopId) return;

		const params = new URLSearchParams();
		params.set("shopId", selectedShopId);
		if (sortByPrice) params.set("sortByPrice", sortByPrice);
		if (sortByName) params.set("sortByName", sortByName);
		params.set("page", page.toString());

		const newUrl = `?${params.toString()}`;
		if (window.location.search !== newUrl) {
			router.replace(newUrl);
		}
	}, [selectedShopId, sortByPrice, sortByName, page, router]);

	function handlePageChange(page: number, totalPages?: number) {
		if (page < (totalPages || 1)) return page + 1;
		if (page > 1) return page - 1;
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
							{flowers.map((flower) => (
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

export default ClientPage;

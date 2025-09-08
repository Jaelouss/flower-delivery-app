import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApiShop } from "@/types/apiTypes";

type OrderOption = "asc" | "desc" | null;

interface ShopState {
	selectedShopId: string | null;
	selectedShop: ApiShop | null;
	sortByPrice: OrderOption;
	sortByName: OrderOption;
	currentPage: number;

	setSelectedShop: (shop: ApiShop | null) => void;
	setSortByPrice: (order: OrderOption) => void;
	setSortByName: (order: OrderOption) => void;
	setСurrentPage: (page: number) => void;
	resetShopStore: () => void;
	resetSort: () => void;
}

export const useShopStore = create<ShopState>()(
	persist(
		(set) => ({
			selectedShop: null,
			selectedShopId: null,
			sortByPrice: null,
			sortByName: null,
			currentPage: 1,

			setSelectedShop: (shop) =>
				set({ selectedShop: shop, selectedShopId: shop?._id }),
			setSortByPrice: (order) => set({ sortByPrice: order, sortByName: null }),
			setSortByName: (order) => set({ sortByName: order, sortByPrice: null }),
			setСurrentPage: (page) => set({ currentPage: page }),
			resetSort: () => set({ sortByPrice: null, sortByName: null }),
			resetShopStore: () =>
				set({
					selectedShop: null,
					selectedShopId: null,
					sortByPrice: null,
					sortByName: null,
					currentPage: 1,
				}),
		}),
		{
			name: "shop-storage",
		},
	),
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderOption = "asc" | "desc" | null;

interface ShopState {
	selectedShopId: string | null;
	sortByPrice: OrderOption;
	sortByName: OrderOption;
	currentPage: number;

	setSelectedShop: (id: string | null) => void;
	setSortByPrice: (order: OrderOption) => void;
	setSortByName: (order: OrderOption) => void;
	setСurrentPage: (page: number) => void;
	resetSort: () => void;
}

export const useShopStore = create<ShopState>()(
	persist(
		(set) => ({
			selectedShopId: null,
			sortByPrice: null,
			sortByName: null,
			currentPage: 1,

			setSelectedShop: (id) => set({ selectedShopId: id }),
			setSortByPrice: (order) => set({ sortByPrice: order, sortByName: null }),
			setSortByName: (order) => set({ sortByName: order, sortByPrice: null }),
			setСurrentPage: (page) => set({ currentPage: page }),
			resetSort: () => set({ sortByPrice: null, sortByName: null }),
		}),
		{
			name: "shop-storage",
		},
	),
);

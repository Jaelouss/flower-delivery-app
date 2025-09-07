import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/apiTypes";

interface CartState {
	items: CartItem[];
	total: number;
	totalQuantity: number;
	addToCart: (item: CartItem) => void;
	updateQuantity: (flowerId: string, quantity: number) => void;
	removeFromCart: (flowerId: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			total: 0,
			totalQuantity: 0,

			addToCart: (item) =>
				set((state) => {
					const exists = state.items.find((i) => i.flowerId === item.flowerId);
					const updatedItems = exists
						? state.items.map((i) =>
								i.flowerId === item.flowerId
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							)
						: [...state.items, item];

					return {
						items: updatedItems,
						total: updatedItems.reduce(
							(sum, i) => sum + i.price * i.quantity,
							0,
						),
						totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
					};
				}),

			updateQuantity: (flowerId, quantity) =>
				set((state) => {
					const updatedItems =
						quantity <= 0
							? state.items.filter((i) => i.flowerId !== flowerId)
							: state.items.map((i) =>
									i.flowerId === flowerId ? { ...i, quantity } : i,
								);

					return {
						items: updatedItems,
						total: updatedItems.reduce(
							(sum, i) => sum + i.price * i.quantity,
							0,
						),
						totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
					};
				}),

			removeFromCart: (flowerId) =>
				set((state) => {
					const updatedItems = state.items.filter(
						(i) => i.flowerId !== flowerId,
					);
					return {
						items: updatedItems,
						total: updatedItems.reduce(
							(sum, i) => sum + i.price * i.quantity,
							0,
						),
						totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
					};
				}),

			clearCart: () => set({ items: [], total: 0, totalQuantity: 0 }),
		}),
		{
			name: "cart-storage",
		},
	),
);

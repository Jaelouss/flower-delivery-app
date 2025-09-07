import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/apiTypes";

interface CartState {
	items: CartItem[];
	addToCart: (item: CartItem) => void;
	updateQuantity: (flowerId: string, quantity: number) => void;
	removeFromCart: (flowerId: string) => void;
	clearCart: () => void;
	total: number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addToCart: (item) =>
				set((state) => {
					const exists = state.items.find((i) => i.flowerId === item.flowerId);
					if (exists) {
						return {
							items: state.items.map((i) =>
								i.flowerId === item.flowerId
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							),
						};
					}
					return { items: [...state.items, item] };
				}),

			updateQuantity: (flowerId, quantity) =>
				set((state) => ({
					items:
						quantity <= 0
							? state.items.filter((i) => i.flowerId !== flowerId)
							: state.items.map((i) =>
									i.flowerId === flowerId ? { ...i, quantity } : i,
								),
				})),

			removeFromCart: (flowerId) =>
				set((state) => ({
					items: state.items.filter((i) => i.flowerId !== flowerId),
				})),

			clearCart: () => set({ items: [] }),

			get total() {
				return get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0,
				);
			},
		}),
		{
			name: "cart-storage",
		},
	),
);

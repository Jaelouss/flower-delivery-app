import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Coupon } from "@/types/apiTypes";

interface CartState {
	items: CartItem[];
	total: number;
	totalQuantity: number;
	appliedCoupon: Coupon | null;
	delivery: number;
	addToCart: (item: CartItem) => void;
	updateQuantity: (flowerId: string, quantity: number) => void;
	removeFromCart: (flowerId: string) => void;
	clearCart: () => void;
	applyCoupon: (coupon: Coupon | null) => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => {
			const calculateDelivery = (quantity: number) => {
				if (quantity > 10) return 0;
				if (quantity > 5) return 100;
				return 200;
			};

			const calculateTotal = (items: CartItem[], coupon: Coupon | null) => {
				const subtotal = items.reduce(
					(sum, i) => sum + i.price * i.quantity,
					0,
				);
				const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
				const delivery = calculateDelivery(
					items.reduce((sum, i) => sum + i.quantity, 0),
				);
				return subtotal - discount + delivery;
			};

			return {
				items: [],
				total: 0,
				totalQuantity: 0,
				appliedCoupon: null,
				delivery: 200,

				addToCart: (item) =>
					set((state) => {
						const exists = state.items.find(
							(i) => i.flowerId === item.flowerId,
						);
						const updatedItems = exists
							? state.items.map((i) =>
									i.flowerId === item.flowerId
										? { ...i, quantity: i.quantity + item.quantity }
										: i,
								)
							: [...state.items, item];

						const totalQuantity = updatedItems.reduce(
							(sum, i) => sum + i.quantity,
							0,
						);
						const total = calculateTotal(updatedItems, state.appliedCoupon);
						return {
							items: updatedItems,
							totalQuantity,
							total,
							delivery: calculateDelivery(totalQuantity),
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
						const totalQuantity = updatedItems.reduce(
							(sum, i) => sum + i.quantity,
							0,
						);
						const total = calculateTotal(updatedItems, state.appliedCoupon);
						return {
							items: updatedItems,
							totalQuantity,
							total,
							delivery: calculateDelivery(totalQuantity),
						};
					}),

				removeFromCart: (flowerId) =>
					set((state) => {
						const updatedItems = state.items.filter(
							(i) => i.flowerId !== flowerId,
						);
						const totalQuantity = updatedItems.reduce(
							(sum, i) => sum + i.quantity,
							0,
						);
						const total = calculateTotal(updatedItems, state.appliedCoupon);
						return {
							items: updatedItems,
							totalQuantity,
							total,
							delivery: calculateDelivery(totalQuantity),
						};
					}),

				clearCart: () =>
					set({
						items: [],
						total: 0,
						totalQuantity: 0,
						appliedCoupon: null,
						delivery: 200,
					}),

				applyCoupon: (coupon) =>
					set((state) => {
						const total = calculateTotal(state.items, coupon);
						return {
							appliedCoupon: coupon,
							total,
						};
					}),
			};
		},
		{ name: "cart-storage" },
	),
);

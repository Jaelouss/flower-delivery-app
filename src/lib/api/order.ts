import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type {
	ApiOrder,
	CreateOrderData,
	CreateOrderResponse,
	Order,
} from "@/types/apiTypes";

export function useOrder(orderId: string) {
	return useQuery<Order>({
		queryKey: ["order", orderId],
		queryFn: async () => {
			const res = await fetch(`/api/order/${orderId}`);
			if (!res.ok) throw new Error("Order not found");
			return res.json();
		},
		enabled: !!orderId,
	});
}

export function useSearchOrders(
	email?: string,
	phone?: string,
	orderId?: string,
) {
	return useQuery<ApiOrder[]>({
		queryKey: ["orders", email, phone, orderId],
		queryFn: async () => {
			const params = new URLSearchParams();
			if (email) params.append("email", email);
			if (phone) params.append("phone", phone);
			if (orderId) params.append("orderId", orderId);

			const res = await fetch(`/api/order/search?${params}`);
			if (!res.ok) throw new Error("Failed to search orders");
			return res.json();
		},
		enabled: !!email || !!phone || !!orderId,
		placeholderData: keepPreviousData,
	});
}

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation<CreateOrderResponse, Error, CreateOrderData>({
		mutationFn: async (orderData: CreateOrderData) => {
			const res = await fetch("/api/order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(orderData),
			});
			if (!res.ok) throw new Error("Failed to create order");
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
}

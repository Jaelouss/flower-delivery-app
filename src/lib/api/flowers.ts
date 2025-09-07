import {
	type UseQueryOptions,
	keepPreviousData,
	useQuery,
} from "@tanstack/react-query";
import type { ApiFlowersResponse } from "@/types/apiTypes";

type UseFlowersParams = {
	shopId?: string;
	sort?: "price" | "name";
	order?: "asc" | "desc" | null;
	page?: number;
	limit?: number;
};

export function useFlowers(
	params: UseFlowersParams = {},
	options: Omit<
		UseQueryOptions<ApiFlowersResponse>,
		"queryKey" | "queryFn"
	> = {},
) {
	const { shopId, sort, order = "asc", page = 1, limit = 8 } = params;

	return useQuery<ApiFlowersResponse>({
		queryKey: ["flowers", shopId, sort, order, page, limit],
		queryFn: async () => {
			const queryParams = new URLSearchParams();

			if (shopId) queryParams.append("shopId", shopId);
			if (sort) queryParams.append("sort", sort);
			if (order) queryParams.append("order", order);
			if (page) queryParams.append("page", page.toString());
			if (limit) queryParams.append("limit", limit.toString());

			const url = `/api/flowers?${queryParams}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error("Failed to fetch flowers");
			return res.json();
		},
		staleTime: 24 * 60 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options,
	});
}

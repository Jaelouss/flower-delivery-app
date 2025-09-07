import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Coupon } from "@/types/apiTypes";

export function useCoupons() {
	const query = useQuery<Coupon[]>({
		queryKey: ["coupons"],
		queryFn: async () => {
			const res = await fetch("/api/coupons");
			if (!res.ok) throw new Error("Failed to fetch coupons");
			return res.json();
		},
		staleTime: 24 * 60 * 60 * 1000,
		placeholderData: keepPreviousData,
	});
	return query.data ?? [];
}

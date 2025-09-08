import type { UseQueryOptions } from "@tanstack/react-query";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Coupon } from "@/types/apiTypes";

type CouponCheckOptions = Partial<
	Omit<UseQueryOptions<Coupon | null>, "enabled" | "queryKey" | "queryFn">
> & {
	forceDisabled?: boolean;
};

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

export function useCouponCheck(code: string, options?: CouponCheckOptions) {
	return useQuery<Coupon | null>({
		queryKey: ["coupon", code],
		queryFn: async () => {
			if (!code) return null;
			const res = await fetch(`/api/coupons/${code}`);
			if (!res.ok) {
				try {
					const errorData = await res.json();
					if (errorData?.error) {
						throw new Error(errorData.error);
					}
				} catch {
					throw new Error("Invalid coupon");
				}
			}
			return res.json();
		},
		staleTime: 5 * 60 * 1000,
		enabled: !!code && !options?.forceDisabled,
		...options,
	});
}

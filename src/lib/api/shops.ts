import { useQuery } from '@tanstack/react-query';
import type { ApiShop } from '@/types/apiTypes';

export function useShops() {
	return useQuery<ApiShop[]>({
		queryKey: ['shops'],
		queryFn: async () => {
			const res = await fetch('/api/shops');
			if (!res.ok) throw new Error('Failed to fetch shops');
			return res.json();
		},
	});
}

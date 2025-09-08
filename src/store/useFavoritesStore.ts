import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
	ids: string[];
	toggle: (flowerId: string) => void;
	isFavorite: (flowerId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			ids: [],

			toggle: (flowerId) =>
				set((state) => ({
					ids: state.ids.includes(flowerId)
						? state.ids.filter((id) => id !== flowerId)
						: [...state.ids, flowerId],
				})),

			isFavorite: (flowerId) => get().ids.includes(flowerId),
		}),
		{
			name: "favorites-storage",
		},
	),
);

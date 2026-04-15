import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FileSystemState, RawNode } from "../types";
import { normalizeTree } from "../utils/normalizeTree";

interface FileStore {
	files: FileSystemState;
	isLoaded: boolean;
	searchQuery: string;
	expandedIds: string[]; // Zmiana na tablicę
	loadFiles: (rawRoot: RawNode) => void;
	clearFiles: () => void;
	setSearchQuery: (q: string) => void;
	toggleExpanded: (id: string) => void;
}

export const useFileStore = create<FileStore>()(
	persist(
		(set) => ({
			isLoaded: false,
			searchQuery: "",
			files: {},
			expandedIds: [],
			setSearchQuery: (q) => set({ searchQuery: q }),

			toggleExpanded: (id) =>
				set((state) => ({
					expandedIds: state.expandedIds.includes(id)
						? state.expandedIds.filter((item) => item !== id)
						: [...state.expandedIds, id],
				})),

			loadFiles: (rawRoot) => {
				const normalizedData = normalizeTree(rawRoot);
				set({ files: normalizedData, isLoaded: true });
			},
			clearFiles: () => set({ files: {}, isLoaded: false, expandedIds: [] }),
		}),
		{
			name: "file-tree-storage",
		},
	),
);

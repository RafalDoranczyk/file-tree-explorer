import type { FileSystemState } from "../types";

export function checkNodeVisibility(
	files: FileSystemState,
	nodeId: string,
	searchQuery: string,
): boolean {
	const node = files[nodeId];
	if (!node) return false;

	if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
		return true;
	}

	return node.childrenIds.some((childId) =>
		checkNodeVisibility(files, childId, searchQuery),
	);
}

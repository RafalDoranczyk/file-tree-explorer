import type { FileSystemState, FlatNode, RawNode } from "../types";

export function normalizeTree(rawRoot: RawNode): FileSystemState {
	const flatState: FileSystemState = {};

	function traverse(
		node: RawNode,
		parentId: string | null,
		currentPath: string,
	): string {
		// 1. Generate ID based on path: root, root/child, root/child/grandchild...
		const baseId = currentPath ? `${currentPath}/${node.name}` : node.name;

		// 2. Duplicate Handling: If ID already exists, append a suffix to make it unique
		let finalId = baseId;
		let counter = 1;
		while (flatState[finalId]) {
			finalId = `${baseId}_${counter}`;
			counter++;
		}

		const flatNode: FlatNode = {
			id: finalId,
			name: node.name,
			type: node.type,
			size: node.type === "file" && node.size ? node.size : 0,
			parentId: parentId,
			childrenIds: [],
		};

		flatState[finalId] = flatNode;

		if (node.type === "folder" && node.children) {
			node.children.forEach((child) => {
				const uniqueChildId = traverse(child, finalId, finalId);
				flatNode.childrenIds.push(uniqueChildId);
			});
		}

		return finalId;
	}

	traverse(rawRoot, null, "");

	return flatState;
}

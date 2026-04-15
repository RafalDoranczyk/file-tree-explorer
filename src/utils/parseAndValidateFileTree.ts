import type { RawNode } from "../types";

export function parseAndValidateFileTree(jsonString: string): RawNode {
	const parsedData = JSON.parse(jsonString);

	if (
		!parsedData ||
		typeof parsedData !== "object" ||
		!parsedData.name ||
		!parsedData.type
	) {
		throw new Error(
			'Invalid JSON structure. Missing "name" or "type" field in the root node.',
		);
	}

	return parsedData;
}

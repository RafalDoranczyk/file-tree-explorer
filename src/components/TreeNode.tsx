import {
	ChevronDown,
	ChevronRight,
	File,
	Folder,
	FolderOpen,
} from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFileStore } from "../store/useFileStore";
import { checkNodeVisibility } from "../utils/checkNodeVisibility";
import { HighlightText } from "./HighlightText";

type TreeNodeProps = {
	nodeId: string;
	level?: number;
};

export function TreeNode({ nodeId, level = 0 }: TreeNodeProps) {
	const { files, searchQuery, expandedIds, toggleExpanded } = useFileStore();
	const node = files[nodeId];

	const isVisible = useMemo(() => {
		if (!searchQuery) return true;
		return checkNodeVisibility(files, nodeId, searchQuery);
	}, [files, nodeId, searchQuery]);

	if (!node || !isVisible) return null;

	const isFolder = node.type === "folder";
	const isExpanded = expandedIds.includes(nodeId) || searchQuery.length > 0;
	const isMatch =
		searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (isFolder) {
			toggleExpanded(nodeId);
		}
	};

	return (
		<div className="select-none">
			<div
				className={`flex items-center py-1 group rounded-lg transition-colors ${
					isMatch ? "bg-blue-50/50" : "hover:bg-gray-50"
				}`}
				style={{ paddingLeft: `${level * 1.5}rem` }}
			>
				<button
					type="button"
					className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-0 disabled:cursor-default"
					onClick={handleToggle}
					disabled={!isFolder}
					aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
				>
					{isFolder &&
						(isExpanded ? (
							<ChevronDown size={14} />
						) : (
							<ChevronRight size={14} />
						))}
				</button>

				<div className="mr-2 shrink-0">
					{isFolder ? (
						isExpanded ? (
							<FolderOpen size={18} className="text-blue-500 fill-blue-50" />
						) : (
							<Folder size={18} className="text-blue-500 fill-blue-50" />
						)
					) : (
						<File size={18} className="text-gray-400" />
					)}
				</div>

				<Link
					to={`/tree/${encodeURIComponent(node.id)}`}
					className="flex flex-col min-w-0"
				>
					<span
						className={`text-sm font-medium truncate transition-colors ${
							isMatch ? "text-blue-700" : "text-gray-700 hover:text-blue-600"
						}`}
					>
						<HighlightText text={node.name} query={searchQuery} />
					</span>
					{isMatch && searchQuery && (
						<span className="text-[10px] text-gray-400 font-mono truncate">
							<HighlightText text={node.id} query={searchQuery} />
						</span>
					)}
				</Link>
			</div>

			{isFolder && isExpanded && (
				<div className="animate-in fade-in slide-in-from-left-2 duration-200">
					{node.childrenIds.map((childId) => (
						<TreeNode key={childId} nodeId={childId} level={level + 1} />
					))}
				</div>
			)}
		</div>
	);
}

import { FolderTree, Search, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TreeEmptyState } from "../components/TreeEmptyState";
import { TreeNode } from "../components/TreeNode";
import { PATHS } from "../core/paths";
import { useFileStore } from "../store/useFileStore";

export default function TreeView() {
	const { files, isLoaded, searchQuery, setSearchQuery, clearFiles } =
		useFileStore();

	const navigate = useNavigate();

	if (!isLoaded || Object.keys(files).length === 0) {
		return <TreeEmptyState />;
	}

	const rootNode = Object.values(files).find((node) => node.parentId === null);

	const handleReset = () => {
		clearFiles();
		navigate(PATHS.MAIN);
	};

	return (
		<div className="max-w-4xl mx-auto mt-8 px-4 pb-20">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-600 rounded-lg text-white">
						<FolderTree size={20} />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 tracking-tight">
						Project Explorer
					</h1>
				</div>
				<button
					type="button"
					onClick={handleReset}
					className="group flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-bold transition-all active:scale-95 text-sm cursor-pointer"
				>
					<Trash2
						size={16}
						className="group-hover:-rotate-12 transition-transform"
					/>
					New Structure
				</button>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
				{/* Search Bar */}
				<div className="p-4 border-b border-gray-100 bg-gray-50/50">
					<div className="relative">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Search files or folders..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all text-sm"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								<X size={16} />
							</button>
						)}
					</div>
				</div>

				<div className="p-6 min-h-[400px]">
					{rootNode ? (
						<TreeNode nodeId={rootNode.id} />
					) : (
						<div className="flex flex-col items-center justify-center py-20 text-gray-400">
							<p className="italic">No nodes found in the structure.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

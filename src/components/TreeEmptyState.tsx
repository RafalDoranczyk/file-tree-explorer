import { ArrowRight, FolderPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS } from "../core/paths";

export function TreeEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
			<div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
				<FolderPlus size={40} strokeWidth={1.5} />
			</div>

			<h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2 italic">
				NO STRUCTURE LOADED
			</h2>

			<p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
				We couldn't find any file tree data. Please go back and upload a JSON
				file or generate an example.
			</p>

			<Link
				to={PATHS.MAIN}
				className="group flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
			>
				<span>GET STARTED</span>
				<ArrowRight
					size={18}
					className="group-hover:translate-x-1 transition-transform"
				/>
			</Link>
		</div>
	);
}

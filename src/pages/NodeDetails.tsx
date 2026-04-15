import {
	ArrowLeft,
	ChevronRight,
	File,
	Folder,
	HardDrive,
	Hash,
	Info,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PATHS } from "../core/paths";
import { useFileStore } from "../store/useFileStore";
import { formatNumberToBytes } from "../utils/formatNumberToBytes";

type InfoCardProps = {
	label: string;
	value: string;
	icon: React.ReactNode;
	fullWidth?: boolean;
	mono?: boolean;
};

function InfoCard({ label, value, icon, fullWidth, mono }: InfoCardProps) {
	return (
		<div
			className={`bg-gray-50/50 p-6 rounded-3xl border border-gray-100 ${fullWidth ? "md:col-span-2" : ""}`}
		>
			<div className="flex items-center gap-2 mb-2 text-gray-400">
				{icon}
				<p className="text-[10px] font-black uppercase tracking-widest">
					{label}
				</p>
			</div>
			<p
				className={`text-gray-800 font-bold leading-tight ${
					mono ? "font-mono text-sm break-all" : "text-xl"
				}`}
			>
				{value}
			</p>
		</div>
	);
}

export default function Details() {
	const { nodePath } = useParams();
	const { files } = useFileStore();

	const decodedPath = nodePath ? decodeURIComponent(nodePath) : "";
	const node = files[decodedPath];

	if (!node) return <Navigate to={PATHS.TREE} />;

	const isFolder = node.type === "folder";

	const calculateFolderSize = (id: string): number => {
		const targetNode = files[id];
		if (!targetNode) return 0;
		if (targetNode.type === "file") return targetNode.size || 0;

		return targetNode.childrenIds.reduce(
			(sum, childId) => sum + calculateFolderSize(childId),
			0,
		);
	};

	const totalSize = isFolder
		? calculateFolderSize(decodedPath)
		: node.size || 0;

	return (
		<div className="max-w-3xl mx-auto mt-12 px-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<Link
				to={PATHS.TREE}
				className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all mb-8 group"
			>
				<ArrowLeft
					size={16}
					className="group-hover:-translate-x-1 transition-transform"
				/>
				Back to Explorer
			</Link>

			<div className={`h-3 ${isFolder ? "bg-blue-500" : "bg-emerald-500"}`} />

			<div className="p-10">
				<div className="flex items-center gap-6 mb-12">
					<div
						className={`p-6 rounded-3xl ${isFolder ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
					>
						{isFolder ? (
							<Folder size={48} strokeWidth={1.5} />
						) : (
							<File size={48} strokeWidth={1.5} />
						)}
					</div>
					<div className="min-w-0">
						<h1 className="text-3xl font-black text-gray-900 break-all tracking-tight leading-none mb-2">
							{node.name}
						</h1>
						<div className="flex gap-2">
							<span
								className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
									isFolder
										? "bg-blue-100 text-blue-700"
										: "bg-emerald-100 text-emerald-700"
								}`}
							>
								{node.type}
							</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
					<InfoCard
						label="Full System Path"
						value={decodedPath}
						icon={<Info size={18} />}
						fullWidth
						mono
					/>
					<InfoCard
						label={isFolder ? "Total Tree Size" : "File Size"}
						value={formatNumberToBytes(totalSize)}
						icon={<HardDrive size={18} />}
					/>
					{isFolder && (
						<InfoCard
							label="Direct Children"
							value={`${node.childrenIds.length} items`}
							icon={<Hash size={18} />}
						/>
					)}
				</div>

				{/* Children List (Only for folders) */}
				{isFolder && node.childrenIds.length > 0 && (
					<div className="space-y-4">
						<h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
							Folder Contents
						</h3>
						<div className="grid grid-cols-1 gap-2">
							{node.childrenIds.map((childId) => (
								<Link
									key={childId}
									to={`/tree/${encodeURIComponent(childId)}`}
									className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all group"
								>
									<div className="flex items-center gap-3 min-w-0">
										<div className="text-gray-400 group-hover:text-blue-500 transition-colors">
											{files[childId]?.type === "folder" ? (
												<Folder size={18} />
											) : (
												<File size={18} />
											)}
										</div>
										<span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 truncate">
											{files[childId]?.name || childId}
										</span>
									</div>
									<ChevronRight
										size={16}
										className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
									/>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

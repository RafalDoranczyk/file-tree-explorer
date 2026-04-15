import { AlertCircle, FileJson, Sparkles, Upload, Wand2 } from "lucide-react";
import { useTreeForm } from "../hooks/useTreeForm";

export default function Home() {
	const { jsonInput, setJsonInput, error, actions } = useTreeForm();

	return (
		<div className="max-w-3xl mx-auto mt-16 px-4">
			<div className="text-center mb-10">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4 shadow-sm">
					<FileJson size={32} />
				</div>
				<h1 className="text-3xl font-bold text-gray-900 tracking-tight">
					FileTree Explorer
				</h1>
				<p className="mt-2 text-gray-600">
					Paste or upload your JSON to visualize the structure.
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
				<form onSubmit={actions.handleSubmit} className="p-8">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
								<Sparkles size={16} />
							</div>
							<div>
								<h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
									Data Source
								</h3>
								<p className="text-[10px] text-gray-400 font-mono font-medium">
									JSON INPUT
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
							<label className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-lg transition-all cursor-pointer">
								<Upload size={14} className="text-blue-500" />
								<span>Upload File</span>
								<input
									type="file"
									className="hidden"
									accept=".json"
									onChange={actions.handleFileUpload}
								/>
							</label>

							<div className="w-px h-4 bg-gray-300 mx-1" />

							<button
								type="button"
								onClick={actions.handleGenerateRandom}
								className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-lg transition-all cursor-pointer"
							>
								<Wand2 size={14} />
								<span>Generate Random</span>
							</button>
						</div>
					</div>

					<div className="relative group mb-6">
						<textarea
							className="w-full h-80 p-5 font-mono text-sm bg-gray-900 text-blue-400 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all shadow-inner placeholder:text-gray-700"
							placeholder='{ "name": "root", "type": "folder", "children": [] }'
							spellCheck={false}
							value={jsonInput}
							onChange={(e) => setJsonInput(e.target.value)}
						/>
						<div className="absolute top-4 right-8 text-[10px] font-bold text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700 pointer-events-none">
							RAW JSON
						</div>
					</div>

					{error && (
						<div className="flex items-start gap-3 p-4 mb-6 text-sm text-red-800 bg-red-50 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
							<AlertCircle size={18} className="shrink-0 mt-0.5" />
							<p className="font-medium">{error}</p>
						</div>
					)}

					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
					>
						Explore Structure
					</button>
				</form>

				<div className="bg-gray-50/50 border-t border-gray-100 px-8 py-3">
					<p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
						Interactive Tree Visualization
					</p>
				</div>
			</div>
		</div>
	);
}

import { AlertCircle, FileJson, Upload, Wand2 } from "lucide-react";
import { useTreeForm } from "../hooks/useTreeForm";

export default function Home() {
	const { jsonInput, setJsonInput, error, actions } = useTreeForm();

	return (
		<div className="max-w-3xl mx-auto mt-16 px-4">
			<div className="text-center mb-10">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
					<FileJson size={32} />
				</div>
				<h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
					FileTree Explorer
				</h1>
				<p className="mt-2 text-lg text-gray-600">
					Visualize your directory structure.
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
				<form onSubmit={actions.handleSubmit} className="p-8">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
						<div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
							<label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all cursor-pointer border border-transparent hover:border-gray-200">
								<Upload size={14} className="text-blue-500" />
								<span>Upload JSON</span>
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
								className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-md transition-all cursor-pointer border border-transparent"
							>
								<Wand2 size={14} />
								<span>Generate Example</span>
							</button>
						</div>
					</div>

					<div className="relative group">
						<textarea
							className="w-full h-80 p-5 font-mono text-sm bg-gray-900 text-blue-400 border-none rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:outline-none mb-2 transition-all shadow-inner placeholder:text-gray-600"
							placeholder='{ "name": "root", "type": "folder", "children": [...] }'
							spellCheck={false}
							value={jsonInput}
							onChange={(e) => setJsonInput(e.target.value)}
						/>
						<div className="absolute top-4 right-4 text-xs font-bold text-gray-700 bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							JSON
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
						className="group relative w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 cursor-pointer overflow-hidden"
					>
						<div className="relative z-10 flex items-center justify-center gap-2 text-lg">
							<span>Explore Structure</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
					</button>
				</form>

				<div className="bg-gray-50 border-t border-gray-100 px-8 py-4">
					<p className="text-xs text-center text-gray-500 uppercase tracking-widest font-semibold">
						JSON format required
					</p>
				</div>
			</div>
		</div>
	);
}

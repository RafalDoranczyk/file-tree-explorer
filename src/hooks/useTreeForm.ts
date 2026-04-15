import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFileStore } from "../store/useFileStore";
import { generateRandomTree } from "../utils/generateRandomTree";
import { parseAndValidateFileTree } from "../utils/parseAndValidateFileTree";

export function useTreeForm() {
	const [jsonInput, setJsonInput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const { loadFiles } = useFileStore();

	const handleGenerateRandom = () => {
		setError(null);
		const randomData = generateRandomTree();
		setJsonInput(JSON.stringify(randomData, null, 2));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const isJson =
			file.type === "application/json" || file.name.endsWith(".json");
		if (!isJson) {
			setError("Please upload a valid JSON file.");
			return;
		}

		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target?.result as string;
			setJsonInput(content);
			setError(null);

			e.target.value = "";
		};

		reader.onerror = () => {
			setError("Failed to read file.");
		};

		reader.readAsText(file);
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		if (!jsonInput.trim()) {
			setError("Please provide JSON input.");
			return;
		}

		try {
			const validData = parseAndValidateFileTree(jsonInput);
			loadFiles(validData);
			navigate("/tree");
		} catch (err) {
			setError(
				(err as Error).message ||
					"Failed to parse JSON. Please check the syntax.",
			);
		}
	};

	return {
		jsonInput,
		setJsonInput,
		error,
		actions: {
			handleGenerateRandom,
			handleFileUpload,
			handleSubmit,
		},
	};
}

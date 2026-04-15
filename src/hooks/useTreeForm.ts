import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileStore } from '../store/useFileStore';
import { parseAndValidateFileTree } from '../utils/parseAndValidateFileTree';
import { generateRandomTree } from '../utils/generateRandomTree';

export function useTreeForm() {
  const [jsonInput, setJsonInput] = useState('');
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


  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    setError('Please upload a valid JSON file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target?.result as string;
    setJsonInput(content); // Wstawiamy treść pliku do textarea
    setError(null);
  };
  
  reader.onerror = () => {
    setError('Failed to read file.');
  };

  reader.readAsText(file);
};

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!jsonInput.trim()) {
      setError('Please provide JSON input.');
      return;
    }

    try {
      const validData = parseAndValidateFileTree(jsonInput);
      loadFiles(validData);
      navigate('/tree');
    } catch (err) {
      setError((err as Error).message || 'Failed to parse JSON. Please check the syntax.');
    }
  };

  return {
    jsonInput,
    setJsonInput,
    error,
    handleGenerateRandom,
    handleFileUpload,
    handleSubmit
  };
}
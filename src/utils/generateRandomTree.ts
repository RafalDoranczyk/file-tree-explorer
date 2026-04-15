import type { RawNode } from '../types';

const FILE_NAMES = ['index.ts', 'App.tsx', 'styles.css', 'utils.js', 'README.md', 'data.json', 'logo.svg', 'config.yml'];
const FOLDER_NAMES = ['src', 'components', 'assets', 'hooks', 'utils', 'public', 'tests', 'api', 'styles'];

export function generateRandomTree(depth = 0, maxDepth = 3): RawNode {
  const isFolder = depth === 0 || Math.random() > (depth * 0.25);

  if (!isFolder || depth >= maxDepth) {
    return {
      name: FILE_NAMES[Math.floor(Math.random() * FILE_NAMES.length)],
      type: 'file',
      size: Math.floor(Math.random() * 50000) + 1024, // 1KB to ~50KB
    };
  }

  // Jeśli to folder, losujemy od 1 do 4 dzieci
  const numChildren = Math.floor(Math.random() * 4) + 1;
  const children: RawNode[] = [];

  for (let i = 0; i < numChildren; i++) {
    children.push(generateRandomTree(depth + 1, maxDepth));
  }

  return {
    name: depth === 0 ? 'root' : FOLDER_NAMES[Math.floor(Math.random() * FOLDER_NAMES.length)],
    type: 'folder',
    children,
  };
}
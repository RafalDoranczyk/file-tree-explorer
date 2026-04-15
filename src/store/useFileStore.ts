import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FileSystemState, RawNode } from '../types';
import { normalizeTree } from '../utils/normalizeTree';

interface FileStore {
  files: FileSystemState;     
  isLoaded: boolean;        
  loadFiles: (rawRoot: RawNode) => void; 
  clearFiles: () => void;    
}

export const useFileStore = create<FileStore>()(

  persist(
    (set) => ({
      files: {},
      isLoaded: false,
      loadFiles: (rawRoot) => {
        const normalizedData = normalizeTree(rawRoot);
        set({ files: normalizedData, isLoaded: true });
      },
      clearFiles: () => set({ files: {}, isLoaded: false }),
    }),
    {
      name: 'file-tree-storage', 
    }
  )
);
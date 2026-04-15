

export type NodeType = 'file' | 'folder';

export interface RawNode {
  name: string;
  type: NodeType;
  size?: number; 
  children?: RawNode[]; 
}

export interface FlatNode {
  id: string; 
  name: string;
  type: NodeType;
  size: number; 
  parentId: string | null; 
  childrenIds: string[]; 
}


export type FileSystemState = Record<string, FlatNode>;
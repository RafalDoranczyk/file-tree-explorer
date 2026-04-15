import type { RawNode, FlatNode, FileSystemState } from '../types';

export function normalizeTree(rawRoot: RawNode): FileSystemState {
  const flatState: FileSystemState = {};

  function traverse(node: RawNode, parentId: string | null, currentPath: string) {
    const nodeId = currentPath ? `${currentPath}/${node.name}` : node.name;

    const flatNode: FlatNode = {
      id: nodeId,
      name: node.name,
      type: node.type,
      size: node.type === 'file' && node.size ? node.size : 0,
      parentId: parentId,
      childrenIds: [],
    };

    if (node.type === 'folder' && node.children) {
      node.children.forEach((child) => {
        flatNode.childrenIds.push(`${nodeId}/${child.name}`);
        // Recursively traverse child nodes
        traverse(child, nodeId, nodeId);
      });
    }

    flatState[nodeId] = flatNode;
  }

  traverse(rawRoot, null, '');

  return flatState;
}



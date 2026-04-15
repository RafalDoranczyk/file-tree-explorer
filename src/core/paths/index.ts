const MAIN = "/";
const TREE = `${MAIN}tree`;

export const PATHS = {
  MAIN,
  TREE,
  DETAILS: `${TREE}/:nodePath`, 
} as const;
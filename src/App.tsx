import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TreeView from './pages/TreeView';
import NodeDetails from './pages/NodeDetails';
import { PATHS } from './core/paths';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path={PATHS.MAIN} element={<Home />} />
          <Route path={PATHS.TREE} element={<TreeView />} />
          <Route path={PATHS.DETAILS} element={<NodeDetails />} />
        </Routes>
      </div>
    </div>
  );
}
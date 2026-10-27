import { Route, Routes } from 'react-router-dom';

import Navbar from './compenents/navbar';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ExplorePage />} path="/explore" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </main>
    </div>
  );
}

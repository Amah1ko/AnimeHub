import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Top from './pages/Top';
import Releases from './pages/Releases';
import Search from './pages/Search';
import AnimeDetails from './pages/AnimeDetails';
import Watchlist from './pages/Watchlist';
import { GlobalStyles } from './components/GlobalStyles';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/top" element={<Top />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <GlobalStyles />
        <Toaster position="top-center" richColors theme="dark" />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;

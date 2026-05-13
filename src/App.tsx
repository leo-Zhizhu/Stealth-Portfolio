import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Projects } from './pages/Projects/Projects';
import { About } from './pages/About/About';
import { Education } from './pages/Education/Education';
import { Competitions } from './pages/Competitions/Competitions';

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const location = useLocation();
  
  // Derive activePage from location for the Layout/Sidebar
  const activePage = location.pathname.split('/')[1] || 'dashboard';

  return (
    <Layout activePage={activePage}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              isFirstLoad={isFirstLoad} 
              setIsFirstLoad={setIsFirstLoad} 
            />
          } 
        />
        <Route path="/education" element={<Education />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/about" element={<About />} />
        {/* Fallback to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;

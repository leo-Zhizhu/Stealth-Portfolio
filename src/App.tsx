import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Projects } from './pages/Projects/Projects';
import { About } from './pages/About/About';
import { Education } from './pages/Education/Education';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} isFirstLoad={isFirstLoad} setIsFirstLoad={setIsFirstLoad} />;
      case 'education':
        return <Education setActivePage={setActivePage} />;
      case 'projects':
        return <Projects />;
      case 'about':
        return <About />;
      default:
        return <Dashboard setActivePage={setActivePage} isFirstLoad={isFirstLoad} setIsFirstLoad={setIsFirstLoad} />;
    }
  };



  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;

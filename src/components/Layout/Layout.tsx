import { useState, type ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Layout({ children, activePage, setActivePage }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`layout-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

import { useState, type ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  activePage: string;
}

export function Layout({ children, activePage }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`layout-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
        activePage={activePage} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

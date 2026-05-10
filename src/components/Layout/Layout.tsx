import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Layout({ children, activePage, setActivePage }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

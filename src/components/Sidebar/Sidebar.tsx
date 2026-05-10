import { LayoutDashboard, FolderKanban, User } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle"></div>
        <h2>Portfolio</h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar"></div>
          <div className="user-info">
            <span className="user-name">Guest User</span>
            <span className="user-role">Visitor</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

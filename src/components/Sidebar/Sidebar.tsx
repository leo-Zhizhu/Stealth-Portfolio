import { LayoutDashboard, GraduationCap, FolderKanban, User, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ activePage, setActivePage, isCollapsed, onToggle }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
  ];


  return (
    <>
      <button className={`floating-toggle-btn ${isCollapsed ? 'is-collapsed' : ''}`} onClick={onToggle} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </button>
      
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-content-wrapper">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-circle"></div>
              <h2>Portfolio</h2>
            </div>
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
        </div>
      </aside>
    </>
  );
}

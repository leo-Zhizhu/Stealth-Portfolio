import { Link } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, FolderKanban, User, Menu, ChevronLeft } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activePage: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ activePage, isCollapsed, onToggle }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} />, path: '/education' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} />, path: '/projects' },
    { id: 'about', label: 'About', icon: <User size={20} />, path: '/about' },
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
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) onToggle(); // Close sidebar on mobile after click
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
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

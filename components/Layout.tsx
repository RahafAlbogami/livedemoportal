
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { label: 'Policies', path: '/', icon: 'description' },
    { label: 'Claims', path: '#', icon: 'assignment_late' },
    { label: 'Reports', path: '#', icon: 'analytics' },
    { label: 'Settings', path: '#', icon: 'settings' },
  ];

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
  const contentPadding = isCollapsed ? 'pl-20' : 'pl-64';

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark transition-all duration-300">
      {/* Sidebar Navigation */}
      <aside className={`${sidebarWidth} border-r border-[#e5e7eb] dark:border-gray-800 bg-white dark:bg-[#1a2632] flex flex-col fixed inset-y-0 z-50 transition-all duration-300 ease-in-out shadow-sm`}>
        <div className="p-4 h-16 border-b border-[#e5e7eb] dark:border-gray-800 flex items-center justify-between overflow-hidden">
          <Link to="/" className={`flex items-center gap-3 text-[#111418] dark:text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible w-0' : 'opacity-100 visible'}`}>
            <div className="size-8 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl leading-none">shield_with_heart</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight whitespace-nowrap">AdminPortal</h2>
          </Link>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-all duration-300 ${isCollapsed ? 'mx-auto' : ''}`}
          >
            <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              menu_open
            </span>
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-6 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <p className={`px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {isCollapsed ? '' : 'Main Menu'}
          </p>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-all group relative ${
                location.pathname === item.path
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-[#617589] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-xl shrink-0 ${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`}>
                {item.icon}
              </span>
              <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 translate-x-4 invisible w-0' : 'opacity-100 translate-x-0 visible'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#e5e7eb] dark:border-gray-800">
          <div className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 border border-white/20 shadow-sm shrink-0" 
              style={{ backgroundImage: 'url("https://picsum.photos/seed/admin/100/100")' }}
            ></div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1 transition-opacity duration-300">
                <p className="text-xs font-bold truncate">Jonathan Admin</p>
                <p className="text-[10px] text-gray-500 truncate">System Overseer</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${contentPadding} transition-all duration-300 ease-in-out`}>
        {/* Top Header */}
        <header className="h-16 flex items-center justify-end border-b border-solid border-[#e5e7eb] dark:border-gray-800 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white dark:border-[#1a2632] rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-gray-200 dark:border-gray-700"></div>
            <p className="text-xs font-medium text-gray-400 hidden sm:block">October 24, 2024</p>
          </div>
        </header>
        
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>

        <footer className="p-6 text-center text-[#617589] text-sm dark:border-gray-800 border-t bg-white dark:bg-[#1a2632]">
          © 2024 AdminPortal Insurance Systems. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;

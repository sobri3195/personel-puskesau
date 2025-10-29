import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Map,
  Bell,
  Activity,
  UserCog,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/soldiers', icon: Users, label: 'Data Prajurit' },
    { path: '/units', icon: Building2, label: 'Data Satuan' },
    { path: '/map', icon: Map, label: 'Peta Sebaran' },
    { path: '/notifications', icon: Bell, label: 'Notifikasi' },
    { path: '/activity-logs', icon: Activity, label: 'Log Aktivitas' }
  ];

  if (user?.role === 'super_admin') {
    navItems.push({ path: '/users', icon: UserCog, label: 'Manajemen User' });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-primary-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md hover:bg-primary-600"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-bold ml-2">Sistem Data Kesehatan TNI AU</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-primary-200 text-xs">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-md hover:bg-primary-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } md:block w-64 bg-white shadow-md min-h-[calc(100vh-4rem)] fixed md:relative z-10`}
        >
          <nav className="p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

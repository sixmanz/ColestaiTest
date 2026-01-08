import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Film, LogOut, Home, User, Users, Newspaper, BookOpen, UserCircle, FileText, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const { currentUser, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();
    const location = useLocation();

    // TODO: Uncomment when ready for production
    // Protect admin routes - require authentication
    // if (!currentUser) {
    //     return <Navigate to="/login" />;
    // }

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, labelKey: 'admin_dashboard' },
        { path: '/admin/projects', icon: Film, labelKey: 'admin_projects' },
        { path: '/admin/articles', icon: FileText, labelKey: 'admin_articles' },
        { path: '/admin/directors', icon: User, labelKey: 'admin_directors' },
        { path: '/admin/team', icon: Users, labelKey: 'admin_team' },
        { path: '/admin/users', icon: UserCircle, labelKey: 'admin_users' },
        { path: '/admin/news', icon: Newspaper, labelKey: 'admin_news' },
        { path: '/admin/education', icon: BookOpen, labelKey: 'admin_education' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        Colestia Admin
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{t(item.labelKey)}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                    >
                        <Home size={20} />
                        <span className="font-medium">{t('admin_view_site')}</span>
                    </Link>
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">{t('admin_logout')}</span>
                    </button>
                    <div className="px-4 py-2 text-xs text-gray-400">
                        {currentUser?.email || 'Guest Admin'}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto flex flex-col">
                {/* Top Header Bar */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex items-center justify-end gap-4">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all text-gray-700 dark:text-gray-300"
                    >
                        <Globe size={18} />
                        <span className="font-medium text-sm">{language === 'th' ? 'ไทย' : 'English'}</span>
                        <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold">
                            {language.toUpperCase()}
                        </span>
                    </button>
                </div>

                {/* Page Content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

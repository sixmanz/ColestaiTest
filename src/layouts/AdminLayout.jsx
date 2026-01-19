import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Film, LogOut, Home, User, Users, Newspaper, BookOpen, UserCircle, FileText, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const AdminLayout = () => {
    const { currentUser, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:relative inset-y-0 left-0 z-50 w-64 
                    bg-white dark:bg-gray-800 shadow-xl flex flex-col 
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-6 flex justify-between items-center md:justify-center">
                    <img src={logo} alt="Colestia Admin" className="h-12 md:h-16 w-auto" />
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-colestia-purple/10 text-colestia-purple dark:bg-colestia-purple/20 dark:text-colestia-purple'
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
                    <div className="px-4 py-2 text-xs text-gray-400 text-center">
                        {currentUser?.email || 'Guest Admin'}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Top Header Bar */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 flex items-center justify-between md:justify-end gap-4">
                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all text-gray-700 dark:text-gray-300 ml-auto md:ml-0"
                    >
                        <Globe size={18} />
                        <span className="font-medium text-sm hidden sm:inline">{language === 'th' ? 'ไทย' : 'English'}</span>
                        <span className="text-xs bg-colestia-purple text-white px-2 py-0.5 rounded-full font-bold">
                            {language.toUpperCase()}
                        </span>
                    </button>
                </div>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

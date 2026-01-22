import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, X, Save, Loader, Shield, User, Ban, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Static mockup data for Users
const initialUsers = [
    {
        id: '1',
        displayName: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        role: 'admin',
        status: 'active',
        createdAt: '2026-01-01'
    },
    {
        id: '2',
        displayName: 'สมหญิง รักเรียน',
        email: 'somying@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2026-01-03'
    },
    {
        id: '3',
        displayName: 'John Investor',
        email: 'john.investor@gmail.com',
        role: 'user',
        status: 'suspended',
        createdAt: '2026-01-05'
    },
    {
        id: '4',
        displayName: 'พิมพ์ใจ งามเด่น',
        email: 'pimjai@colestia.io',
        role: 'admin',
        status: 'active',
        createdAt: '2025-12-20'
    }
];

import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const AdminUsers = () => {
    const { t } = useLanguage();
    const scrollRef = useHorizontalScroll();
    const [users, setUsers] = useState(initialUsers);
    const [isLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ role: 'user' });

    const openModal = (user) => {
        setEditingUser(user);
        setFormData({ role: user.role || 'user' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, role: formData.role } : u));
        alert(t('admin_alert_role_updated'));
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm(t('admin_confirm_delete'))) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'active' ? 'suspended' : 'active';
                return { ...u, status: newStatus };
            }
            return u;
        }));
    };

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_user_management')}</h2>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={t('admin_search_users')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-colestia-purple focus:border-transparent"
                />
            </div>

            {/* Users Table */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-colestia-purple" />
                </div>
            ) : (
                <div ref={scrollRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{t('admin_header_user')}</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{t('admin_header_email')}</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{t('admin_header_role')}</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{t('admin_header_status')}</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">{t('admin_header_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredUsers.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`transition-colors ${user.status === 'suspended'
                                        ? 'bg-red-50/50 dark:bg-red-900/10'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                                        }`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.status === 'suspended'
                                                ? 'bg-gray-200 dark:bg-gray-700'
                                                : 'bg-purple-100 dark:bg-purple-900/30'
                                                }`}>
                                                <User className={user.status === 'suspended' ? 'text-gray-400' : 'text-purple-600'} size={20} />
                                            </div>
                                            <div>
                                                <span className={`font-medium ${user.status === 'suspended' ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                                                    {user.displayName || t('admin_user_anonymous')}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {user.role === 'admin' ? t('admin_role_admin') : t('admin_role_user')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${user.status === 'suspended'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            }`}>
                                            {user.status === 'active' ? (
                                                <><CheckCircle size={12} /> {t('admin_status_active')}</>
                                            ) : (
                                                <><Ban size={12} /> {t('admin_status_suspended')}</>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`p-2 rounded-lg transition-colors ${user.status === 'suspended'
                                                    ? 'hover:bg-emerald-100 text-emerald-600 dark:hover:bg-emerald-900/30'
                                                    : 'hover:bg-red-100 text-amber-600 dark:hover:bg-red-900/30'
                                                    }`}
                                                title={user.status === 'active' ? t('admin_tooltip_suspend') : t('admin_tooltip_activate')}
                                            >
                                                {user.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                                            </button>
                                            <button
                                                onClick={() => openModal(user)}
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-purple-600"
                                                title={t('admin_tooltip_edit_role')}
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600"
                                                title={t('admin_tooltip_delete_user')}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">{t('admin_no_users')}</div>
                    )}
                </div>
            )}

            {/* Edit Role Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin_edit_role')}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('admin_header_user')}: {editingUser?.email}
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_header_role')}</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ role: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="user">{t('admin_role_user')}</option>
                                        <option value="admin">{t('admin_role_admin')}</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {t('admin_save_changes')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;

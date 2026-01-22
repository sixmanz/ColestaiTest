
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader, Receipt, ArrowUpRight, ArrowDownLeft, Filter, Download, Edit2, X, Save, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Mock Transaction Data
const initialTransactions = [
    {
        id: 'TXN-001',
        user: 'Somchai Jaidee',
        email: 'somchai@example.com',
        project: 'Space Wars Eternal',
        amount: 50000,
        currency: 'THB',
        date: '2026-01-20T10:30:00',
        status: 'completed',
        type: 'investment',
        slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300&h=400'
    },
    {
        id: 'TXN-002',
        user: 'John Investor',
        email: 'john.inv@gmail.com',
        project: 'First Love Paradise',
        amount: 150000,
        currency: 'THB',
        date: '2026-01-19T14:20:00',
        status: 'completed',
        type: 'investment',
        slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300&h=400'
    },
    {
        id: 'TXN-003',
        user: 'Alice Wonderland',
        email: 'alice@crypto.com',
        project: 'Legend of the Monster',
        amount: 25000,
        currency: 'THB',
        date: '2026-01-18T09:15:00',
        status: 'pending',
        type: 'investment',
        slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300&h=400'
    },
    {
        id: 'TXN-004',
        user: 'Somying Rakrian',
        email: 'somying@example.com',
        project: 'Space Wars Eternal',
        amount: 10000,
        currency: 'THB',
        date: '2026-01-18T16:45:00',
        status: 'failed',
        type: 'investment',
        slipUrl: null
    },
    {
        id: 'TXN-005',
        user: 'Bob Builder',
        email: 'bob@build.com',
        project: 'Deep Forest Adventure',
        amount: 75000,
        currency: 'THB',
        date: '2026-01-17T11:00:00',
        status: 'completed',
        type: 'investment',
        slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300&h=400'
    }
];

const AdminTransactions = () => {
    const { t } = useLanguage();
    const [transactions, setTransactions] = useState(initialTransactions);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Edit Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTxn, setEditingTxn] = useState(null);
    const [statusForm, setStatusForm] = useState('');

    const handleEditClick = (txn) => {
        setEditingTxn(txn);
        setStatusForm(txn.status);
        setIsModalOpen(true);
    };

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        setTransactions(transactions.map(t =>
            t.id === editingTxn.id ? { ...t, status: statusForm } : t
        ));
        setIsModalOpen(false);
        setEditingTxn(null);
    };

    const filteredTransactions = transactions.filter(txn => {
        const matchesSearch =
            txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || txn.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const formatCurrency = (val) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val);
    const formatDate = (dateString) => new Date(dateString).toLocaleString('th-TH');

    const statusStyles = {
        completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'completed': return t('admin_txn_completed');
            case 'pending': return t('admin_txn_pending');
            case 'failed': return t('admin_txn_failed');
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Receipt className="text-colestia-purple" /> {t('admin_txn_history')}
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                    <Download size={18} /> {t('admin_export_csv')}
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={t('admin_search_txn')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-colestia-purple focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', 'completed', 'pending', 'failed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px - 4 py - 2 rounded - lg text - sm font - medium capitalize transition - colors whitespace - nowrap ${filterStatus === status
                                    ? 'bg-colestia-purple text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                } `}
                        >
                            {status === 'all' ? 'All' : getStatusLabel(status)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions Table */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-colestia-purple" />
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_txn_id')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_user')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_project')}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_date')}</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_amount')}</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_status')}</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">{t('admin_header_actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredTransactions.map((txn) => (
                                    <motion.tr
                                        key={txn.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-gray-500">{txn.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-white">{txn.user}</span>
                                                <span className="text-xs text-gray-500">{txn.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{txn.project}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(txn.date)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(txn.amount)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium capitalize ${statusStyles[txn.status]} `}>
                                                {getStatusLabel(txn.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEditClick(txn)}
                                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg hover:text-colestia-purple transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-16">
                            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">{t('admin_no_txn')}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Update Status Modal */}
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
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin_update_status')}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="mb-6 space-y-4">
                                {/* Transaction Info */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('admin_header_txn_id')}</span>
                                        <span className="font-mono font-medium text-gray-900 dark:text-white">{editingTxn?.id}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('admin_header_user')}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{editingTxn?.user}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('admin_header_amount')}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{editingTxn && formatCurrency(editingTxn.amount)}</span>
                                    </div>
                                </div>

                                {/* Payment Proof Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('admin_payment_proof')}
                                    </label>
                                    {editingTxn?.slipUrl ? (
                                        <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                                            <img
                                                src={editingTxn.slipUrl}
                                                alt="Payment Slip"
                                                className="w-full h-64 object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-32 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-gray-400">
                                            <ImageIcon size={32} className="mb-2 opacity-50" />
                                            <span className="text-sm">{t('admin_no_slip')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <form onSubmit={handleStatusUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_select_status')}</label>
                                    <select
                                        value={statusForm}
                                        onChange={(e) => setStatusForm(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-colestia-purple focus:border-transparent appearance-none"
                                    >
                                        <option value="completed">{t('admin_txn_completed')}</option>
                                        <option value="pending">{t('admin_txn_pending')}</option>
                                        <option value="failed">{t('admin_txn_failed')}</option>
                                    </select>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        {t('admin_cancel')}
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-colestia-purple text-white rounded-xl font-semibold hover:bg-colestia-purple-dark transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save size={20} />
                                        {t('admin_save_changes')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminTransactions;

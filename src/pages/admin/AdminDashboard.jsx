import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Film, DollarSign } from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}>
                <Icon className={`text-${color}-600 dark:text-${color}-400`} size={24} />
            </div>
            <span className={`text-sm font-medium text-${color}-600 bg-${color}-50 px-2 py-1 rounded-full`}>
                +12%
            </span>
        </div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </motion.div>
);

const AdminDashboard = () => {
    const { stats, isLoading } = useDashboardStats();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value={isLoading ? '...' : stats.projects} icon={Film} color="purple" />
                <StatCard title="Directors" value={isLoading ? '...' : stats.directors} icon={Users} color="blue" />
                <StatCard title="Team Members" value={isLoading ? '...' : stats.team} icon={Users} color="green" />
                <StatCard title="Growth Rate" value={stats.growth} icon={TrendingUp} color="pink" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Film size={20} className="text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">New Project Created</h4>
                                <p className="text-sm text-gray-500">Space Wars Eternal was added by Admin</p>
                            </div>
                            <span className="text-sm text-gray-400">2 hours ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React from 'react';
import { motion } from 'framer-motion';

import {
    TrendingUp, Users, Film, Database, Eye, DollarSign, UserCheck,
    ArrowUpRight, ArrowDownRight, Clock, Star, Zap, Bell, Settings,
    Calendar, Target, Award, Activity, PieChart, BarChart3
} from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { projects as initialProjects } from '../../data/projectsData';
import { useLanguage } from '../../context/LanguageContext';
import { useViewCount } from '../../hooks/useViewCount';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm">
                        {entry.name}: {entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


const visitorsData = [
    { month: 'Jul', visitors: 1250 },
    { month: 'Aug', visitors: 1890 },
    { month: 'Sep', visitors: 2340 },
    { month: 'Oct', visitors: 2780 },
    { month: 'Nov', visitors: 3120 },
    { month: 'Dec', visitors: 3890 },
    { month: 'Jan', visitors: 4520 },
];

const investorsData = [
    { month: 'Jul', investors: 45 },
    { month: 'Aug', investors: 78 },
    { month: 'Sep', investors: 112 },
    { month: 'Oct', investors: 156 },
    { month: 'Nov', investors: 198 },
    { month: 'Dec', investors: 245 },
    { month: 'Jan', investors: 312 },
];

const revenueData = [
    { month: 'Jul', revenue: 150000, expenses: 80000 },
    { month: 'Aug', revenue: 280000, expenses: 120000 },
    { month: 'Sep', revenue: 350000, expenses: 150000 },
    { month: 'Oct', revenue: 420000, expenses: 180000 },
    { month: 'Nov', revenue: 550000, expenses: 200000 },
    { month: 'Dec', revenue: 720000, expenses: 250000 },
    { month: 'Jan', revenue: 890000, expenses: 280000 },
];



const recentActivities = [
    { type: 'investment', user: 'John D.', action: 'invested ฿50,000 in Space Wars Eternal', time: '5 min ago', icon: DollarSign, color: 'green' },
    { type: 'user', user: 'Sarah M.', action: 'registered as new investor', time: '15 min ago', icon: UserCheck, color: 'blue' },
    { type: 'project', user: 'Admin', action: 'updated Bangkok Ghost Stories details', time: '1 hour ago', icon: Film, color: 'purple' },
    { type: 'milestone', user: 'System', action: 'Space Wars reached 85% funding goal', time: '2 hours ago', icon: Target, color: 'blue' },
];

const AdminDashboard = () => {
    const { stats, isLoading } = useDashboardStats();
    const { t } = useLanguage();
    const { views } = useViewCount();

    // Merge static data with dynamic view counts
    const projectsWithViews = initialProjects.map(p => ({
        ...p,
        realViews: views[p.id] || p.views || 0
    }));



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_dash_welcome')}</h1>
                    <p className="text-gray-500 mt-1">{t('admin_dash_summary')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Jan 2026</span>
                    </div>
                </div>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Projects */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-colestia-purple to-colestia-blue p-6 rounded-2xl shadow-lg shadow-colestia-purple/30 dark:shadow-colestia-purple/20">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Film className="text-white" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-sm text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            <ArrowUpRight size={14} /> +12%
                        </span>
                    </div>
                    <h3 className="text-white/80 text-sm mt-4">{t('admin_total_projects')}</h3>
                    <p className="text-3xl font-bold text-white">{isLoading ? '...' : stats.projects}</p>
                </motion.div>

                {/* Total Investors */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-colestia-blue to-[#1a237e] p-6 rounded-2xl shadow-lg shadow-colestia-blue/30 dark:shadow-colestia-blue/20">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Users className="text-white" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-sm text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            <ArrowUpRight size={14} /> +27%
                        </span>
                    </div>
                    <h3 className="text-white/80 text-sm mt-4">{t('admin_dash_new_investors')}</h3>
                    <p className="text-3xl font-bold text-white">1,146</p>
                </motion.div>

                {/* Total Revenue */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <DollarSign className="text-white" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-sm text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            <ArrowUpRight size={14} /> +35%
                        </span>
                    </div>
                    <h3 className="text-white/80 text-sm mt-4">{t('admin_header_amount')}</h3>
                    <p className="text-3xl font-bold text-white">฿29.7M</p>
                </motion.div>

                {/* Growth Rate */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-colestia-blue to-colestia-purple p-6 rounded-2xl shadow-lg shadow-colestia-purple/20 dark:shadow-colestia-purple/30">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-sm text-white/80 bg-white/20 px-2 py-1 rounded-full">
                            <ArrowUpRight size={14} /> +8%
                        </span>
                    </div>
                    <h3 className="text-white/80 text-sm mt-4">{t('admin_dash_growth')}</h3>
                    <p className="text-3xl font-bold text-white">24.5%</p>
                </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Website Visitors Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <Eye className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_dash_visitors')}</h3>
                                <p className="text-xs text-gray-500">{t('admin_dash_this_month')}</p>
                            </div>
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <ArrowUpRight size={14} /> 16.2%
                        </span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={visitorsData}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" name={t('admin_dash_visitors')} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">19,790</span>
                        <span className="text-gray-500 text-sm ml-2">{t('admin_dash_people')}</span>
                    </div>
                </motion.div>

                {/* Investors Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                                <UserCheck className="text-emerald-600 dark:text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_dash_new_investors')}</h3>
                                <p className="text-xs text-gray-500">{t('admin_dash_this_month')}</p>
                            </div>
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <ArrowUpRight size={14} /> 27.3%
                        </span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={investorsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="investors" name={t('admin_dash_new_investors')} radius={[4, 4, 0, 0]}>
                                    {investorsData.map((entry, index) => (
                                        <Cell key={index} fill={`hsl(160, 70%, ${50 - index * 4}%)`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">312</span>
                        <span className="text-gray-500 text-sm ml-2">{t('admin_dash_people')}</span>
                    </div>
                </motion.div>

                {/* Revenue Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <BarChart3 className="text-colestia-blue dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_dash_revenue_expenses')}</h3>
                                <p className="text-xs text-gray-500">{t('admin_dash_this_month')}</p>
                            </div>
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <ArrowUpRight size={14} /> 35%
                        </span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="revenue" name={t('admin_dash_revenue')} fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expenses" name={t('admin_dash_expenses')} fill="#f97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm text-gray-500">{t('admin_dash_revenue')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                            <span className="text-sm text-gray-500">{t('admin_dash_expenses')}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row - Projects & Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Funded Projects */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-colestia-purple/10 dark:bg-colestia-purple/20 rounded-xl flex items-center justify-center">
                                <Award className="text-colestia-purple dark:text-colestia-gold" size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_dash_top_projects')} ({t('admin_type_funding')})</h3>
                        </div>
                        <button className="text-colestia-purple text-sm font-medium hover:underline">{t('admin_dash_view_all')}</button>
                    </div>
                    <div className="space-y-4">
                        {initialProjects
                            .sort((a, b) => (b.currentFunding || 0) - (a.currentFunding || 0))
                            .slice(0, 4)
                            .map((project, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <div className="w-10 h-10 bg-gradient-to-br from-colestia-purple to-colestia-gold rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">{project.titleEn}</h4>
                                        <p className="text-sm text-gray-500">{project.investors || 0} investors • {(project.currentFunding || 0).toLocaleString()} THB</p>
                                    </div>
                                    <div className="hidden sm:block w-24 shrink-0">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-gray-500 text-xs">Funded</span>
                                            <span className="font-medium text-gray-900 dark:text-white text-xs">{project.percentage}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-colestia-purple to-colestia-blue rounded-full transition-all"
                                                style={{ width: `${project.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </motion.div>

                {/* Most Viewed Projects (Interests) */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <Eye className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_most_viewed')}</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {projectsWithViews
                            .sort((a, b) => b.realViews - a.realViews)
                            .slice(0, 4)
                            .map((project, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 font-bold shrink-0">
                                        <Eye size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">{project.titleEn}</h4>
                                        <p className="text-sm text-gray-500">{project.realViews.toLocaleString()} {t('admin_views_unit')}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg">
                                            <ArrowUpRight size={14} /> {t('admin_popular_badge')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity (Full Width) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <Activity className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{t('admin_dash_recent_activity')}</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        const colorClasses = {
                            green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                            amber: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                        };
                        return (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[activity.color]}`}>
                                    <Icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                                        <span className="font-medium">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {activity.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;

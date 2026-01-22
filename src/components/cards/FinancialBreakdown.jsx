import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, AlertCircle, DollarSign, Film, Globe, Tv } from 'lucide-react';

/**
 * FinancialBreakdown - Displays cost structure and revenue sources
 * Uses data from financialData.json mock structure
 */
const FinancialBreakdown = ({ financialData }) => {
    if (!financialData) return null;

    const categoryColors = {
        'post-production': { bg: 'bg-colestia-purple', text: 'text-colestia-purple' },
        'marketing': { bg: 'bg-colestia-blue', text: 'text-colestia-blue' },
        'operations': { bg: 'bg-cyan-500', text: 'text-cyan-400' }
    };

    const revenueIcons = {
        'box_office': Film,
        'streaming_platforms': Tv,
        'international_licensing': Globe
    };

    const riskLevels = {
        'market_acceptance': 'high',
        'distribution_delay': 'medium',
        'regulatory_changes': 'medium'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Funding & Business Model</h3>
                    <p className="text-sm text-gray-400">{financialData.funding_purpose}</p>
                </div>
            </div>

            {/* Cost Structure */}
            <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <PieChart className="w-3 h-3" /> Cost Structure
                </h4>
                <div className="space-y-3">
                    {financialData.cost_structure?.map((item, idx) => {
                        const colors = categoryColors[item.category] || { bg: 'bg-gray-500', text: 'text-gray-400' };
                        return (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-white capitalize">{item.category.replace('-', ' ')}</span>
                                    <span className={`text-sm font-bold ${colors.text}`}>{item.percentage}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        className={`h-full rounded-full ${colors.bg}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Revenue Sources */}
            <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Revenue Sources
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    {financialData.revenue_sources?.map((source, idx) => {
                        const Icon = revenueIcons[source] || DollarSign;
                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="text-xs text-gray-300 text-center capitalize">{source.replace('_', ' ')}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Risk Factors */}
            <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" /> Risk Factors
                </h4>
                <div className="space-y-2">
                    {financialData.risk_factors?.map((risk, idx) => {
                        const level = riskLevels[risk] || 'low';
                        const levelColors = {
                            high: 'bg-red-500/20 text-red-400 border-red-500/30',
                            medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                            low: 'bg-green-500/20 text-green-400 border-green-500/30'
                        };
                        return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-sm text-white capitalize">{risk.replace('_', ' ')}</span>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${levelColors[level]}`}>
                                    {level}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default FinancialBreakdown;

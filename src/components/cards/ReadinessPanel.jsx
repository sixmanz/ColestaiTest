import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, FileText, Shield, DollarSign, Scale, Activity } from 'lucide-react';

/**
 * ReadinessPanel - Displays project readiness assessment
 * Uses data from readinessAssessment.json mock structure
 */
const ReadinessPanel = ({ readinessData }) => {
    if (!readinessData) return null;

    const getRiskScoreColor = (score) => {
        if (score >= 80) return { ring: 'stroke-green-500', text: 'text-green-400', bg: 'bg-green-500/20' };
        if (score >= 60) return { ring: 'stroke-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/20' };
        if (score >= 40) return { ring: 'stroke-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/20' };
        return { ring: 'stroke-red-500', text: 'text-red-400', bg: 'bg-red-500/20' };
    };

    const scoreColors = getRiskScoreColor(readinessData.risk_score);

    const checklistItems = [
        { key: 'legal_ready', label: 'Legal Ready', icon: Scale, value: readinessData.legal_ready },
        { key: 'script_status', label: 'Script Status', icon: FileText, value: readinessData.script_status === 'final' },
        { key: 'budget_ready', label: 'Budget Ready', icon: DollarSign, value: readinessData.budget_ready },
        { key: 'rights_clearance', label: 'Rights Clearance', icon: Shield, value: readinessData.rights_clearance }
    ];

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (readinessData.risk_score / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Project Readiness</h3>
                    <p className="text-sm text-gray-400">Due Diligence Assessment</p>
                </div>
            </div>

            {/* Risk Score Gauge */}
            <div className="flex items-center justify-center mb-8">
                <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-white/10"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="64"
                            cy="64"
                            r="45"
                            fill="none"
                            strokeWidth="8"
                            strokeLinecap="round"
                            className={scoreColors.ring}
                            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-bold ${scoreColors.text}`}>{readinessData.risk_score}</span>
                        <span className="text-xs text-gray-500">/ 100</span>
                    </div>
                </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-6">
                {checklistItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.value ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                    <Icon className={`w-4 h-4 ${item.value ? 'text-green-400' : 'text-red-400'}`} />
                                </div>
                                <span className="text-sm text-white">{item.label}</span>
                            </div>
                            {item.value ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Script Status Detail */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase">Script Status</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${readinessData.script_status === 'final'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                        {readinessData.script_status}
                    </span>
                </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Last updated: {new Date(readinessData.last_updated).toLocaleDateString()}</span>
            </div>
        </motion.div>
    );
};

export default ReadinessPanel;

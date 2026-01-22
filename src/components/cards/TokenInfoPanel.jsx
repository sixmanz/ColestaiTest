import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Vote, Gift, AlertTriangle, Layers } from 'lucide-react';

/**
 * TokenInfoPanel - Displays token information and benefits
 * Uses data from tokenInfo.json mock structure
 */
const TokenInfoPanel = ({ tokenData }) => {
    if (!tokenData) return null;

    const tokenTypeColors = {
        investment: 'bg-colestia-purple/20 text-colestia-purple border-colestia-purple/30',
        utility: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        governance: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };

    const useCaseIcons = {
        'Revenue participation': Coins,
        'Governance voting on creative decisions': Vote
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-colestia-purple to-colestia-blue rounded-xl flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{tokenData.token_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${tokenTypeColors[tokenData.token_type] || tokenTypeColors.utility}`}>
                            {tokenData.token_type}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300 border border-white/10">
                            {tokenData.token_standard}
                        </span>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Use Cases</h4>
                <div className="space-y-2">
                    {tokenData.use_cases?.map((useCase, idx) => {
                        const Icon = useCaseIcons[useCase] || Layers;
                        return (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="w-8 h-8 bg-colestia-purple/20 rounded-lg flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-colestia-purple" />
                                </div>
                                <span className="text-sm text-white">{useCase}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Lifecycle */}
            <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Token Lifecycle</h4>
                <div className="flex items-center gap-2">
                    {tokenData.lifecycle?.map((stage, idx) => (
                        <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 bg-gradient-to-r from-colestia-purple/20 to-colestia-blue/20 text-white text-xs font-medium rounded-lg border border-white/10 capitalize">
                                {stage}
                            </span>
                            {idx < tokenData.lifecycle.length - 1 && (
                                <span className="text-gray-500">→</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Non-Financial Benefits */}
            <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Gift className="w-3 h-3" /> Non-Financial Benefits
                </h4>
                <div className="space-y-2">
                    {tokenData.non_financial_benefits?.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restriction Notes */}
            {tokenData.restriction_notes && (
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-200">{tokenData.restriction_notes}</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TokenInfoPanel;

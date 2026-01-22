import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Globe, Calendar, FileText } from 'lucide-react';

/**
 * ComplianceDisclaimer - Displays legal and regulatory information
 * Uses data from compliance.json mock structure
 */
const ComplianceDisclaimer = ({ complianceData }) => {
    if (!complianceData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Regulatory Compliance</h3>
                    <p className="text-sm text-gray-400">Platform Role: {complianceData.platform_role?.replace('_', ' ')}</p>
                </div>
            </div>

            {/* Not a Token Sale Warning */}
            {!complianceData.is_token_sale && (
                <div className="mb-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                        <div>
                            <h4 className="text-amber-300 font-bold">This is NOT a Token Sale</h4>
                            <p className="text-sm text-amber-200/80">Colestia provides information only and does not facilitate token sales.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Regulator Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 uppercase">Regulator</span>
                    </div>
                    <p className="text-white font-medium">{complianceData.regulator}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 uppercase">Jurisdiction</span>
                    </div>
                    <p className="text-white font-medium">{complianceData.jurisdiction}</p>
                </div>
            </div>

            {/* Disclaimer Text */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300 leading-relaxed">{complianceData.disclaimer_text}</p>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">
                        Last Legal Review: {new Date(complianceData.last_legal_review).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Policy {complianceData.policy_version}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ComplianceDisclaimer;

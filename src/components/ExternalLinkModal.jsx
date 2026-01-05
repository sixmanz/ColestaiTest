import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { ExternalLink, AlertTriangle } from 'lucide-react';

const ExternalLinkModal = ({ isOpen, onClose, destination, url }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                >
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="text-red-500 w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white mb-2">Leaving Colestia</h3>

                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        You are about to visit <strong>{destination}</strong>, a third-party ICO portal.
                        <br /><br />
                        Please note: Colestia is an educational showcase only. We do not handle token sales, KYC, or investments directly.
                    </p>

                    <div className="flex flex-col gap-3">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button variant="gold" className="w-full justify-center">
                                Proceed to Portal <ExternalLink size={16} />
                            </Button>
                        </a>
                        <button
                            onClick={onClose}
                            className="text-gray-500 text-sm hover:text-white transition-colors"
                        >
                            Cancel, stay here
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ExternalLinkModal;

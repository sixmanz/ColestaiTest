import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ExternalLinkModal = ({ isOpen, onClose, destination, url }) => {
    const { t } = useLanguage();

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

                    <h3 className="text-2xl font-display font-bold text-white mb-2">{t('modal_leaving_title')}</h3>

                    <p
                        className="text-gray-400 mb-6 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t('modal_leaving_desc').replace('{destination}', destination) }}
                    />

                    <p className="text-gray-500 mb-6 text-xs leading-relaxed border-t border-white/10 pt-4">
                        {t('modal_leaving_note')}
                    </p>

                    <div className="flex flex-col gap-3">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button variant="gold" className="w-full justify-center">
                                {t('btn_proceed')} <ExternalLink size={16} />
                            </Button>
                        </a>
                        <button
                            onClick={onClose}
                            className="text-gray-500 text-sm hover:text-white transition-colors"
                        >
                            {t('btn_cancel')}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ExternalLinkModal;

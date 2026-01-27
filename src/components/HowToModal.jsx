import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

const HowToModal = ({ isOpen, onClose, onShowAgainToggle }) => {
    const { t } = useLanguage();
    const [dontShowAgain, setDontShowAgain] = React.useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        if (onShowAgainToggle) {
            onShowAgainToggle(dontShowAgain);
        }
        onClose();
    };

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-[#0f1115] border border-white/10 rounded-3xl max-w-2xl w-full p-8 md:p-12 relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-colestia-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lightbulb className="text-colestia-purple" size={32} />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">{t('how_to_title')}</h2>
                        <div className="w-12 h-1 bg-colestia-purple mx-auto rounded-full" />
                    </div>

                    <div className="space-y-8">
                        {/* Steps... (same as before) */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-colestia-purple font-bold">1</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{t('how_to_step_1_title')}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t('how_to_step_1_desc')}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-colestia-purple font-bold">2</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{t('how_to_step_2_title')}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t('how_to_step_2_desc')}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-colestia-purple font-bold">3</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{t('how_to_step_3_title')}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t('how_to_step_3_desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                />
                                <div className="w-5 h-5 border-2 border-white/20 rounded group-hover:border-colestia-purple/50 peer-checked:bg-colestia-purple peer-checked:border-colestia-purple transition-all" />
                                <X className="absolute inset-0 m-auto text-white scale-0 peer-checked:scale-75 transition-transform" size={16} strokeWidth={4} />
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                {t('label_dont_show_again')}
                            </span>
                        </label>

                        <Button
                            variant="primary"
                            className="w-full md:w-auto px-12"
                            onClick={handleClose}
                        >
                            {t('btn_close')}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default HowToModal;

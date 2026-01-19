import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { BookOpen, ShieldAlert, Cpu } from 'lucide-react';
import Spotlight from '../components/Spotlight';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-28 pb-24 min-h-screen bg-black relative overflow-hidden">
            <InteractiveGrid />
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-colestia-purple/20 rounded-xl border border-colestia-purple/30 backdrop-blur-sm">
                            <BookOpen className="text-colestia-purple" size={28} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-balance">{t('edu_title')}</h1>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <p className="text-xl text-gray-300 leading-relaxed pl-4 border-l-4 border-colestia-purple">
                            {t('edu_intro')}
                        </p>
                    </div>
                </motion.div>

                {/* Section 1: Token Models */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 text-gradient-main">
                        <Cpu className="text-purple-400" />
                        {t('edu_model_title')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Spotlight className="h-full rounded-2xl" size={300}>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative group hover:border-colestia-purple/50 transition-colors">
                                <div className="absolute top-4 right-4 text-white/5 group-hover:text-colestia-purple/20 transition-colors">
                                    <Cpu size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{t('edu_token_utility')}</h3>
                                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                                    {t('edu_token_utility_desc')}
                                </p>
                            </div>
                        </Spotlight>

                        <Spotlight className="h-full rounded-2xl" size={300}>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative group hover:border-emerald-500/50 transition-colors">
                                <div className="absolute top-4 right-4 text-white/5 group-hover:text-emerald-500/20 transition-colors">
                                    <ShieldAlert size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{t('edu_token_asset')}</h3>
                                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                                    {t('edu_token_asset_desc')}
                                </p>
                            </div>
                        </Spotlight>
                    </div>
                </motion.section>

                {/* Section 2: Risk Disclosure */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <Spotlight className="rounded-3xl cursor-default" size={500}>
                        <div className="bg-gradient-to-br from-red-900/10 to-transparent border border-red-500/30 p-8 md:p-10 rounded-3xl relative overflow-hidden">
                            <div className="absolute -right-20 -bottom-20 text-red-500/5">
                                <ShieldAlert size={400} />
                            </div>

                            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3 relative z-10">
                                <ShieldAlert />
                                {t('edu_risk_title')}
                            </h2>

                            <ul className="space-y-4 text-gray-300 relative z-10">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span className="leading-relaxed">
                                        <strong className="text-white">{t('edu_risk_volatility')}:</strong> {t('edu_risk_volatility_desc')}
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span className="leading-relaxed">
                                        <strong className="text-white">{t('edu_risk_reg')}:</strong> {t('edu_risk_reg_desc')}
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span className="leading-relaxed">
                                        <strong className="text-white">{t('edu_risk_tech')}:</strong> {t('edu_risk_tech_desc')}
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span className="leading-relaxed">
                                        <strong className="text-white">{t('edu_risk_guarantee')}:</strong> {t('edu_risk_guarantee_desc')}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Spotlight>
                </motion.section>

                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-6">
                        {t('edu_cta_text')}
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="primary" onClick={() => window.location.href = '/products'}>
                            {t('edu_cta_btn')}
                        </Button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Education;

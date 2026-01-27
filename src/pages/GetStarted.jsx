import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Wallet, Globe, Heart, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const GetStarted = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[800px] bg-colestia-purple/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-colestia-blue/5 blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-colestia-purple/10 border border-colestia-purple/20 text-colestia-purple text-xs font-bold tracking-widest uppercase mb-4">
                        {t('get_started_badge')}
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
                        dangerouslySetInnerHTML={{ __html: t('get_started_title') }}
                    />
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {t('get_started_subtitle')}
                    </p>
                </motion.div>

                {/* Steps Timeline */}
                <div className="relative space-y-12 md:space-y-24 before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent before:hidden md:before:block">

                    {/* Step 1: Learn & Register (Privy) */}
                    <TimelineItem
                        step="01"
                        title={t('step_1_title')}
                        description={t('step_1_desc')}
                        icon={<Wallet size={24} />}
                        align="left"
                    >
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link to="/education" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                                <BookOpen size={16} /> {t('step_1_btn_vision')}
                            </Link>
                            <button onClick={() => window.open('https://privy.io', '_blank')} className="inline-flex items-center gap-2 px-4 py-2 bg-colestia-purple text-white rounded-lg text-sm font-medium hover:bg-[#4c1d95] transition-colors shadow-lg shadow-colestia-purple/20">
                                {t('step_1_btn_explore')} <ExternalLink size={16} />
                            </button>
                        </div>
                    </TimelineItem>

                    {/* Step 2: Connect Address & KYC */}
                    <TimelineItem
                        step="02"
                        title={t('step_2_title')}
                        description={t('step_2_desc')}
                        icon={<CheckCircle size={24} />}
                        align="right"
                    >
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('step_2_card_title')}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg mb-3 mt-2">
                                <code className="text-xs text-colestia-purple flex-1 overflow-hidden text-ellipsis">0x71C...9A23</code>
                                <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors" title="Copy Address">
                                    <Copy size={14} className="text-gray-400" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400">{t('step_2_card_desc')}</p>
                            <button onClick={() => window.open('https://portal.colestia.com', '_blank')} className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition-colors border border-white/5">
                                {t('step_2_btn_register')}
                            </button>
                        </div>
                    </TimelineItem>

                    {/* Step 3: Buy Tokens (Base Network) */}
                    <TimelineItem
                        step="03"
                        title={t('step_3_title')}
                        description={t('step_3_desc')}
                        icon={<Globe size={24} />}
                        align="left"
                    >
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#0052FF]/10 to-black border border-[#0052FF]/30 relative overflow-hidden">
                            {/* Base Network Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#0052FF] rounded text-[10px] font-bold text-white shadow-[0_0_10px_rgba(0,82,255,0.5)]">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                BASE NETWORK
                            </div>

                            <div className="flex items-center gap-3 mb-3 mt-1">
                                <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold">
                                    <span className="text-xs">ETH</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Purchase Token</h4>
                                    <p className="text-xs text-gray-400">Via Base Network</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-300 border-l-2 border-[#0052FF] pl-3 py-1 bg-[#0052FF]/5 rounded-r">
                                {t('step_3_desc')}
                            </p>
                        </div>
                    </TimelineItem>

                    {/* Step 4: Engagement */}
                    <TimelineItem
                        step="04"
                        title={t('step_4_title')}
                        description={t('step_4_desc')}
                        icon={<Heart size={24} />}
                        align="right"
                    >
                        <div className="mt-4">
                            <div className="aspect-video rounded-xl bg-cover bg-center overflow-hidden relative group cursor-pointer" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop)' }}>
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black to-transparent">
                                    <span className="text-white font-bold text-sm">{t('step_4_welcome')}</span>
                                </div>
                            </div>
                        </div>
                    </TimelineItem>

                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">{t('get_started_ready')}</h2>
                    <Link to="/products">
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                            {t('btn_browse_all')}
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

// Start Now / Get Started Component Helper
const TimelineItem = ({ step, title, description, icon, align, children }) => {
    const isLeft = align === 'left';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex items-center md:justify-between ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Center Line Dot */}
            <div className="absolute left-0 md:left-1/2 w-10 h-10 -ml-5 md:-ml-5 flex items-center justify-center z-10 hidden md:flex">
                <div className="w-4 h-4 rounded-full bg-colestia-purple border-4 border-[#0a0a0a] shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
            </div>

            {/* Mobile Line Dot */}
            <div className="absolute left-0 top-0 w-full h-full border-l-2 border-white/10 md:hidden ml-5" />
            <div className="absolute left-0 top-8 w-10 h-10 flex items-center justify-center md:hidden">
                <div className="w-3 h-3 rounded-full bg-colestia-purple border-2 border-[#0a0a0a]" />
            </div>


            {/* Content Box */}
            <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 text-colestia-purple shadow-lg backdrop-blur-sm">
                        {icon}
                    </div>
                    <span className="text-6xl font-black text-white/5 absolute -mt-4 select-none opacity-50 z-0">{step}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4 relative z-10">
                        {description}
                    </p>
                    <div className="relative z-10 w-full">
                        {children}
                    </div>
                </div>
            </div>

            {/* Empty space for the other side */}
            <div className="hidden md:block w-[45%]" />
        </motion.div>
    );
};

export default GetStarted;

import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamData';
import { partners } from '../data/partnerData';
import Card3D from '../components/Card3D';

import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';



const AboutUs = () => {
    const { t, language } = useLanguage();

    return (
        <div className="pt-20 pb-16 md:pt-28 md:pb-24 bg-[#050505] min-h-screen relative overflow-hidden">
            <InteractiveGrid />

            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-colestia-purple/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">


                {/* Mission & Vision Section - Structured Editorial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 md:mb-40 max-w-7xl mx-auto" // Wider container for editorial feel
                >
                    {/* Slogan - Sharp & High Contrast */}
                    <div className="py-12 md:py-32 mb-12 md:mb-32 text-center relative border-b border-white/5">
                        <h2 className="relative z-10 text-4xl md:text-9xl font-display font-bold tracking-tighter mb-6 md:mb-8 text-white leading-[0.9]">
                            colestia
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
                            <p className="text-xl md:text-3xl text-white font-light italic tracking-wide">
                                {t('about_slogan_en')}
                            </p>
                            <span className="hidden md:block w-px h-8 bg-gray-600"></span>
                            <p className="text-base md:text-lg text-gray-500 font-light tracking-widest uppercase">
                                {t('about_slogan_th')}
                            </p>
                        </div>
                    </div>

                    {/* Mission Statement - Centered Editorial */}
                    <div className="max-w-4xl mx-auto text-center mb-16 md:mb-40">
                        <div className="w-px h-12 md:h-24 bg-gradient-to-b from-transparent via-colestia-purple to-transparent mx-auto mb-6 md:mb-12" />
                        <h1 className="text-xl md:text-4xl font-light text-white leading-relaxed mb-8 md:mb-12">
                            <span className="font-bold block mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-colestia-purple to-colestia-blue">
                                {t('about_mission_title')}
                            </span>
                            {t('about_mission_title_break')}
                        </h1>
                        <p className="text-base md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                            {t('about_mission_desc')}
                        </p>
                    </div>

                    {/* Origin Story - Grid Layout with Divider */}
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-32 pt-8 md:pt-12 border-t border-white/10 items-start">
                        <div className="md:col-span-4">
                            <h3 className="text-sm font-bold text-colestia-purple tracking-widest uppercase mb-4">{t('about_header_origin')}</h3>
                            <h2 className="text-3xl md:text-4xl text-white font-display font-medium">{t('about_origin_title')}</h2>
                        </div>
                        <div className="md:col-span-8 grid md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h4 className="text-lg text-white font-medium mb-4">{t('about_origin_subtitle')}</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    {t('about_origin_text')}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg text-white font-medium mb-4">{t('about_possibility_subtitle')}</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    {t('about_possibility_text')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Roles: Creator vs Supporter - Clean Grid (No Numbers) */}
                    <div className="grid md:grid-cols-2 gap-px bg-white/5"> {/* Gap for Divider Line */}
                        {/* Creator Side */}
                        <div className="bg-[#050505] p-6 md:p-16 relative group hover:bg-white/[0.02] transition-colors duration-500">

                            <div className="relative z-10">
                                <h3 className="text-sm font-bold text-colestia-purple tracking-widest uppercase mb-4">{t('about_header_creator')}</h3>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{t('about_creator_title')}</h2>
                                <p className="text-xl text-gray-400 italic mb-8 md:mb-12 font-light">"{t('about_creator_quote')}"</p>

                                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                                    {t('about_creator_desc')}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-white/60">
                                    <div className="w-8 h-px bg-colestia-purple"></div>
                                    {t('about_creator_note')}
                                </div>
                            </div>
                        </div>

                        {/* Supporter Side */}
                        <div className="bg-[#050505] p-6 md:p-16 relative group hover:bg-white/[0.02] transition-colors duration-500">

                            <div className="relative z-10">
                                <h3 className="text-sm font-bold text-colestia-blue tracking-widest uppercase mb-4">{t('about_header_supporter')}</h3>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{t('about_supporter_title')}</h2>
                                <p className="text-xl text-gray-400 italic mb-8 md:mb-12 font-light">"{t('about_supporter_quote')}"</p>

                                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                                    {t('about_supporter_desc')}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-white/60">
                                    <div className="w-8 h-px bg-colestia-blue"></div>
                                    {t('about_supporter_note')}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Our Partner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">
                            {t('our_partners')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-colestia-purple to-transparent mx-auto rounded-full mb-6" />
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            "{t('partners_desc')}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl p-6 h-40 md:h-48 flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 transform group-hover:-translate-y-2 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white opacity-100 transition-opacity" />
                                    <img
                                        src={partner.logo}
                                        alt={language === 'th' ? partner.nameTh : partner.name}
                                        className="relative z-10 max-h-24 md:max-h-28 max-w-full object-contain transition-all duration-500 transform group-hover:scale-110"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Our Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-white mb-4">
                            {t('our_team')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-colestia-blue to-transparent mx-auto rounded-full" />
                    </div>

                    {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible scrollbar-hide">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="group relative min-w-[280px] sm:min-w-[320px] w-[85%] md:w-auto snap-center mr-4 md:mr-0 flex-shrink-0"
                            >
                                {/* Card Container */}
                                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-0 md:mb-6 border border-white/10 group-hover:border-colestia-blue/50 transition-all duration-500 shadow-xl md:shadow-2xl">
                                    <div className="absolute inset-0 bg-colestia-blue/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                    <img
                                        src={member.image}
                                        alt={language === 'th' ? member.nameTh : member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient for text readability */}
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-colestia-blue transition-colors drop-shadow-lg">
                                            {language === 'th' ? member.nameTh : member.name}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                                            {language === 'th' ? member.roleTh : member.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;

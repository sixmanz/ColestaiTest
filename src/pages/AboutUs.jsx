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
        <div className="pt-28 pb-24 bg-[#050505] min-h-screen relative overflow-hidden">
            <InteractiveGrid />

            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-colestia-purple/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">


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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="group relative"
                            >
                                {/* Card Container */}
                                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6 border border-white/10 group-hover:border-colestia-blue/50 transition-all duration-500 shadow-2xl">
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

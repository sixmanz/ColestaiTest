import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamData';
import { useLanguage } from '../context/LanguageContext';



const Team = () => {
    const { t, language } = useLanguage();
    return (
        <div className="pt-28 pb-24 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-4xl font-display font-bold text-white mb-4">
                        {t('section_our_team').split(' ')[0]} <span className="text-gradient-main">{t('section_our_team').split(' ').slice(1).join(' ')}</span>
                    </h1>
                    {/*<p className="text-gray-400 max-w-2xl mx-auto">
                        Visionary leaders driving innovation in film and blockchain technology.
                    </p>*/}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="text-center group"
                        >
                            <div className="relative mb-6 overflow-hidden rounded-lg aspect-[3/4]  group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Gradient Overlay typical of the Design Image style */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-80" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-colestia-purple transition-colors">
                                {language === 'th' ? member.nameTh : member.name}
                            </h3>
                            <p className="text-xs text-gray-400 tracking-wider uppercase">
                                {language === 'th' ? member.roleTh : member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;

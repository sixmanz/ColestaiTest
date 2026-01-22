import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { Film, TrendingUp, Users, Globe, Video, Clapperboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        { icon: <TrendingUp size={32} />, titleKey: "service_1_title", descKey: "service_1_desc" },
        { icon: <Film size={32} />, titleKey: "service_2_title", descKey: "service_2_desc" },
        { icon: <Globe size={32} />, titleKey: "service_3_title", descKey: "service_3_desc" },
        { icon: <Users size={32} />, titleKey: "service_4_title", descKey: "service_4_desc" },
        { icon: <Video size={32} />, titleKey: "service_5_title", descKey: "service_5_desc" },
        { icon: <Clapperboard size={32} />, titleKey: "service_6_title", descKey: "service_6_desc" }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{t('title_our_services')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('desc_our_services')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Spotlight className="h-full rounded-2xl" size={200}>
                                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl h-full hover:border-colestia-blue/50 transition-colors group">
                                    <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-colestia-blue mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {t(service.titleKey)}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {t(service.descKey)}
                                    </p>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

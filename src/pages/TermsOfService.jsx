import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';

const TermsOfService = () => {
    const { t } = useLanguage();
    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{t('terms_title')}</h1>
                    <p className="text-gray-400">{t('terms_last_updated')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg max-w-none text-gray-300"
                >
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('terms_1_title')}</h2>
                        <p>
                            {t('terms_1_content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('terms_2_title')}</h2>
                        <p>
                            {t('terms_2_content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('terms_3_title')}</h2>
                        <p>
                            {t('terms_3_content_intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>{t('terms_3_list_1')}</li>
                            <li>{t('terms_3_list_2')}</li>
                            <li>{t('terms_3_list_3')}</li>
                            <li>{t('terms_3_list_4')}</li>
                            <li>{t('terms_3_list_5')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('terms_4_title')}</h2>
                        <p>
                            {t('terms_4_content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('terms_5_title')}</h2>
                        <p>
                            {t('terms_5_content')}
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;

import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicy = () => {
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
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{t('privacy_title')}</h1>
                    <p className="text-gray-400">{t('privacy_last_updated')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg max-w-none text-gray-300"
                >
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_1_title')}</h2>
                        <p>
                            {t('privacy_1_content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_2_title')}</h2>
                        <p>
                            {t('privacy_2_content_intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li dangerouslySetInnerHTML={{ __html: t('privacy_2_list_1') }}></li>
                            <li dangerouslySetInnerHTML={{ __html: t('privacy_2_list_2') }}></li>
                            <li dangerouslySetInnerHTML={{ __html: t('privacy_2_list_3') }}></li>
                            <li dangerouslySetInnerHTML={{ __html: t('privacy_2_list_4') }}></li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_3_title')}</h2>
                        <p>
                            {t('privacy_3_content_intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>{t('privacy_3_list_1')}</li>
                            <li>{t('privacy_3_list_2')}</li>
                            <li>{t('privacy_3_list_3')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_4_title')}</h2>
                        <p>
                            {t('privacy_4_content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_5_title')}</h2>
                        <p>
                            {t('privacy_5_content')}
                            <br />
                            <span className="text-colestia-purple">support@colestia.io</span>
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

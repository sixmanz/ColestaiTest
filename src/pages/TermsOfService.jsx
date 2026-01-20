import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';

const TermsOfService = () => {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Terms of Service</h1>
                    <p className="text-gray-400">Last updated: January 20, 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg max-w-none text-gray-300"
                >
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p>
                            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                            If you do not agree with these terms, you are prohibited from using or accessing this site or using any other services provided by Colestia.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
                        <p>
                            Other than the content you own, under these Terms, Colestia and/or its licensors own all the intellectual property rights and materials contained in this Website.
                            You are granted limited license only for purposes of viewing the material contained on this Website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Restrictions</h2>
                        <p>
                            You are specifically restricted from all of the following:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Publishing any Website material in any other media;</li>
                            <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                            <li>Publicly performing and/or showing any Website material;</li>
                            <li>Using this Website in any way that is or may be damaging to this Website;</li>
                            <li>Using this Website in any way that impacts user access to this Website;</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            In no event shall Colestia, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
                            Colestia, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law & Jurisdiction</h2>
                        <p>
                            These Terms will be governed by and interpreted in accordance with the laws of the Kingdom of Thailand, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Thailand for the resolution of any disputes.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;

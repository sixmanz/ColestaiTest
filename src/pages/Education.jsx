import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button'; // Assuming Button component exists or similar
import { BookOpen, ShieldAlert, Cpu } from 'lucide-react'; // Example icons

const Education = () => {
    return (
        <div className="pt-28 pb-24 min-h-screen bg-colestia-bg text-colestia-text-primary">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-colestia-purple/10 rounded-lg">
                            <BookOpen className="text-colestia-purple" size={24} />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-white">Investor Education Center</h1>
                    </div>

                    <p className="text-xl text-gray-400 leading-relaxed border-l-4 border-colestia-purple pl-6">
                        Colestia is committed to transparency. Before engaging with any project, it is crucial to understand the underlying token models and associated risks.
                    </p>
                </motion.div>

                {/* Section 1: Token Models */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Cpu className="text-purple-400" />
                        Understanding Token Models
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-2">Utility Tokens</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Tokens that provide access to a product or service. They are not investments but rather keys to the ecosystem functionality.
                            </p>
                        </div>

                        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-2">asset-Backed Tokens</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Tokens representing ownership or rights to physical or digital assets (e.g., Real Estate, Copyrights).
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 2: Risk Disclosure */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12 bg-red-900/10 border border-red-500/20 p-8 rounded-2xl"
                >
                    <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-3">
                        <ShieldAlert />
                        Risk Disclosure
                    </h2>

                    <ul className="space-y-4 text-gray-300 list-disc pl-5">
                        <li>
                            <strong>Volatility:</strong> Digital assets are highly volatile. You should never invest more than you can afford to lose.
                        </li>
                        <li>
                            <strong>Regulatory Uncertainty:</strong> The legal framework for digital assets is evolving and varies by jurisdiction.
                        </li>
                        <li>
                            <strong>Technology Risks:</strong> Smart contracts and blockchain technology may have unforeseen vulnerabilities.
                        </li>
                        <li>
                            <strong>No Guarantees:</strong> Past performance of a project is not indicative of future results.
                        </li>
                    </ul>
                </motion.section>

                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">
                        Ready to explore vetted projects with this knowledge?
                    </p>
                    <Button variant="primary" onClick={() => window.location.href = '/products'}>
                        View Project Showcase
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Education;

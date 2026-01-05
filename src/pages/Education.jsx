import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { BookOpen, ShieldAlert, Cpu } from 'lucide-react';
import Spotlight from '../components/Spotlight';
import InteractiveGrid from '../components/InteractiveGrid';

const Education = () => {
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
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Investor Education</h1>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <p className="text-xl text-gray-300 leading-relaxed pl-4 border-l-4 border-colestia-purple">
                            Colestia is committed to transparency. Before engaging with any project, it is crucial to understand the underlying token models and associated risks.
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
                        Understanding Token Models
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Spotlight className="h-full rounded-2xl" size={300}>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative group hover:border-colestia-purple/50 transition-colors">
                                <div className="absolute top-4 right-4 text-white/5 group-hover:text-colestia-purple/20 transition-colors">
                                    <Cpu size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Utility Tokens</h3>
                                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                                    Tokens that provide access to a product or service. They are not investments but rather keys to the ecosystem functionality.
                                </p>
                            </div>
                        </Spotlight>

                        <Spotlight className="h-full rounded-2xl" size={300}>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative group hover:border-emerald-500/50 transition-colors">
                                <div className="absolute top-4 right-4 text-white/5 group-hover:text-emerald-500/20 transition-colors">
                                    <ShieldAlert size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Asset-Backed Tokens</h3>
                                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                                    Tokens representing ownership or rights to physical or digital assets (e.g., Real Estate, Copyrights).
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
                                Risk Disclosure
                            </h2>

                            <ul className="space-y-4 text-gray-300 relative z-10">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Volatility:</strong> Digital assets are highly volatile. You should never invest more than you can afford to lose.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Regulatory Uncertainty:</strong> The legal framework for digital assets is evolving and varies by jurisdiction.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Technology Risks:</strong> Smart contracts and blockchain technology may have unforeseen vulnerabilities.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">No Guarantees:</strong> Past performance of a project is not indicative of future results.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Spotlight>
                </motion.section>

                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-6">
                        Ready to explore vetted projects with this knowledge?
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="primary" onClick={() => window.location.href = '/products'}>
                            View Project Showcase
                        </Button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Education;

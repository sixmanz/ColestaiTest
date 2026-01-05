import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamData';
import { partners } from '../data/partnerData';



const AboutUs = () => {
    return (
        <div className="pt-28 pb-24 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-4xl font-display font-bold text-white mb-4">
                        About <span className="text-gradient-main">Us</span>
                    </h1>
                </motion.div>

                {/* Our Partner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-3xl md:text-3xl font-display font-bold text-white mb-4 text-center">
                        Our <span className="text-gradient-main">Partners</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
                        "Partners shaping the future of the media and blockchain technology industries."
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                    <h2 className="text-3xl md:text-3xl font-display font-bold text-white mb-12 text-center">
                        Our <span className="text-gradient-main">Team</span>
                    </h2>

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
                                    {member.name}
                                </h3>
                                <p className="text-xs text-gray-400 tracking-wider uppercase">
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;

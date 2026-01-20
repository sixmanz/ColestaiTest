import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: t('nav_home'), path: '/' },
        { name: t('nav_projects'), path: '/products' },
        { name: t('nav_about'), path: '/about-us' },
        { name: t('nav_news'), path: '/news' },
        { name: t('nav_education'), path: '/education' },
        { name: t('nav_contact'), path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-colestia-bg/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-end items-center relative">
                {/* Logo - Absolute Top Left */}
                <Link to="/" className="absolute left-6 top-1/2 -translate-y-1/2 z-50">
                    <div className="h-14 w-48 overflow-hidden">
                        <img
                            src={logo}
                            alt="Colestia"
                            className="h-[200px] w-auto object-cover object-left"
                            style={{ marginTop: '-75px', marginLeft: '-10px' }}
                        />
                    </div>
                </Link>

                {/* Desktop Links - Hidden on Mobile & Tablet, Visible on Laptop+ */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Magnetic key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-lg tracking-wide transition-all duration-300 relative group block px-2 py-1 ${isActive
                                        ? 'text-colestia-purple'
                                        : 'text-white-300 hover:text-white'
                                    }`
                                }
                            >
                                {link.name}
                                {/* Hover underline effect */}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-colestia-purple to-colestia-magenta group-hover:w-full transition-all duration-300" />
                            </NavLink>
                        </Magnetic>
                    ))}

                    {/* Language Toggle*/}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-colestia-purple/50 hover:bg-white/5 transition-all duration-300 group"
                    >
                        <Globe size={16} className="text-gray-400 group-hover:text-colestia-purple transition-colors" />
                        <span className="text-sm font-medium text-white">
                            {language === 'th' ? 'TH' : 'EN'}
                        </span>
                    </button>

                    {/* Join Now Button */}
                    <Link to="/login" className="text-lg bg-gradient-to-r from-colestia-purple to-colestia-magenta text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(122,30,166,0.5)] transition-all duration-300 hover:scale-105">
                        {t('nav_join')}
                    </Link>
                </div>

                {/* Mobile/Tablet Toggle */}
                <button
                    className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="lg:hidden fixed top-0 left-0 w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center gap-6 z-40"
                    >
                        {/* Background Gradient Blob */}
                        <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-colestia-purple/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-colestia-blue/20 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex flex-col items-center gap-6 mt-12 relative z-10 w-full px-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-3xl font-display font-bold text-white hover:text-colestia-purple transition-colors tracking-tight"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Language Toggle - Mobile */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            onClick={toggleLanguage}
                            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-colestia-purple/50 bg-white/5 backdrop-blur-sm transition-all duration-300 mt-4 relative z-10"
                        >
                            <Globe size={20} className="text-colestia-purple" />
                            <span className="text-lg font-medium text-white">
                                {language === 'th' ? 'Thai (TH)' : 'English (EN)'}
                            </span>
                        </motion.button>

                        {/* Join Now Button - Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full px-6 relative z-10"
                        >
                            <Link
                                to="/login"
                                className="block w-full text-center bg-gradient-to-r from-colestia-purple to-colestia-blue text-white py-4 rounded-xl text-xl font-bold font-display shadow-[0_0_30px_rgba(149,1,255,0.3)] hover:shadow-[0_0_40px_rgba(149,1,255,0.5)] transition-all duration-300 active:scale-95"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('nav_join')}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};


export default Navbar;

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

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
        {/* name: t('nav_contact'), path: '/contact' */ },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-colestia-bg/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-display font-bold text-white tracking-widest flex items-center gap-2">
                    <div className="w-8 h-8 bg-colestia-purple/20 rounded-full flex items-center justify-center border border-colestia-purple">
                        <span className="text-colestia-purple text-xs">C</span>
                    </div>
                    <span className="text-white">
                        colestia
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-lg tracking-wide transition-all duration-300 relative group ${isActive
                                    ? 'text-colestia-purple'
                                    : 'text-white-300 hover:text-white hover:scale-105'
                                }`
                            }
                        >
                            {link.name}
                            {/* Hover underline effect */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-colestia-purple to-colestia-magenta group-hover:w-full transition-all duration-300" />
                        </NavLink>
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

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-colestia-bg absolute top-full left-0 w-full overflow-hidden flex flex-col items-center pt-20 gap-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-2xl font-display text-white hover:text-colestia-purple"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Language Toggle - Mobile */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 hover:border-colestia-purple/50 transition-all duration-300"
                        >
                            <Globe size={20} className="text-colestia-purple" />
                            <span className="text-lg font-medium text-white">
                                {language === 'th' ? 'ไทย' : 'English'}
                            </span>
                        </button>

                        {/* Join Now Button - Mobile */}
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-colestia-purple to-colestia-magenta text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-[0_0_20px_rgba(122,30,166,0.5)] transition-all duration-300 mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav_join')}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

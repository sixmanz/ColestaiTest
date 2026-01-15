import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="block relative h-24 w-64 overflow-hidden">
                            <img src={logo} alt="Colestia" className="absolute -top-[160px] -left-10 h-[400px] w-auto max-w-none" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t('footer_tagline')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">{t('footer_platform')}</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/products" className="hover:text-colestia-gold transition-colors">{t('nav_projects')}</Link></li>
                            <li><Link to="/education" className="hover:text-colestia-gold transition-colors">{t('nav_education')}</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6">{t('footer_legal')}</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/privacy" className="hover:text-colestia-gold transition-colors">{t('footer_privacy')}</Link></li>
                            <li><Link to="/terms" className="hover:text-colestia-gold transition-colors">{t('footer_terms')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">{t('footer_contact')}</h4>
                        <p className="text-gray-400 text-sm">support@colestia.io</p>
                        <p className="text-gray-400 text-sm mt-2">Bangkok, Thailand</p>

                        {/* Social Media Links */}
                        <div className="mt-6">
                            <p className="text-white text-sm font-semibold mb-3">{t('footer_follow')}</p>
                            <div className="flex gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-colestia-purple/30 border border-white/20 hover:border-colestia-purple flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-colestia-purple/30 border border-white/20 hover:border-colestia-purple flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="X (Twitter)"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-colestia-purple/30 border border-white/20 hover:border-colestia-purple flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="YouTube"
                                >
                                    <Youtube size={18} />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-colestia-purple/30 border border-white/20 hover:border-colestia-purple flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a
                                    href="https://tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-colestia-purple/30 border border-white/20 hover:border-colestia-purple flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="TikTok"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">
                        {t('footer_rights').replace('{year}', new Date().getFullYear())}
                    </p>
                    <div className="flex gap-4 items-center">
                        <Link to="/admin" className="text-gray-800 hover:text-colestia-gold transition-colors" aria-label="Admin Access">
                            <Lock size={14} />
                        </Link>
                        <p className="text-xs text-gray-600 text-center md:text-right max-w-lg">
                            {t('footer_disclaimer')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

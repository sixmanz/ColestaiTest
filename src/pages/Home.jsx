import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import VideoBackground from '../components/VideoBackground';
import Button from '../components/Button';
import { ArrowRight, ArrowLeft, Globe, Shield, Zap, ChevronLeft, ChevronRight, X, Clapperboard, Lightbulb, Gift, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDirectors } from '../hooks/useDirectors';
import { useLanguage } from '../context/LanguageContext';

// Partner logos
import logoFlips from '../assets/partners/flips.png';
import logoFraction from '../assets/partners/fraction.jpg';
import logoCulture from '../assets/partners/culture.png';
import logoDIP from '../assets/partners/dip.png';
import logoMSU from '../assets/partners/msu.png';
import logoSEC from '../assets/partners/sec.png';
import { projects } from '../data/projectsData'; // Import projects data



import Spotlight from '../components/Spotlight';
import InteractiveGrid from '../components/InteractiveGrid';
import { ChevronDown } from 'lucide-react';

// BentoCard Component - Polished Minimal Design
const BentoCard = ({ title, description, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`
                relative overflow-hidden rounded-2xl p-8
                bg-gradient-to-br from-white/[0.05] to-transparent
                border border-white/10 hover:border-colestia-purple/40
                hover:bg-white/[0.08]
                transition-all duration-500
                group
                text-center flex flex-col items-center
                ${className}
            `}
        >
            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 leading-snug md:h-[3.5rem] flex items-center justify-center">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed text-sm transition-colors duration-300">
                {description}
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-colestia-purple to-colestia-magenta group-hover:w-full transition-all duration-500" />
        </motion.div>
    );
};

const Home = () => {
    const { t, language } = useLanguage();
    const directorsScrollRef = useRef(null);
    const moviesScrollRef = useRef(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const { directors } = useDirectors();

    const scrollContainer = (ref, direction) => {
        if (ref.current) {
            const containerWidth = ref.current.clientWidth;
            ref.current.scrollBy({
                left: direction === 'left' ? -containerWidth : containerWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollDirectors = (direction) => scrollContainer(directorsScrollRef, direction);
    const scrollMovies = (direction) => scrollContainer(moviesScrollRef, direction);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="w-full">
            {/* 1. Hero Section "Dream Crafted" */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <VideoBackground />
                <InteractiveGrid />

                <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >


                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-2 md:mb-6 leading-tight tracking-tight">
                            colestia
                        </h1>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
                            <span className="text-gradient-main">{t('hero_dream_crafted')}</span>
                        </h2>

                        <p
                            className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0"
                            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 5)' }}
                        >
                            {t('hero_tagline')}

                            <br /><span className="text-white/100 text-sm md:text-md mt-2 block">{t('hero_subtagline')}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-6 md:px-0">
                            <Link to="/products" className="w-full sm:w-auto">
                                <Button variant="primary" className="w-full sm:w-auto py-3 md:py-4 text-sm md:text-base">
                                    {t('hero_explore')} <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link to="/education" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto py-3 md:py-4 text-sm md:text-base">
                                    {t('hero_education')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-5 h-9 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                        <div className="w-1 h-1.5 md:h-2 bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* 2. "We are colestia" Section - Polished Minimal */}
            <section className="py-16 md:py-24 lg:py-28 bg-colestia-bg">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16 lg:mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
                            {t('home_we_are_title')} <span className="text-gradient-main">colestia</span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                            {t('home_we_are_quote')}
                        </p>
                    </motion.div>

                    {/* Grid (Numbers Removed) */}
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-0">
                        <BentoCard
                            title={t('home_we_are_subtitle_1')}
                            description={t('home_we_are_desc_1')}
                            className="p-6 md:p-8"
                        />

                        <BentoCard
                            title={t('home_we_are_subtitle_2')}
                            description={t('home_we_are_desc_2')}
                            className="p-6 md:p-8"
                        />

                        <BentoCard
                            title={t('home_we_are_subtitle_3')}
                            description={t('home_we_are_desc_3')}
                            className="p-6 md:p-8"
                        />
                    </div>
                </div>
            </section>

            {/* 3. "Creative Idea" Section - Refined Premium Design */}
            <section className="py-24 md:py-32 bg-colestia-bg relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-colestia-purple/5 rounded-full blur-[128px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Image Left - Premium Frame */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="md:col-span-6 relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-tr from-colestia-purple to-colestia-blue opacity-30 rounded-2xl blur-lg group-hover:opacity-50 transition-opacity duration-700"></div>
                            <div className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop"
                                    alt="Filmmaking"
                                    className="w-full h-full object-cover transition-transform duration-1000 transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                            </div>
                        </motion.div>

                        {/* Text Right - Editorial Layout */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="md:col-span-6 flex flex-col justify-center"
                        >
                            <div className="mb-8 md:mb-12">
                                <h2 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] tracking-tight mb-6">
                                    <span className="text-colestia-purple block mb-2">colestia</span>
                                    <span className="text-white block">
                                        {t('home_creative_title_creative')} <span className="italic font-light text-[#FFD700] ml-2">{t('home_creative_title_idea')}</span>
                                    </span>
                                    <span className="text-white/40 block mt-2 text-2xl md:text-4xl font-light tracking-wide">
                                        {t('home_creative_title_2')} {t('home_creative_title_3')}
                                    </span>
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-colestia-purple to-transparent rounded-full opacity-50"></div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl md:text-3xl text-white font-medium leading-snug mb-4">
                                        <span className="text-colestia-purple">colestia</span> {t('home_creative_subtitle_1')}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
                                        <span className="text-white font-medium">colestia</span> {t('home_creative_desc_1')}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    {t('home_creative_desc_2')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3.5 Popular Projects Section */}
            <section className="py-16 md:py-24 bg-[#050505] relative cursor-default">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                                {t('section_popular')} <span className="text-colestia-purple">{t('nav_projects')}</span>
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base max-w-xl">
                                {t('products_subtitle')}
                            </p>
                        </div>
                        <Link to="/products">
                            <Button variant="outline" className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
                                {t('see_more')} <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </motion.div>

                    <div className="relative group/carousel">
                        {/* Navigation Arrows */}
                        <button
                            onClick={() => scrollMovies('left')}
                            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-colestia-purple/80 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100 hidden md:block"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div
                            ref={moviesScrollRef}
                            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {projects
                                .sort((a, b) => b.percentage - a.percentage)
                                .map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex-shrink-0 w-[240px] md:w-[280px] snap-start"
                                    >
                                        <div className="group relative rounded-2xl overflow-hidden aspect-[2/3] border border-white/10 hover:border-colestia-purple/50 transition-colors duration-500 shadow-lg">
                                            {/* Poster Image */}
                                            <img
                                                src={project.poster}
                                                alt={project.titleEn}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                {/* Genre Badge */}
                                                <span className="inline-block px-2 py-0.5 bg-colestia-purple/20 text-colestia-magenta text-[10px] font-bold uppercase tracking-wider rounded-full mb-2 backdrop-blur-sm border border-colestia-purple/30">
                                                    {project.genre}
                                                </span>

                                                <h3 className="text-lg font-bold text-white leading-tight mb-1 truncate">
                                                    {language === 'th' ? project.titleTh : project.titleEn}
                                                </h3>

                                                {/* Funding Info */}
                                                <div className="space-y-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-colestia-purple to-colestia-blue"
                                                            style={{ width: `${Math.min(project.percentage, 100)}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-[10px] font-medium text-white/80">
                                                        <span>{project.percentage}% {t('admin_projects_funded')}</span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <Link to={`/project/${project.id}`} className="flex-1">
                                                        <button className="w-full py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-all">
                                                            {t('btn_view_details_short') || t('btn_view_details')}
                                                        </button>
                                                    </Link>
                                                    <Link to={`/project/${project.id}`} className="flex-1">
                                                        <button className="w-full py-2 bg-colestia-purple text-white text-xs font-bold rounded-lg hover:bg-colestia-purple/80 transition-all">
                                                            {t('btn_invest')}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>

                        <button
                            onClick={() => scrollMovies('right')}
                            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-colestia-purple/80 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100 hidden md:block"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="mt-8 md:hidden text-center">
                        <Link to="/products">
                            <Button variant="outline" className="w-full">
                                {t('see_more')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. Feature Highlights Section */}
            <section className="py-16 md:py-24 bg-colestia-bg text-white">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-5xl font-display font-bold text-white">
                            {t('home_exclusive_for')} <span className="text-gradient-main">colestian</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-0 md:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/20 border-t border-b border-white/10 sm:border-none py-8 sm:py-0">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center text-center px-4 py-4 md:px-6 md:py-8 group cursor-default"
                        >
                            <Clapperboard size={48} className="text-white mb-4 md:mb-6 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" strokeWidth={1.5} />
                            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4 h-auto md:h-12 flex items-start justify-center">{t('feature_1_title')}</h3>
                            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                                {t('feature_1_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center px-4 py-4 md:px-6 md:py-8 group cursor-default"
                        >
                            <Lightbulb size={48} className="text-white mb-4 md:mb-6 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" strokeWidth={1.5} />
                            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4 h-auto md:h-12 flex items-start justify-center">{t('feature_2_title')}</h3>
                            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                                {t('feature_2_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center text-center px-4 py-4 md:px-6 md:py-8 group cursor-default"
                        >
                            <Gift size={48} className="text-white mb-4 md:mb-6 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" strokeWidth={1.5} />
                            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4 h-auto md:h-12 flex items-start justify-center">{t('feature_3_title')}</h3>
                            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                                {t('feature_3_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center text-center px-4 py-4 md:px-6 md:py-8 group cursor-default"
                        >
                            <Copyright size={48} className="text-white mb-4 md:mb-6 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" strokeWidth={1.5} />
                            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4 h-auto md:h-12 flex items-start justify-center">{t('feature_4_title')}</h3>
                            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                                {t('feature_4_desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* 4. Directors Section - Horizontal Carousel */}
            < section className="py-16 md:py-24 bg-colestia-bg overflow-hidden" >
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-5xl font-display font-bold text-white mb-4">
                            {t('creators_title')} <span className="text-gradient-main">{t('creators_span')}</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
                            {t('creators_desc')}
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Container - Full Width */}
                <div className="relative w-full">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollDirectors('left')}
                        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-10 bg-colestia-purple/20 hover:bg-colestia-purple/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hidden md:block"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Scrollable Directors Container */}
                    <div
                        ref={directorsScrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory w-full px-4 md:px-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {directors.map((director, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex-shrink-0 w-[240px] md:w-[350px] perspective-1000 snap-center py-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="h-full"
                                >
                                    <Spotlight className="h-full rounded-2xl" size={400}>
                                        <div className="relative bg-gradient-to-b from-[#1e3a5f] to-[#0f172a] rounded-2xl overflow-hidden border border-white/10 group-hover:border-colestia-purple/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)] h-full">
                                            <div className="flex flex-col h-full">
                                                {/* Photo Section */}
                                                <div className="relative w-full h-[320px] md:h-[450px] flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={director.img}
                                                        alt={director.name}
                                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    {/* Subtle overlay to blend light backgrounds without darkening too much */}
                                                    <div className="absolute inset-0 bg-[#0f172a]/20" />
                                                    {/* Gradient Overlay for text readability */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                                                </div>

                                                {/* Info Section */}
                                                <div className="flex-1 p-4 md:p-6 flex flex-col relative z-20 bg-transparent">
                                                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                                                        {director.name}
                                                    </h3>
                                                    <p className="text-blue-200 text-xs md:text-sm font-medium mb-4">{director.role}</p>

                                                    {/* View More Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDirector(director);
                                                        }}
                                                        className="mt-auto w-full py-2.5 md:py-3 bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-xl transition-all duration-300 text-xs md:text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                                    >
                                                        {t('see_more')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Spotlight>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollDirectors('right')}
                        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-10 bg-colestia-purple/20 hover:bg-colestia-purple/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hidden md:block"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="container mx-auto px-6">

                    {/* Scroll Hint for Mobile */}
                    <p className="text-center text-gray-500 text-xs mt-6 md:hidden">
                        {t('swipe_hint')}
                    </p>
                </div>
            </section >

            {/* Newsletter Subscription Section */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-colestia-bg to-colestia-bg">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-colestia-purple to-colestia-gold rounded-3xl p-8 md:p-16 text-center shadow-[0_20px_60px_rgba(149,1,255,0.4)]"
                    >
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
                            {t('newsletter_title')}
                        </h2>
                        <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                            {t('newsletter_desc')}
                        </p>

                        {/* Email Input Form */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder={t('newsletter_placeholder')}
                                className="flex-1 px-5 py-3 md:px-6 md:py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm md:text-base"
                            />
                            <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-colestia-purple rounded-full font-semibold hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 text-sm md:text-base">
                                {t('newsletter_btn')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Director Detail Modal */}
            {/* Director Detail Modal - Portal to escape PageTransition transform */}
            {
                selectedDirector && createPortal(
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedDirector(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="bg-[#0a0a0a] border border-colestia-purple/30 rounded-2xl max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden relative shadow-[0_20px_60px_rgba(122,30,166,0.4)] flex flex-col md:block"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedDirector(null)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-colestia-purple/20 hover:bg-colestia-purple/40 rounded-full transition-all duration-300 group"
                                    aria-label="Close modal"
                                >
                                    <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                                </button>

                                {/* Two Column Layout */}
                                <div className="grid md:grid-cols-2 gap-0 h-full overflow-hidden">
                                    {/* Left Column - Director Image */}
                                    <div className="relative h-[35vh] md:h-full overflow-hidden shrink-0">
                                        <img
                                            src={selectedDirector.img}
                                            alt={selectedDirector.name}
                                            className="w-full h-full object-contain md:object-cover object-top bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden" />
                                    </div>

                                    {/* Right Column - Content */}
                                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar h-full md:h-auto">
                                        {/* Name and Role */}
                                        <div className="mb-4 md:mb-6">
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                                {selectedDirector.name}
                                            </h2>
                                            <p className="text-colestia-magenta text-sm md:text-base font-medium">
                                                {selectedDirector.role}
                                            </p>
                                        </div>

                                        {/* Biography */}
                                        <div className="space-y-3 mb-6">
                                            <h3 className="text-base md:text-lg font-bold text-white border-l-4 border-colestia-purple pl-4">
                                                {t('director_bio')}
                                            </h3>
                                            <p
                                                className="text-gray-300 leading-relaxed text-sm md:text-base max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                                                dangerouslySetInnerHTML={{ __html: language === 'th' ? selectedDirector.bio : selectedDirector.bioEn }}
                                            />
                                        </div>

                                        {/* Recent Works */}
                                        <div className="space-y-3">
                                            <h3 className="text-base md:text-lg font-bold text-white border-l-4 border-colestia-purple pl-4">
                                                {t('director_works')}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed italic text-sm md:text-base">
                                                {language === 'th' ? selectedDirector.works : selectedDirector.worksEn}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>,
                    document.body
                )
            }
        </div >

    );
};

export default Home;
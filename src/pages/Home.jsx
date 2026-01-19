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
                ${className}
            `}
        >
            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 leading-snug pr-4">
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
    const [selectedDirector, setSelectedDirector] = useState(null);
    const { directors } = useDirectors();

    const scrollDirectors = (direction) => {
        if (directorsScrollRef.current) {
            // Scroll by container width (shows next set of cards)
            const containerWidth = directorsScrollRef.current.clientWidth;
            directorsScrollRef.current.scrollBy({
                left: direction === 'left' ? -containerWidth : containerWidth,
                behavior: 'smooth'
            });
        }
    };

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="w-full">
            {/* 1. Hero Section "Dream Crafted" */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <VideoBackground />
                <InteractiveGrid />

                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >


                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
                            colestia
                        </h1>
                        <h2 className="text-3xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
                            <span className="text-gradient-main">{t('hero_dream_crafted')}</span>
                        </h2>

                        <p
                            className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0"
                            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 5)' }}
                        >
                            {t('hero_tagline')}

                            <br /><span className="text-white/100 text-md">{t('hero_subtagline')}</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center px-6 md:px-0">
                            <Link to="/products">
                                <Button variant="primary" className="w-full md:w-auto">
                                    {t('hero_explore')} <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link to="/education">
                                <Button variant="outline" className="w-full md:w-auto">
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
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* 2. "We are colestia" Section - Polished Minimal */}
            <section className="py-12 md:py-20 lg:py-28 bg-colestia-bg">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16 lg:mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                            {t('home_we_are_title')} <span className="text-gradient-main">colestia</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            {t('home_we_are_quote')}
                        </p>
                    </motion.div>

                    {/* Grid (Numbers Removed) */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <BentoCard
                            title={t('home_we_are_subtitle_1')}
                            description={t('home_we_are_desc_1')}
                        />

                        <BentoCard
                            title={t('home_we_are_subtitle_2')}
                            description={t('home_we_are_desc_2')}
                        />

                        <BentoCard
                            title={t('home_we_are_subtitle_3')}
                            description={t('home_we_are_desc_3')}
                        />
                    </div>
                </div>
            </section>

            {/* 3. "Creative Idea" Section */}
            <section className="py-12 md:py-20 lg:py-24 bg-colestia-bg relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Image Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ y: y2 }}
                            className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden glass-panel border border-white/10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop"
                                alt="Filmmaking"
                                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Text Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col pl-0 md:pl-10"
                        >
                            <div className="mb-4">
                                <h2 className="-mt-4 text-3xl md:text-4xl font-display font-bold leading-tight">
                                    <span className="text-colestia-purple">colestia</span> <span className="text-white">{t('home_creative_title_creative')}</span> <span className="text-[#FFD700]">{t('home_creative_title_idea')}</span> <br />
                                    <span className="text-white">{t('home_creative_title_2')}</span> <span className="text-white">{t('home_creative_title_3')}</span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-gray-300 font-light text-lg">
                                <h3 className="text-xl md:text-2xl text-white font-semibold leading-snug">
                                    <span className="text-colestia-purple">colestia</span> {t('home_creative_subtitle_1')}
                                </h3>

                                <div className="space-y-4 leading-relaxed">
                                    <p>
                                        <span className="text-colestia-purple font-semibold">colestia</span> {t('home_creative_desc_1')}
                                    </p>
                                    <p>
                                        {t('home_creative_desc_2')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Highlights Section */}
            <section className="py-12 md:py-24 bg-colestia-bg text-white">
                <div className="container mx-auto px-6">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
                            {t('home_exclusive_for')} <span className="text-gradient-main">colestian</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-0 md:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center text-center px-6 py-8"
                        >
                            <Clapperboard size={64} className="text-white mb-6" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold mb-4 h-12 flex items-center">{t('feature_1_title')}</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {t('feature_1_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center px-6 py-8"
                        >
                            <Lightbulb size={64} className="text-white mb-6" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold mb-4 h-12 flex items-center">{t('feature_2_title')}</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {t('feature_2_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center text-center px-6 py-8"
                        >
                            <Gift size={64} className="text-white mb-6" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold mb-4 h-12 flex items-center">{t('feature_3_title')}</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {t('feature_3_desc')}
                            </p>
                        </motion.div>

                        {/* Feature 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center text-center px-6 py-8"
                        >
                            <Copyright size={64} className="text-white mb-6" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold mb-4 h-12 flex items-center">{t('feature_4_title')}</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {t('feature_4_desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* 4. Directors Section - Horizontal Carousel */}
            < section className="py-12 md:py-24 bg-colestia-bg overflow-hidden" >
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                            {t('creators_title')} <span className="text-gradient-main">{t('creators_span')}</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
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
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory w-fit mx-auto max-w-full"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {directors.map((director, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex-shrink-0 w-[280px] md:w-[350px] perspective-1000 snap-center first:pl-4 md:first:pl-8 last:pr-4 md:last:pr-8 py-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="h-full"
                                >
                                    <Spotlight className="h-full rounded-2xl" size={400}>
                                        <div className="relative bg-gradient-to-b from-[#1e3a5f] to-[#0f172a] rounded-2xl overflow-hidden border border-white/10 group-hover:border-colestia-purple/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)] h-full">
                                            <div className="flex flex-col h-full">
                                                {/* Photo Section */}
                                                <div className="relative w-full h-[380px] md:h-[450px] flex-shrink-0 overflow-hidden">
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
                                                <div className="flex-1 p-6 flex flex-col relative z-20 bg-transparent">
                                                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                                                        {director.name}
                                                    </h3>
                                                    <p className="text-blue-200 text-sm font-medium mb-4">{director.role}</p>

                                                    {/* View More Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDirector(director);
                                                        }}
                                                        className="mt-auto w-full py-3 bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-xl transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]"
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
                    <p className="text-center text-gray-500 text-sm mt-8 md:hidden">
                        {t('swipe_hint')}
                    </p>
                </div>
            </section >



            {/* 5. Partners Section 
            <section className="py-24 bg-[#050505]">
                <div className="mx-auto px-6 md:px-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Our <span className="text-gradient-main">Partners</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            "Partners shaping the future of the media and blockchain technology industries."
                        </p>
                    </motion.div>*/}

            {/* Partner Grid - 5 columns in a single row 
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">*/}

            {/* Partner 1: กระทรวงวัฒนธรรม 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                <img
                                    src={logoCulture}
                                    alt="กระทรวงวัฒนธรรม"
                                    className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>*/}

            {/* Partner 2: กรมทรัพย์สินทางปัญญา 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                <img
                                    src={logoDIP}
                                    alt="กรมทรัพย์สินทางปัญญา"
                                    className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>*/}

            {/* Partner 3: Flips Innovative 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                <img
                                    src={logoFlips}
                                    alt="Flips Innovative"
                                    className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>*/}

            {/* Partner 4: Fraction 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                <img
                                    src={logoFraction}
                                    alt="Fraction"
                                    className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>*/}



            {/* Partner 5: มหาวิทยาลัยมหาสารคาม 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(122,30,166,0.3)] transition-all duration-500 hover:-translate-y-2 h-40 md:h-48 flex items-center justify-center">
                                <img
                                    src={logoMSU}
                                    alt="มหาวิทยาลัยมหาสารคาม"
                                    className="max-h-32 md:max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>*/}


            {/* Newsletter Subscription Section */}
            <section className="py-20 bg-gradient-to-b from-colestia-bg to-colestia-bg">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-colestia-purple to-colestia-gold rounded-3xl p-12 md:p-16 text-center shadow-[0_20px_60px_rgba(149,1,255,0.4)]"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            {t('newsletter_title')}
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            {t('newsletter_desc')}
                        </p>

                        {/* Email Input Form */}
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder={t('newsletter_placeholder')}
                                className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                            <button className="px-8 py-4 bg-white text-colestia-purple rounded-full font-semibold hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105">
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
                                className="bg-[#0a0a0a] border border-colestia-purple/30 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-[0_20px_60px_rgba(122,30,166,0.4)]"
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
                                <div className="grid md:grid-cols-2 gap-0 h-full">
                                    {/* Left Column - Director Image */}
                                    <div className="relative h-[40vh] md:h-auto overflow-hidden">
                                        <img
                                            src={selectedDirector.img}
                                            alt={selectedDirector.name}
                                            className="w-full h-full object-contain object-center bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                                    </div>

                                    {/* Right Column - Content */}
                                    <div className="p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                                        {/* Name and Role */}
                                        <div className="mb-6">
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                                {selectedDirector.name}
                                            </h2>
                                            <p className="text-colestia-magenta text-base font-medium">
                                                {selectedDirector.role}
                                            </p>
                                        </div>

                                        {/* Biography */}
                                        <div className="space-y-3 mb-6">
                                            <h3 className="text-lg font-bold text-white border-l-4 border-colestia-purple pl-4">
                                                {t('director_bio')}
                                            </h3>
                                            <p
                                                className="text-gray-300 leading-relaxed text-sm md:text-base max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                                                dangerouslySetInnerHTML={{ __html: language === 'th' ? selectedDirector.bio : selectedDirector.bioEn }}
                                            />
                                        </div>

                                        {/* Recent Works */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-white border-l-4 border-colestia-purple pl-4">
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
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import VideoBackground from '../components/VideoBackground';
import Button from '../components/Button';
import { ArrowRight, ArrowLeft, Globe, Shield, Zap, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
import aboutRetro from '../assets/about_retro.png';
import aboutClapper from '../assets/about_clapper.png';

const Home = () => {
    const { t, language } = useLanguage();
    const directorsScrollRef = useRef(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const { directors } = useDirectors();

    const scrollDirectors = (direction) => {
        if (directorsScrollRef.current) {
            const scrollAmount = 400;
            directorsScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
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


                        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-tight">
                            colestia
                        </h1>
                        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-tight">
                            <span className="text-gradient-main">{t('hero_dream_crafted')}</span>
                        </h2>

                        <p
                            className="text-xl text-white mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 5)' }}
                        >
                            {t('hero_tagline')}

                            <br /><span className="text-white/100 text-md">{t('hero_subtagline')}</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
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

            {/* 2. "We are colestia" Section (Moved from About Us) */}
            <section className="py-24 bg-colestia-bg relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white">
                                we are <span className="text-colestia-purple">colestia</span>
                            </h1>

                            <div className="border-l-4 border-colestia-purple pl-6 py-1">
                                <h3 className="text-xl md:text-2xl text-white font-semibold mb-3">
                                    '<span className="text-colestia-purple">colestia</span> คือพื้นที่ของคนรุ่นใหม่ที่เชื่อในพลังของภาพยนตร์ไทย'
                                </h3>
                                <p className="text-gray-300 font-light leading-relaxed indent-8">
                                    เราเชื่อว่าภาพยนตร์ที่ดีไม่ควรถูกสร้างขึ้นโดยคนเพียงไม่กี่คน แต่ควรเติบโตจากการร่วมแรงร่วมใจของทุกคนที่รักในสิ่งเดียวกัน ที่นี่ผู้สร้างไม่ต้องแบกความฝันไว้เพียงลำพัง และผู้ชมไม่ถูกจำกัดให้เป็นแค่ผู้รับชม ทุกไอเดียควรมีที่ยืน ทุกคนที่รักภาพยนตร์ควรมีโอกาสเป็นส่วนหนึ่งของการสร้างสรรค์
                                </p>
                            </div>

                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img src={aboutClapper} alt="Filmmaking" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12 pt-0 lg:pt-12"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img src={aboutRetro} alt="Retro Workspace" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="border-l-4 border-colestia-purple pl-6 py-1">
                                <h3 className="text-xl md:text-2xl text-white font-semibold mb-3">
                                    '<span className="text-colestia-purple">colestia</span> ให้คุณค่ากับทุกที่มาของทุกความคิด'
                                </h3>
                                <p className="text-gray-300 font-light leading-relaxed indent-8">
                                    เราให้ความสำคัญกับสิทธิและความเป็นเจ้าของของผู้สร้างอย่างชัดเจน ทุกความคิด ทุกผลงาน ยังคงเป็นของผู้ที่สร้างมันขึ้นมาอย่างแท้จริง colestia ทำหน้าที่เป็นพื้นที่สนับสนุนและเชื่อมโยง โดยเคารพคุณค่าและลิขสิทธิ์ของทุกไอเดีย
                                </p>
                            </div>

                            <div className="border-l-4 border-colestia-purple pl-6 py-1">
                                <h3 className="text-xl md:text-2xl text-white font-semibold mb-3">
                                    '<span className="text-colestia-purple">colestia</span> จึงเป็นจุดเชื่อมระหว่างผู้สร้างสรรค์และคนรักภาพยนตร์ไทย'
                                </h3>
                                <p className="text-gray-300 font-light leading-relaxed indent-8">
                                    พื้นที่ที่เปิดโอกาสให้ไอเดียได้เกิดขึ้นจริง ให้คนรุ่นใหม่ได้ลอง ได้เติบโต และได้เห็นผลงานของตัวเองก้าวไปไกลกว่าที่เคย เราเปลี่ยนการรับชม ให้กลายเป็นการมีส่วนร่วมและเปิดเส้นทางใหม่ของภาพยนตร์ไทยก้าวไปพร้อมกับทุกคน
                                    <br className="hidden md:block" /> เดินหน้าไปในทิศทางที่เราเชื่อร่วมกัน
                                </p>
                            </div>

                            <p className="text-lg md:text-xl text-white font-semibold italic border-l-4 border-gray-700 pl-6 py-2">
                                นี่ไม่ใช่แค่แพลตฟอร์ม แต่คือจุดเริ่มต้นของบทใหม่ของภาพยนตร์ไทย บทที่เราทุกคนกำลังเขียนไปพร้อมกัน
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Ecosystem Flow Diagram (Visualizing the Brief) */}
            <section className="py-24 bg-colestia-bg">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-16">{t('ecosystem_title')}</h2>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-colestia-purple/30 to-transparent -translate-y-1/2 z-0" />

                        {/* Step 1 */}
                        <div className="relative z-10 bg-colestia-card p-8 rounded-2xl border border-colestia-blue/30 shadow-[0_0_30px_rgba(39,52,136,0.4)] mx-auto max-w-xs">
                            <div className="w-16 h-16 bg-colestia-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_20px_rgba(39,52,136,0.3)]">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('eco_step_1_title')}</h3>
                            <p className="text-sm text-gray-400">{t('eco_step_1_desc')}</p>
                        </div>

                        {/* Step 2 (Colestia) */}
                        <div className="relative z-10 bg-colestia-card p-8 rounded-2xl border border-colestia-purple/30 shadow-[0_0_30px_rgba(149,1,255,0.4)] mx-auto max-w-xs">
                            <div className="w-16 h-16 bg-colestia-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-colestia-purple">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('eco_step_2_title')}</h3>
                            <p className="text-sm text-gray-400">{t('eco_step_2_desc')}</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 bg-colestia-card p-8 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mx-auto max-w-xs">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('eco_step_3_title')}</h3>
                            <p className="text-sm text-gray-400">{t('eco_step_3_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Directors Section - Horizontal Carousel */}
            <section className="py-24 bg-colestia-bg overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            {t('creators_title')} <span className="text-gradient-main">{t('creators_span')}</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {t('creators_desc')}
                        </p>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className="relative">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scrollDirectors('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-colestia-purple/20 hover:bg-colestia-purple/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hidden md:block"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Scrollable Directors Container */}
                        <div
                            ref={directorsScrollRef} // Fixed variable name case
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-12"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {directors.map((director, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex-shrink-0 w-[280px] md:w-[350px] perspective-1000"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        className="h-full"
                                    >
                                        <Spotlight className="h-full rounded-2xl" size={400}>
                                            <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 group-hover:border-colestia-purple/50 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(122,30,166,0.3)] h-full">
                                                <div className="flex flex-col h-full">
                                                    {/* Photo Section - Larger */}
                                                    <div className="relative w-full h-[380px] md:h-[450px] flex-shrink-0 overflow-hidden">
                                                        <img
                                                            src={director.img}
                                                            alt={director.name}
                                                            className="w-full h-full object-cover object-top"
                                                        />
                                                        {/* Gradient Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    </div>

                                                    {/* Info Section */}
                                                    <div className="flex-1 p-6 flex flex-col relative z-20 bg-[#0a0a0a]">
                                                        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-colestia-purple transition-colors">
                                                            {director.name}
                                                        </h3>
                                                        <p className="text-colestia-gold text-sm font-medium mb-3">{director.role}</p>

                                                        {/* View More Button */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedDirector(director);
                                                            }}
                                                            className="mt-auto px-4 py-2 bg-colestia-purple/20 hover:bg-colestia-purple/40 text-white rounded-lg transition-all duration-300 text-sm font-medium border border-colestia-purple/30 hover:border-colestia-purple/60 relative z-30 cursor-pointer animate-shine"
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
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-colestia-purple/20 hover:bg-colestia-purple/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hidden md:block"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Scroll Hint for Mobile */}
                    <p className="text-center text-gray-500 text-sm mt-8 md:hidden">
                        {t('swipe_hint')}
                    </p>
                </div>
            </section>



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
                )}
        </div>
    );
};

export default Home;
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCcw, Bell, Calendar, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card3D from '../components/Card3D'; // Import Card3D
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';

import Spotlight from '../components/Spotlight';
import InteractiveGrid from '../components/InteractiveGrid';
import SkeletonCard from '../components/SkeletonCard';

// Movie genres
const GENRES = [
    { id: 'all', name: 'ทั้งหมด', nameEn: 'All' },
    { id: 'action', name: 'แอ็คชั่น', nameEn: 'Action' },
    { id: 'adventure', name: 'ผจญภัย', nameEn: 'Adventure' },
    { id: 'animation', name: 'แอนิเมชั่น', nameEn: 'Animation' },
    { id: 'comedy', name: 'คอมเมดี้', nameEn: 'Comedy' },
    { id: 'crime', name: 'อาชญากรรม', nameEn: 'Crime' },
    { id: 'documentary', name: 'สารคดี', nameEn: 'Documentary' },
    { id: 'drama', name: 'ดราม่า', nameEn: 'Drama' },
    { id: 'fantasy', name: 'แฟนตาซี', nameEn: 'Fantasy' },
    { id: 'horror', name: 'สยองขวัญ', nameEn: 'Horror' },
    { id: 'romance', name: 'โรแมนติก', nameEn: 'Romance' },
    { id: 'scifi', name: 'ไซไฟ', nameEn: 'Science Fiction' },
    { id: 'thriller', name: 'ระทึกขวัญ', nameEn: 'Thriller' }
];

// Format currency
const formatCurrency = (amount) => {
    return `฿${(amount / 1000000).toFixed(1)}M`;
};

// Format date
const formatDate = (dateString, language) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// Movie Card Component - Updated Design
// MovieCard รับ props isHovered และ isAnyHovered สำหรับ effect จางลง
const MovieCard = ({ movie, isHovered, isAnyHovered }) => {
    const { t, language } = useLanguage();
    const genre = GENRES.find(g => g.id === movie.genre);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
                y: isHovered ? -12 : 0,
                scale: isHovered ? 1.02 : 1,
                opacity: isAnyHovered && !isHovered ? 0.5 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className="cursor-pointer"
        >
            <Spotlight className="h-full rounded-2xl" size={400}>
                <div className={`bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border transition-all duration-300 ${isHovered
                    ? 'border-colestia-purple shadow-[0_20px_60px_rgba(122,30,166,0.4)]'
                    : 'border-white/5'
                    }`}>
                    {/* Poster - สัดส่วน 16:9 สวยงาม */}
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={movie.poster}
                            alt={movie.titleTh}
                            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        {/* Genre Badge */}
                        <div className="absolute top-3 left-3">
                            <span className="bg-colestia-purple/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                {language === 'th' ? genre?.name : genre?.nameEn}
                            </span>
                        </div>

                        {/* Percentage Badge - มุมขวาบน */}
                        <div className="absolute top-3 right-3">
                            <span className={`backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full ${movie.percentage >= 67 ? 'bg-green-500/90 text-white' :
                                movie.percentage >= 34 ? 'bg-amber-500/90 text-white' :
                                    'bg-red-500/90 text-white'
                                }`}>
                                {movie.percentage}%
                            </span>
                        </div>

                        {/* Title Overlay - อยู่บนรูป */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-bold text-lg mb-0.5 drop-shadow-lg">
                                {movie.titleTh}
                            </h3>
                            <p className="text-gray-300 text-xs">
                                {movie.titleEn}
                            </p>
                        </div>
                    </div>

                    {/* Content - กะทัดรัด */}
                    <div className="p-4">
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${movie.percentage >= 67 ? 'bg-gradient-to-r from-[#C6A355] to-[#F9D976]' :
                                        movie.percentage >= 34 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                                            'bg-gradient-to-r from-red-500 to-orange-400'
                                        }`}
                                    style={{ width: `${movie.percentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Funding - 2 columns */}
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-gray-500 text-xs">{t('label_raised')}</p>
                                <p className="text-white font-bold">{formatCurrency(movie.currentFunding)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs">{t('label_goal')}</p>
                                <p className="text-white font-bold">{formatCurrency(movie.goalFunding)}</p>
                            </div>
                        </div>

                        {/* Investors */}
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span>{movie.investors.toLocaleString()} {t('label_investors')}</span>
                        </div>

                        {/* CTA Button */}
                        <Link to={`/project/${movie.id || movie.firestoreId}`}>
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full bg-gradient-to-r from-colestia-purple to-colestia-magenta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-colestia-purple/50 transition-all overflow-hidden group"
                            >
                                <span className="relative flex items-center justify-center gap-2 text-sm">
                                    {t('btn_invest')}
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </Spotlight>
        </motion.div>
    );
};



// Coming Soon Movie Card Component
const ComingSoonCard = ({ movie }) => {
    const { t, language } = useLanguage();
    const genre = GENRES.find(g => g.id === movie.genre);

    // Format expected date
    const formatExpectedDate = (dateString, language) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-GB', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group perspective-1000"
        >
            <Card3D className="h-full">
                <Spotlight className="h-full rounded-2xl" size={400}>
                    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border border-white/5 group-hover:border-amber-500/50 transition-all duration-500">
                        {/* Poster */}
                        {/* Poster - สัดส่วน 3:1 เล็กลงอีก */}
                        <div className="relative aspect-[3/1] overflow-hidden">
                            <img
                                src={movie.poster}
                                alt={movie.titleTh}
                                className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                            {/* Coming Soon Badge - Top Left */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                                    {t('label_coming')}
                                </span>
                                <span className="bg-colestia-purple/80 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {language === 'th' ? genre?.name : genre?.nameEn}
                                </span>
                            </div>

                            {/* Countdown overlay */}
                            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <p className="text-amber-400 text-sm font-bold">{t('label_expected')}</p>
                                <p className="text-white text-lg font-bold">{formatExpectedDate(movie.expectedDate, language)}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Title */}
                            <h3 className="text-white font-bold text-xl mb-1">
                                {movie.titleTh}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                                {movie.titleEn}
                            </p>

                            {/* Director */}
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-colestia-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span className="text-gray-400 text-sm">{t('label_director')}: {movie.director}</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                                {movie.description}
                            </p>

                            {/* Notify Me Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all overflow-hidden group"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                {/* Button content */}
                                <span className="relative flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {t('btn_notify')}
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </Spotlight>
            </Card3D>
        </motion.div>
    );
};

const Products = () => {
    const { t, language } = useLanguage();
    const [selectedGenre, setSelectedGenre] = useState('all');
    // เพิ่ม state สำหรับจัดการ hover effect
    const [hoveredId, setHoveredId] = useState(null);
    const { projects: allProjects, isLoading } = useProjects();

    const projects = useMemo(() => allProjects.filter(p => p.status === 'active' || !p.status), [allProjects]);
    const comingSoonMovies = useMemo(() => allProjects.filter(p => p.status === 'coming_soon'), [allProjects]);

    // Filter movies by genre
    const filteredMovies = useMemo(() => {
        if (selectedGenre === 'all') return projects;
        return projects.filter(movie => movie.genre === selectedGenre);
    }, [selectedGenre, projects]);

    // Separate movies into Sale and New
    const onSaleMovies = useMemo(() =>
        filteredMovies.filter(m => m.onSale),
        [filteredMovies]
    );

    const newMovies = useMemo(() =>
        filteredMovies.filter(m => m.isNew),
        [filteredMovies]
    );

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        {t('products_title')}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-4">
                        {t('products_subtitle')}
                    </p>
                </motion.div>

                {/* Genre Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="text-colestia-purple" size={20} />
                        <h3 className="text-lg font-semibold text-white">{t('filter_title')}</h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {GENRES.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => setSelectedGenre(genre.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedGenre === genre.id
                                    ? 'bg-gradient-to-r from-colestia-purple to-colestia-blue text-white shadow-lg shadow-colestia-purple/30'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                            >
                                {language === 'th' ? genre.name : genre.nameEn}
                            </button>
                        ))}
                    </div>

                    {selectedGenre !== 'all' && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setSelectedGenre('all')}
                            className="mt-3 text-sm text-colestia-cyan hover:text-white transition-colors flex items-center gap-2"
                        >
                            <X size={16} /> {t('filter_clear')}
                        </motion.button>
                    )}
                </motion.div>

                {/* On Sale Section */}
                {onSaleMovies.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                                {t('section_popular')}
                            </h2>
                            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                                {t('label_popular')}
                            </span>
                        </div>

                        {/* Mobile Carousel / Desktop Grid */}
                        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                            {isLoading
                                ? Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                        <SkeletonCard />
                                    </div>
                                ))
                                : onSaleMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="min-w-[85vw] md:min-w-0 snap-center h-full"
                                        onMouseEnter={() => setHoveredId(movie.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    >
                                        <MovieCard
                                            movie={movie}
                                            isHovered={hoveredId === movie.id}
                                            isAnyHovered={hoveredId !== null}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                )}

                {/* New Section */}
                {newMovies.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-gradient-to-b from-[#C6A355] to-[#F9D976] rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                                {t('section_new')}
                            </h2>
                            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                                {t('label_new')}
                            </span>
                        </div>

                        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                            {isLoading
                                ? Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                        <SkeletonCard />
                                    </div>
                                ))
                                : newMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="min-w-[85vw] md:min-w-0 snap-center h-full"
                                        onMouseEnter={() => setHoveredId(movie.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    >
                                        <MovieCard
                                            movie={movie}
                                            isHovered={hoveredId === movie.id}
                                            isAnyHovered={hoveredId !== null}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                )}

                {/* Coming Soon Section */}
                {comingSoonMovies.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                                {t('section_coming')}
                            </h2>
                            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                                {t('label_coming')}
                            </span>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-2xl">
                            {t('coming_desc')}
                        </p>
                        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                            {isLoading
                                ? Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                        <SkeletonCard />
                                    </div>
                                ))
                                : comingSoonMovies.map((movie) => (
                                    <div key={movie.id} className="min-w-[85vw] md:min-w-0 snap-center h-full">
                                        <ComingSoonCard movie={movie} />
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                )}


                {/* No Results */}
                {filteredMovies.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">{t('no_results')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

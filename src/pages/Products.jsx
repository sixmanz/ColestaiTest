import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Zap, Crown, Flame, Clock, ChevronRight, LayoutGrid, LayoutList } from 'lucide-react';
// Navbar and Footer are handled in App.jsx
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

// Featured Hero Component
const FeaturedHero = ({ movie }) => {
    const { t, language } = useLanguage();
    if (!movie) return null;

    return (
        <section className="mb-20 relative">
            <div className="absolute inset-0 bg-colestia-purple/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                {/* Background Image Parallax simplified */}
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-[60vh] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row gap-8 items-end justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-colestia-gold text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Crown size={12} /> {t('label_popular') || "Featured"}
                            </span>
                            <span className="backdrop-blur-md bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                {language === 'th' ? GENRES.find(g => g.id === movie.genre)?.name : GENRES.find(g => g.id === movie.genre)?.nameEn}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                            {language === 'th' ? movie.titleTh : movie.titleEn}
                        </h2>

                        <p className="text-gray-300 text-lg line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                            {movie.description}
                        </p>

                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">{t('label_raised')}</p>
                                <p className="text-colestia-cyan text-2xl font-bold font-mono">{formatCurrency(movie.currentFunding)}</p>
                            </div>
                            <div className="w-px h-10 bg-white/20" />
                            <div>
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">{t('label_investors')}</p>
                                <p className="text-white text-2xl font-bold font-mono">{movie.investors.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex-shrink-0">
                        <Link to={`/project/${movie.id || movie.firestoreId}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2"
                            >
                                <Zap className="fill-black" size={20} />
                                {t('btn_invest') || "Invest Now"}
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

// Movie Card Component - Simple Zoom
const MovieCard = ({ movie }) => {
    const { t, language } = useLanguage();
    const genre = GENRES.find(g => g.id === movie.genre);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -10 : 0,
                // Simple scale up instead of complex 3D tilt
                scale: isHovered ? 1.05 : 1,
                zIndex: isHovered ? 10 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer h-full relative"
        >
            <Spotlight className="h-full rounded-2xl" size={400}>
                <div className={`bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border transition-all duration-300 flex flex-col ${isHovered
                    ? 'border-colestia-purple shadow-[0_20px_40px_rgba(122,30,166,0.3)]'
                    : 'border-white/5'
                    }`}>
                    {/* Poster - สัดส่วน 16:9 สวยงาม */}
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={movie.poster}
                            alt={movie.titleTh}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
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
                            <span className={`backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full ${movie.percentage <= 33.3 ? 'bg-colestia-purple/90 text-white' :
                                movie.percentage <= 66.6 ? 'bg-colestia-blue/90 text-white' :
                                    'bg-gradient-to-r from-[#FFD700] to-[#E5C100] text-black'
                                }`}>
                                {movie.percentage}%
                            </span>
                        </div>
                    </div>

                    {/* Content - กะทัดรัด */}
                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-white font-bold text-lg mb-1 leading-tight line-clamp-1">
                            {language === 'th' ? movie.titleTh : movie.titleEn}
                        </h3>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-1">{movie.director}</p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${movie.percentage}%` }}
                                    className={`h-full rounded-full ${movie.percentage <= 33.3 ? 'bg-gradient-to-r from-[#c084fc] to-[#9501ff]' :
                                        movie.percentage <= 66.6 ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe]' :
                                            'bg-gradient-to-r from-[#FFD700] to-[#E5C100]'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Funding - 2 columns */}
                        <div className="flex justify-between items-center mb-3 mt-auto">
                            <div>
                                <p className="text-gray-500 text-[10px]">{t('label_raised')}</p>
                                <p className="text-white font-bold text-sm">{formatCurrency(movie.currentFunding)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-[10px]">{t('label_goal')}</p>
                                <p className="text-gray-300 font-bold text-sm">{formatCurrency(movie.goalFunding)}</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link to={`/project/${movie.id || movie.firestoreId}`} className="mt-2">
                            <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isHovered
                                ? 'bg-white text-black shadow-lg scale-105'
                                : 'bg-white/5 text-white hover:bg-white/10'
                                }`}>
                                {t('btn_invest')} <Zap size={14} className={isHovered ? "fill-black" : ""} />
                            </button>
                        </Link>
                    </div>
                </div>
            </Spotlight>
        </motion.div>
    );
};

// Coming Soon Movie Card Component - Simple Zoom
const ComingSoonCard = ({ movie }) => {
    const { t, language } = useLanguage();
    const genre = GENRES.find(g => g.id === movie.genre);

    // Format expected date
    const formatExpectedDate = (dateString, language) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-GB', {
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer h-full"
        >
            <Spotlight className="h-full rounded-2xl" size={400}>
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border border-dashed border-white/20 group-hover:border-solid group-hover:border-amber-500/50 transition-all duration-300 relative">

                    <div className="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img
                            src={movie.poster}
                            alt={movie.titleTh}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center group-hover:opacity-0 transition-opacity duration-300">
                            <Clock className="w-12 h-12 text-white/50 mx-auto mb-2" />
                        </div>

                        <div className="absolute top-3 left-3">
                            <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                Coming Soon
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
                        <h3 className="text-white font-bold text-lg mb-1">{language === 'th' ? movie.titleTh : movie.titleEn}</h3>
                        <p className="text-amber-400 text-sm font-mono flex items-center gap-2">
                            <Clock size={12} /> {formatExpectedDate(movie.expectedDate, language)}
                        </p>
                    </div>
                </div>
            </Spotlight>
        </motion.div>
    );
};

const Products = () => {
    const { t, language } = useLanguage();
    const [selectedGenre, setSelectedGenre] = useState('all');

    // View toggles
    const [viewAllPopular, setViewAllPopular] = useState(false);
    const [viewAllNew, setViewAllNew] = useState(false);

    const { projects: allProjects, isLoading } = useProjects();

    const projects = useMemo(() => allProjects.filter(p => p.status === 'active' || !p.status), [allProjects]);
    const comingSoonMovies = useMemo(() => allProjects.filter(p => p.status === 'coming_soon'), [allProjects]);

    // Sorting for Featured Hero (Most funded)
    const featuredMovie = useMemo(() => {
        if (projects.length === 0) return null;
        return [...projects].sort((a, b) => b.currentFunding - a.currentFunding)[0];
    }, [projects]);


    // Filter movies by genre
    const filteredMovies = useMemo(() => {
        if (selectedGenre === 'all') return projects;
        return projects.filter(movie => movie.genre === selectedGenre);
    }, [selectedGenre, projects]);

    const displayMovies = useMemo(() => {
        // Filter out the featured movie from the main list so it doesn't duplicate if we are viewing "All"
        // But if filtering by genre, we just show matches.
        if (selectedGenre === 'all' && featuredMovie) {
            return filteredMovies.filter(m => m.id !== featuredMovie.id);
        }
        return filteredMovies;
    }, [filteredMovies, featuredMovie, selectedGenre]);


    // Separate movies into Sale and New (from the remaining displayMovies)
    const onSaleMovies = useMemo(() =>
        displayMovies.filter(m => m.onSale),
        [displayMovies]
    );

    const newMovies = useMemo(() =>
        displayMovies.filter(m => !m.onSale), // Assuming "New" means everything else for now to fill the grid
        [displayMovies]
    );


    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">

                {/* 1. Featured Hero Section */}
                {!isLoading && featuredMovie && selectedGenre === 'all' && (
                    <FeaturedHero movie={featuredMovie} />
                )}

                {/* 2. Filter Section - Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky top-28 z-40 mb-12 backdrop-blur-xl bg-black/60 border-y border-white/10 py-4 -mx-6 px-6 md:mx-0 md:px-6 md:rounded-2xl md:border"
                >
                    <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
                        {/* Left: Filter Label */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Filter size={18} className="text-colestia-purple" />
                                <span className="text-sm font-bold text-white hidden md:inline">{t('filter_title')}</span>
                            </div>
                            <div className="h-6 w-px bg-white/20 hidden md:block" />
                        </div>

                        {/* Scrolling Container for Filters */}
                        <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            <div className="flex gap-1.5 min-w-max pb-2 md:pb-0 pr-6 md:pr-0 w-full md:justify-center">
                                {GENRES.map((genre) => (
                                    <button
                                        key={genre.id}
                                        onClick={() => setSelectedGenre(genre.id)}
                                        className={`relative px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedGenre === genre.id
                                            ? 'text-white bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {language === 'th' ? genre.name : genre.nameEn}
                                        {selectedGenre === genre.id && (
                                            <motion.div
                                                layoutId="activeFilter"
                                                className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* 3. Popular Section - Horizontal Scroll by default, Grid if View All */}
                {
                    onSaleMovies.length > 0 && (
                        <motion.div
                            layout
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 ml-1">
                                    <Flame className="text-amber-500 fill-amber-500" />
                                    <h2 className="text-2xl font-display font-bold text-white tracking-wide">{t('section_popular')}</h2>
                                </div>

                                {/* View All Toggle */}
                                <button
                                    onClick={() => setViewAllPopular(!viewAllPopular)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
                                >
                                    {viewAllPopular ? (
                                        <><LayoutList size={16} /> {language === 'th' ? 'แบบเลื่อน' : 'Carousel'}</>
                                    ) : (
                                        <><LayoutGrid size={16} /> {language === 'th' ? 'ดูทั้งหมด' : 'View All'}</>
                                    )}
                                </button>
                            </div>

                            {viewAllPopular ? (
                                // Grid View
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {isLoading ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />) :
                                        onSaleMovies.map(movie => (
                                            <div key={movie.id} className="h-[400px]">
                                                <MovieCard movie={movie} />
                                            </div>
                                        ))
                                    }
                                </motion.div>
                            ) : (
                                // Horizontal Scroll View
                                <div className="relative group">
                                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                                        {isLoading ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />) :
                                            onSaleMovies.map(movie => (
                                                <div key={movie.id} className="min-w-[85vw] md:min-w-[350px] snap-center h-[400px]">
                                                    <MovieCard movie={movie} />
                                                </div>
                                            ))
                                        }
                                        {/* Spacer for padding at the end */}
                                        <div className="min-w-[20px] md:min-w-[0px]" />
                                    </div>

                                    {/* Scroll Indicator (Fade + Arrow) */}
                                    {!isLoading && onSaleMovies.length > 2 && (
                                        <div className="absolute right-0 top-0 bottom-8 w-24 md:w-32 bg-gradient-to-l from-black via-black/60 to-transparent pointer-events-none flex items-center justify-end px-4 md:px-8 opacity-100 transition-opacity duration-500 md:rounded-r-xl">
                                            <ChevronRight className="text-white/80 animate-pulse drop-shadow-lg" size={40} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )
                }

                {/* 4. New Arrivals / All Others - Horizontal Scroll by default */}
                {
                    newMovies.length > 0 && (
                        <motion.div layout className="mb-16">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 ml-1">
                                    <Zap className="text-colestia-blue fill-colestia-blue" />
                                    <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                                        {selectedGenre === 'all' ? t('section_new') : 'Results'}
                                    </h2>
                                </div>

                                {/* View All Toggle */}
                                <button
                                    onClick={() => setViewAllNew(!viewAllNew)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
                                >
                                    {viewAllNew ? (
                                        <><LayoutList size={16} /> {language === 'th' ? 'แบบเลื่อน' : 'Carousel'}</>
                                    ) : (
                                        <><LayoutGrid size={16} /> {language === 'th' ? 'ดูทั้งหมด' : 'View All'}</>
                                    )}
                                </button>
                            </div>

                            {viewAllNew ? (
                                // Grid View
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                                >
                                    {isLoading ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />) :
                                        newMovies.map(movie => (
                                            <div key={movie.id} className="h-[360px]">
                                                <MovieCard movie={movie} />
                                            </div>
                                        ))
                                    }
                                </motion.div>
                            ) : (
                                // Horizontal Scroll View
                                <div className="relative group">
                                    <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                                        {isLoading ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />) :
                                            newMovies.map(movie => (
                                                <div key={movie.id} className="min-w-[45vw] md:min-w-[260px] snap-center h-[360px]">
                                                    <MovieCard movie={movie} />
                                                </div>
                                            ))
                                        }
                                        {/* Spacer for padding at the end */}
                                        <div className="min-w-[20px] md:min-w-[0px]" />
                                    </div>

                                    {/* Scroll Indicator (Fade + Arrow) */}
                                    {!isLoading && newMovies.length > 2 && (
                                        <div className="absolute right-0 top-0 bottom-8 w-16 md:w-24 bg-gradient-to-l from-black via-black/60 to-transparent pointer-events-none flex items-center justify-end px-2 md:px-4 opacity-100 transition-opacity duration-500 md:rounded-r-xl">
                                            <ChevronRight className="text-white/80 animate-pulse drop-shadow-lg" size={32} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )
                }

                {/* 5. Coming Soon */}
                {
                    comingSoonMovies.length > 0 && (
                        <div className="mt-12 border-t border-white/10 pt-16">
                            <div className="flex items-center gap-2 mb-8 justify-center">
                                <Clock className="text-gray-500" />
                                <h2 className="text-2xl font-display font-bold text-gray-300 tracking-wide">{t('section_coming')}</h2>
                            </div>

                            <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide px-6 -mx-6 md:mx-0 md:px-0">
                                {comingSoonMovies.map(movie => (
                                    <div key={movie.id} className="min-w-[280px] md:min-w-[320px] h-[450px] snap-center">
                                        <ComingSoonCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }

                {
                    filteredMovies.length === 0 && !isLoading && (
                        <div className="text-center py-32 opacity-50">
                            <p className="text-xl">{t('no_results')}</p>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default Products;


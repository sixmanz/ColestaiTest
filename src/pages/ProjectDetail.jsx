import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';
import ExternalLinkModal from '../components/ExternalLinkModal';
import { ArrowLeft, Play, AlertCircle, ExternalLink, X, Loader } from 'lucide-react';
import heroVideo from '../assets/hero.mp4';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';

const ProjectDetail = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const { getProjectById, isLoading } = useProjects();
    const project = getProjectById(id);

    const [modalOpen, setModalOpen] = useState(false);
    const [trailerOpen, setTrailerOpen] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader className="animate-spin text-white" /></div>;
    if (!project) return <div className="pt-32 text-center text-white">Project not found</div>;

    const displayTitle = language === 'th' && project.titleTh ? project.titleTh : project.titleEn || project.title;
    const displayTagline = language === 'th' ? project.description : project.descriptionEn;
    const displayCategory = project.genre;
    const displayDescription = language === 'th' ? project.description : project.descriptionEn;
    const posterImage = project.poster || project.videoPoster;

    return (
        <div className="min-h-screen bg-black pb-20 relative overflow-hidden" ref={containerRef}>
            <InteractiveGrid />

            {/* 1. Cinematic Header with Parallax */}
            <div className="relative h-[80vh] w-full group overflow-hidden">
                {/* Background Image */}
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={posterImage}
                        alt={displayTitle}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <div className="container mx-auto">
                        <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
                            <ArrowLeft size={20} className="mr-2" /> {t('btn_back')}
                        </Link>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                            <span className="bg-colestia-purple/80 text-white border border-colestia-purple/50 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block backdrop-blur-md shadow-[0_0_15px_rgba(122,30,166,0.5)]">
                                {displayCategory}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-4 drop-shadow-2xl">
                                {displayTitle}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 italic mb-8 max-w-2xl font-light leading-relaxed drop-shadow-md">
                                "{displayTagline}"
                            </p>

                            <div className="flex gap-4 flex-wrap">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setTrailerOpen(true)}
                                    className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                >
                                    <Play size={20} fill="currentColor" /> {t('btn_trailer')}
                                </motion.button>
                                <Button variant="primary" onClick={() => setModalOpen(true)}>
                                    {t('btn_portal')} <ExternalLink size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 relative z-10">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-12">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-colestia-purple rounded-full"></span>
                            {t('title_synopsis')}
                        </h2>
                        <p className="text-gray-300 leading-loose text-lg text-justify">
                            {displayDescription}
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-colestia-blue rounded-full"></span>
                            {t('title_opportunity')}
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <p className="text-gray-300 leading-relaxed font-light text-lg">
                                {t('desc_opportunity').replace('{category}', displayCategory).replace('{title}', displayTitle)}
                            </p>
                        </div>
                    </motion.section>

                    {/* Rewards Section */}
                    {project.rewards && project.rewards.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16"
                        >
                            <h2 className="text-3xl font-display font-bold text-white mb-8 border-l-4 border-colestia-purple pl-4">
                                {language === 'th' ? 'ของรางวัลพิเศษ' : 'Exclusive Rewards'}
                            </h2>
                            <div className="grid gap-6">
                                {project.rewards.sort((a, b) => b.price - a.price).map((reward, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative group overflow-hidden rounded-2xl border ${reward.tier === 'special'
                                            ? 'border-yellow-500/50 bg-gradient-to-br from-gray-900 to-yellow-900/20'
                                            : 'border-white/10 bg-white/5 hover:border-colestia-purple/50'
                                            } p-6 transition-all hover:shadow-lg`}
                                    >
                                        {reward.tier === 'special' && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                                                SPECIAL
                                            </div>
                                        )}

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold mb-2 ${reward.tier === 'special' ? 'text-yellow-400' : 'text-white'
                                                    }`}>
                                                    {language === 'th' ? (reward.nameTh || reward.name) : (reward.nameEn || reward.name)}
                                                </h3>
                                                <p className="text-gray-300 font-light text-sm mb-4">
                                                    {language === 'th' ? (reward.description || reward.description) : (reward.descriptionEn || reward.description)}
                                                </p>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {(language === 'th' ? reward.items : (reward.itemsEn || reward.items)).map((item, i) => (
                                                        <li key={i} className="flex items-center text-xs text-gray-400">
                                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${reward.tier === 'special' ? 'bg-yellow-500' : 'bg-colestia-purple'
                                                                }`} />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-col items-start md:items-end gap-3 min-w-[140px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 pl-0">
                                                <div className="text-left md:text-right w-full">
                                                    <span className="text-xs text-gray-500 block">{t('project_min_invest') || 'Minimum Funding'}</span>
                                                    <span className={`text-2xl font-bold font-mono ${reward.tier === 'special' ? 'text-yellow-400' : 'text-white'
                                                        }`}>
                                                        ฿{reward.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <button className={`w-full py-2 px-4 rounded-xl font-bold text-sm transition-all ${reward.tier === 'special'
                                                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:scale-105'
                                                    : 'bg-white/10 text-white hover:bg-colestia-purple hover:text-white'
                                                    }`}>
                                                    {t('btn_select_reward') || 'Select Reward'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Background Glow for Special Tier */}
                                        {reward.tier === 'special' && (
                                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="h-fit">
                    <Spotlight className="w-full h-full rounded-2xl" size={400}>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative overflow-hidden group">
                            {/* Decorative bg */}
                            <div className="absolute top-0 right-0 p-20 bg-colestia-purple/5 blur-[80px] rounded-full pointer-events-none" />

                            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 relative z-10">{t('title_data')}</h3>
                            <div className="space-y-6 relative z-10">
                                {/* Dynamic Details if available, otherwise just show funding info */}
                                {project.details ? (
                                    project.details.map((detail, idx) => (
                                        <div key={idx} className="group/item">
                                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 group-hover/item:text-colestia-purple transition-colors">
                                                {language === 'th' ? detail.labelTh : detail.label}
                                            </p>
                                            <p className="text-white font-medium text-lg">
                                                {language === 'th' ? detail.valueTh : detail.value}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {/* Funding Progress Section */}
                                        <div className="bg-gradient-to-br from-colestia-purple/10 to-colestia-blue/10 p-4 rounded-xl border border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-gray-400 text-xs uppercase tracking-wider">
                                                    {language === 'th' ? 'ความคืบหน้าการระดมทุน' : 'Funding Progress'}
                                                </p>
                                                <span className={`font-bold text-lg ${(project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0) <= 33.3
                                                    ? 'text-colestia-purple'
                                                    : (project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0) <= 66.6
                                                        ? 'text-colestia-blue'
                                                        : 'text-[#FFD700]'
                                                    }`}>
                                                    {project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0}%
                                                </span>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0, 100)}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className={`h-full rounded-full ${(project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0) <= 33.3
                                                        ? 'bg-gradient-to-r from-[#c084fc] to-[#9501ff]'
                                                        : (project.percentage || Math.round((project.currentFunding / project.goalFunding) * 100) || 0) <= 66.6
                                                            ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe]'
                                                            : 'bg-gradient-to-r from-[#FFD700] to-[#E5C100]'
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <div>
                                                    <p className="text-gray-500 text-xs">{language === 'th' ? 'ระดมได้แล้ว' : 'Raised'}</p>
                                                    <p className="text-white font-semibold">฿{((project.currentFunding || 0) / 1000000).toFixed(1)}M</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-500 text-xs">{language === 'th' ? 'เป้าหมาย' : 'Goal'}</p>
                                                    <p className="text-white font-semibold">฿{((project.goalFunding || 0) / 1000000).toFixed(1)}M</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                                                {language === 'th' ? 'นักลงทุน' : 'Investors'}
                                            </p>
                                            <p className="text-white font-medium text-lg">{project.investors?.toLocaleString() || '0'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                                                {language === 'th' ? 'ระยะเวลา' : 'Timeline'}
                                            </p>
                                            <p className="text-white font-medium text-lg">{project.startDate} - {project.endDate}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                <div className="flex items-start gap-3 bg-colestia-blue/10 p-4 rounded-xl border border-colestia-blue/20">
                                    <AlertCircle className="text-colestia-blue shrink-0" size={20} />
                                    <p className="text-xs text-colestia-blue/80 leading-relaxed">
                                        {t('disclaimer_detail')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Spotlight>
                </div>
            </div>

            {/* External Link Compliance Modal */}
            <ExternalLinkModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                destination={t('modal_destination_portal')}
                url={project.link || "#"}
            />

            {/* Video Trailer Modal */}
            <AnimatePresence>
                {trailerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setTrailerOpen(false)}
                    >
                        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setTrailerOpen(false)}
                                className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <video
                                src={heroVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;

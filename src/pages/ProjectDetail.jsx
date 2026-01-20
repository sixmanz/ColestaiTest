import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import ExternalLinkModal from '../components/ExternalLinkModal';
import { ArrowLeft, Play, AlertCircle, ExternalLink, X, Loader, Clock, Users, Target, ShieldCheck, ChevronRight, Share2, Heart, Award, Volume2, VolumeX } from 'lucide-react';
import heroVideo from '../assets/hero.mp4';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';

const ProjectDetail = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const { getProjectById, isLoading } = useProjects();
    const project = getProjectById(id);

    const [modalOpen, setModalOpen] = useState(false);
    const [trailerOpen, setTrailerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('story');
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    // Ensure video plays
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }, [videoRef]);

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader className="animate-spin text-white" /></div>;
    if (!project) return <div className="pt-32 text-center text-white">Project not found</div>;

    const displayTitle = language === 'th' && project.titleTh ? project.titleTh : project.titleEn || project.title;
    const displayTagline = language === 'th' ? project.description : project.descriptionEn;
    const displayCategory = project.genre;
    const displayDescription = language === 'th' ? project.description : project.descriptionEn;

    // Format helpers
    const formatCurrency = (val) => `฿${(val / 1000000).toFixed(1)}M`;
    const formatNumber = (val) => val ? val.toLocaleString() : '0';

    // Calculate Days Left
    const daysLeft = React.useMemo(() => {
        if (!project.endDate) return 0;
        const end = new Date(project.endDate);
        const now = new Date();
        const diffTime = end - now;
        if (diffTime < 0) return 0;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [project.endDate]);

    const videoSrc = project.trailerUrl || heroVideo;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-colestia-purple/30 pb-20">
            <InteractiveGrid />

            {/* Navbar Placeholder */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none">
                <div className="container mx-auto pointer-events-auto flex justify-between items-center">
                    <Link to="/products" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 shadow-lg">
                        <ArrowLeft size={18} /> {t('btn_back') || 'Back'}
                    </Link>
                </div>
            </div>

            {/* 1. CINEMATIC VIDEO HERO */}
            <div className="relative w-full min-h-[90vh] lg:h-[95vh] h-auto overflow-hidden">
                {/* Background Video */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center justify-center z-20 px-4 md:px-6 pt-24 md:pt-20">
                    <div className="container mx-auto grid lg:grid-cols-12 gap-6 md:gap-8 items-end">

                        {/* Hero Text Content (Left) */}
                        <div className="lg:col-span-8 space-y-6 lg:mb-12">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="bg-colestia-purple/80 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/20 shadow-[0_0_15px_rgba(122,30,166,0.5)]">
                                        {displayCategory}
                                    </span>
                                    {project.status === 'active' && (
                                        <span className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Now
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold text-white leading-[1.1] drop-shadow-2xl">
                                        {displayTitle}
                                    </h1>
                                </div>

                                <p className="text-base sm:text-lg md:text-2xl text-gray-200 font-light italic max-w-2xl leading-relaxed drop-shadow-lg border-l-4 border-colestia-purple pl-4 md:pl-6 py-2 bg-gradient-to-r from-black/60 to-transparent">
                                    "{displayTagline}"
                                </p>
                            </motion.div>

                            {/* Hero Actions */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => setTrailerOpen(true)}
                                    className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-white text-black font-bold text-base md:text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                >
                                    <Play size={18} fill="currentColor" /> {t('btn_trailer') || 'Watch Trailer'}
                                </button>
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={24} />}
                                </button>
                            </motion.div>
                        </div>

                        {/* Glass Stats Card (Right/Bottom) */}
                        <div className="lg:col-span-4 lg:mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-20 bg-colestia-purple/20 blur-[60px] rounded-full pointer-events-none" />

                                <div className="relative z-10 space-y-4 md:space-y-6">
                                    <div className="border-b border-white/10 pb-4 md:pb-6">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{t('label_raised') || 'Raised Amount'}</p>
                                        <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{formatCurrency(project.currentFunding)}</span>
                                            <span className="text-xs md:text-sm text-gray-500">/ {formatCurrency(project.goalFunding)}</span>
                                        </div>
                                        <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.percentage}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-colestia-purple to-colestia-cyan shadow-[0_0_10px_rgba(79,172,254,0.5)]"
                                            />
                                        </div>
                                        <p className="text-right text-colestia-cyan text-sm font-bold mt-1">{project.percentage}% Funded</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1 text-gray-400 text-[10px] md:text-xs uppercase tracking-wider">
                                                <Users size={14} /> Backers
                                            </div>
                                            <p className="text-lg md:text-2xl font-bold text-white">{formatNumber(project.investors)}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1 text-gray-400 text-[10px] md:text-xs uppercase tracking-wider">
                                                <Clock size={14} /> Time Left
                                            </div>
                                            <p className="text-lg md:text-2xl font-bold text-white">{daysLeft} <span className="text-sm font-normal text-gray-500">Days</span></p>
                                        </div>
                                    </div>

                                    <Button className="w-full py-3 md:py-4 text-base md:text-lg font-bold shadow-lg shadow-colestia-purple/20">
                                        Invest Now <ChevronRight size={20} className="ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Tabs & Grid) */}
            <div className="container mx-auto px-6 py-12 relative z-10 -mt-10">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Content (8 cols) */}
                    <div className="lg:col-span-8">
                        {/* Tab Headers */}
                        <div className="flex items-center gap-8 border-b border-white/10 mb-8 sticky top-20 bg-[#050505]/95 backdrop-blur z-30 pt-4">
                            {['Story', 'Rewards', 'Cast'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`pb-4 text-sm font-bold tracking-wide uppercase transition-colors relative ${activeTab === tab.toLowerCase() ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab.toLowerCase() && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-colestia-purple" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[400px]">
                            {activeTab === 'story' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                    <section>
                                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                            <div className="w-1 h-8 bg-colestia-purple rounded-full" />
                                            Synopsis
                                        </h3>
                                        <div className="prose prose-lg prose-invert text-gray-300 font-light leading-loose max-w-none">
                                            {displayDescription}
                                        </div>
                                    </section>

                                    <section className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5 hover:border-colestia-purple/30 transition-colors group">
                                            <Target className="text-colestia-purple mb-4 group-hover:scale-110 transition-transform" size={32} />
                                            <h4 className="text-xl font-bold text-white mb-3">Why this Project?</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm">
                                                {t('desc_opportunity').replace('{category}', displayCategory).replace('{title}', displayTitle)}
                                            </p>
                                        </div>
                                        <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                                            <Award className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                                            <h4 className="text-xl font-bold text-white mb-3">Exclusive Benefits</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm">
                                                Investors receive exclusive NFTs, premiere invites, and revenue share tokens.
                                            </p>
                                        </div>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'rewards' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
                                    {project.rewards && project.rewards.sort((a, b) => a.price - b.price).map((reward, idx) => (
                                        <div key={idx} className={`p-6 rounded-2xl border flex flex-col md:flex-row gap-6 relative overflow-hidden ${reward.tier === 'special' ? 'bg-gradient-to-br from-[#1a0f0f] to-black border-amber-500/30' : 'bg-[#0A0A0A] border-white/5'
                                            }`}>
                                            {reward.tier === 'special' && <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>}

                                            <div className="flex-1 z-10">
                                                <h4 className={`text-xl font-bold mb-2 ${reward.tier === 'special' ? 'text-amber-400' : 'text-white'}`}>
                                                    {language === 'th' ? reward.nameTh : reward.nameEn || reward.name}
                                                </h4>
                                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{language === 'th' ? reward.description : reward.descriptionEn}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(language === 'th' ? reward.items : reward.itemsEn || reward.items).map((item, i) => (
                                                        <span key={i} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                                                            <div className="w-1 h-1 bg-gray-500 rounded-full" /> {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="md:w-48 flex flex-col justify-center border-l border-white/5 md:pl-6 pl-0 pt-4 md:pt-0 z-10">
                                                <p className="text-2xl font-mono font-bold text-white mb-3">฿{reward.price.toLocaleString()}</p>
                                                <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all transform hover:scale-105 ${reward.tier === 'special' ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20' : 'bg-white text-black hover:bg-gray-200'
                                                    }`}>
                                                    Select Reward
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'cast' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-white/20 transition-colors">
                                            <div className="w-20 h-20 bg-white/10 rounded-full overflow-hidden">
                                                {/* Placeholder Cast Image */}
                                                <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">Cast Member {i}</p>
                                                <p className="text-xs text-gray-500">Character Name</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Project Info Box */}
                        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/10">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Project Details</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 text-sm">{t('label_director') || 'Director'}</span>
                                    <span className="text-white font-medium text-right">{project.director || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 text-sm">{t('label_studio') || 'Studio'}</span>
                                    <span className="text-white font-medium text-right">{project.studio || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 text-sm">{t('label_genre') || 'Genre'}</span>
                                    <span className="text-white font-medium text-right capitalize">{project.genre || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 text-sm">{t('label_end_date') || 'End Date'}</span>
                                    <span className="text-white font-medium text-right">{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                                <button onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors border border-white/5">
                                    <ExternalLink size={16} /> Portal
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors border border-white/5">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>

                        <div className="bg-colestia-blue/5 rounded-2xl p-6 border border-colestia-blue/10">
                            <div className="flex gap-3 mb-2">
                                <ShieldCheck className="text-colestia-blue" />
                                <h4 className="font-bold text-colestia-blue">Risk Disclaimer</h4>
                            </div>
                            <p className="text-xs text-colestia-blue/70 leading-relaxed">
                                {t('disclaimer_detail') || 'Investment involves risk. Please read the whitepaper.'}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modals */}
            <ExternalLinkModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                destination={t('modal_destination_portal')}
                url={project.link || "#"}
            />

            <AnimatePresence>
                {trailerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setTrailerOpen(false)}
                    >
                        <div className="relative w-full max-w-7xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setTrailerOpen(false)} className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/50 rounded-full p-2 transition-colors">
                                <X size={24} />
                            </button>
                            <video src={heroVideo} className="w-full h-full object-contain" controls autoPlay />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;

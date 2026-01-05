import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';
import ExternalLinkModal from '../components/ExternalLinkModal';
import { ArrowLeft, Play, AlertCircle, ExternalLink, X } from 'lucide-react';
import heroVideo from '../assets/hero.mp4';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { useLanguage } from '../context/LanguageContext';

// Mock Data Database
const projectData = {
    1: {
        title: "Velcurve House",
        titleTh: "เวลเคิร์ฟ เฮาส์",
        tagline: "The Future of Digital Production Spaces",
        taglineTh: "อนาคตของพื้นที่การผลิตสื่อดิจิทัล",
        category: "Real Estate Tokenization",
        categoryTh: "โทเคนอสังหาริมทรัพย์",
        description: "Fractional ownership of the premier production house studio in Bangkok. Velcurve House isn't just a studio; it's a creative ecosystem powered by blockchain. Investors gain exposure to the rising demand for high-quality digital content production facilities.",
        descriptionTh: "การเป็นเจ้าของร่วมในสตูดิโอโปรดักชั่นเฮาส์ชั้นนำในกรุงเทพฯ Velcurve House ไม่ใช่แค่สตูดิโอ แต่เป็นระบบนิเวศทางความคิดสร้างสรรค์ที่ขับเคลื่อนด้วยบล็อกเชน นักลงทุนจะได้รับโอกาสจากการเติบโตของความต้องการสิ่งอำนวยความสะดวกในการผลิตคอนเทนต์ดิจิทัลคุณภาพสูง",
        details: [
            { label: "Location", labelTh: "สถานที่", value: "Bangkok, Thailand", valueTh: "กรุงเทพฯ, ไทย" },
            { label: "Asset Value", labelTh: "มูลค่าสินทรัพย์", value: "$5,000,000", valueTh: "$5,000,000" },
            { label: "Token Type", labelTh: "ประเภทโทเคน", value: "Asset-Backed (Real Estate)", valueTh: "สินทรัพย์อ้างอิง (อสังหาฯ)" },
            { label: "Yield", labelTh: "ผลตอบแทน", value: "8-12% APY (Est.)", valueTh: "8-12% ต่อปี (ประมาณการ)" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
        link: "https://th-ico-portal.com/project/velcurve"
    },
    2: {
        title: "EcoEnergy Grid",
        titleTh: "อีโคเอเนอร์จี้ กริด",
        tagline: "Powering Tomorrow, Decentralized.",
        taglineTh: "พลังงานแห่งอนาคต แบบกระจายศูนย์",
        category: "Sustainable Tech",
        categoryTh: "เทคโนโลยีที่ยั่งยืน",
        description: "A blockchain-powered renewable energy distribution network allowing peer-to-peer energy trading. This project aims to democratize energy access in Southeast Asia.",
        descriptionTh: "เครือข่ายกระจายพลังงานหมุนเวียนที่ขับเคลื่อนด้วยบล็อกเชน ช่วยให้สามารถซื้อขายพลังงานแบบ Peer-to-Peer โครงการนี้มุ่งหวังที่จะสร้างความเป็นประชาธิปไตยในการเข้าถึงพลังงานในเอเชียตะวันออกเฉียงใต้",
        details: [
            { label: "Location", labelTh: "สถานที่", value: "Regional (SEA)", valueTh: "ภูมิภาค (SEA)" },
            { label: "Type", labelTh: "ประเภท", value: "Utility & Governance", valueTh: "ยูทิลิตี้ & การกำกับดูแล" },
            { label: "Stage", labelTh: "ระยะ", value: "Seed Round", valueTh: "รอบ Seed" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
        link: "https://investax.io/project/eco"
    },
    3: {
        title: "NextGen Media",
        titleTh: "เน็กซ์เจน มีเดีย",
        tagline: "Creators First.",
        taglineTh: "ผู้สร้างต้องมาก่อน",
        category: "Media & Entertainment",
        categoryTh: "สื่อและความบันเทิง",
        description: "Decentralized content creation platform for independent artists, cutting out the middlemen and ensuring fair revenue share via smart contracts.",
        descriptionTh: "แพลตฟอร์มสร้างสรรค์เนื้อหาแบบกระจายศูนย์สำหรับศิลปินอิสระ ตัดตัวกลางออกและรับประกันส่วนแบ่งรายได้ที่ยุติธรรมผ่าน Smart Contract",
        details: [
            { label: "Platform", labelTh: "แพลตฟอร์ม", value: "Web3 App", valueTh: "เว็บ3 แอป" },
            { label: "Token", labelTh: "โทเคน", value: "Utility", valueTh: "ยูทิลิตี้" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1598899134739-967b867b7463?q=80&w=2000&auto=format&fit=crop",
        link: "https://th-ico-portal.com/project/media"
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const project = projectData[id];
    const [modalOpen, setModalOpen] = useState(false);
    const [trailerOpen, setTrailerOpen] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (!project) return <div className="pt-32 text-center text-white">Project not found</div>;

    const displayTitle = language === 'th' && project.titleTh ? project.titleTh : project.title;
    const displayTagline = language === 'th' && project.taglineTh ? project.taglineTh : project.tagline;
    const displayCategory = language === 'th' && project.categoryTh ? project.categoryTh : project.category;
    const displayDescription = language === 'th' && project.descriptionTh ? project.descriptionTh : project.description;

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
                        src={project.videoPoster}
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
                </div>

                {/* Sidebar Stats */}
                <div className="h-fit">
                    <Spotlight className="w-full h-full rounded-2xl" size={400}>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 h-full relative overflow-hidden group">
                            {/* Decorative bg */}
                            <div className="absolute top-0 right-0 p-20 bg-colestia-purple/5 blur-[80px] rounded-full pointer-events-none" />

                            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 relative z-10">{t('title_data')}</h3>
                            <div className="space-y-6 relative z-10">
                                {project.details.map((detail, idx) => (
                                    <div key={idx} className="group/item">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 group-hover/item:text-colestia-purple transition-colors">
                                            {language === 'th' ? detail.labelTh : detail.label}
                                        </p>
                                        <p className="text-white font-medium text-lg">
                                            {language === 'th' ? detail.valueTh : detail.value}
                                        </p>
                                    </div>
                                ))}
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
                url={project.link}
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

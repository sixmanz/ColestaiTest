import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { BookOpen, ShieldAlert, Cpu, Film, TrendingUp, Users, ArrowRight, PlayCircle } from 'lucide-react';
import Spotlight from '../components/Spotlight';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t, language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('All');

    // Mock Categories
    const categories = ['All', 'Investment', 'Production', 'Technology', 'Legal'];

    // Mock Articles
    const articles = [
        {
            id: 1,
            title: "Film Investment 101: A Beginner's Guide",
            titleTh: "การลงทุนภาพยนตร์ 101: คู่มือสำหรับมือใหม่",
            category: "Investment",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80", // Money/Finance
            desc: "Understanding how film financing works, revenue waterfalls, and ROI expectations.",
            descTh: "ทำความเข้าใจโครงสร้างการเงินของภาพยนตร์ การแบ่งรายได้ และผลตอบแทนที่คาดหวัง"
        },
        {
            id: 2,
            title: "The 3 Stages of Film Production",
            titleTh: "3 ขั้นตอนหลักของการสร้างภาพยนตร์",
            category: "Production",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80", // Movie Camera
            desc: "From Pre-production to Post-production, learn what happens behind the scenes.",
            descTh: "ตั้งแต่การเตรียมงานสร้างไปจนถึงขั้นตอนหลังการถ่ายทำ เรียนรู้สิ่งที่เกิดขึ้นเบื้องหลังกองถ่าย"
        },
        {
            id: 3,
            title: "Web3 & The Future of Film Rights",
            titleTh: "Web3 และอนาคตของลิขสิทธิ์ภาพยนตร์",
            category: "Technology",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // Blockchain/NFT
            desc: "How NFTs and blockchain are revolutionizing intellectual property ownership in media.",
            descTh: "NFT และบล็อกเชนกำลังปฏิวัติการถือครองทรัพย์สินทางปัญญาในสื่อบันเทิงอย่างไร"
        },
        {
            id: 4,
            title: "How to Pitch Your Script to Investors",
            titleTh: "เทคนิคการเสนอขายบทภาพยนตร์ให้นายทุน",
            category: "Investment",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80", // Pitch/Meeting
            desc: "Key elements of a successful pitch deck and how to tell a compelling story.",
            descTh: "องค์ประกอบสำคัญของ Pitch Deck ที่ประสบความสำเร็จและวิธีการเล่าเรื่องที่ดึงดูดใจ"
        },
        {
            id: 5,
            title: "Legal Frameworks for Indie Filmmakers",
            titleTh: "กฎหมายเบื้องต้นสำหรับนักทำภาพยนตร์อิสระ",
            category: "Legal",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80", // Law/Justice
            desc: "Contracts, release forms, and copyright laws every filmmaker needs to know.",
            descTh: "สัญญา แบบฟอร์มอนุญาต และกฎหมายลิขสิทธิ์ที่นักทำภาพยนตร์ทุกคนควรรู้"
        },
        {
            id: 6,
            title: "Marketing Your Film in the Digital Age",
            titleTh: "การตลาดภาพยนตร์ในยุคดิจิทัล",
            category: "Production",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80", // Marketing/Social
            desc: "Leveraging social media and community building to promote your project.",
            descTh: "การใช้โซเชียลมีเดียและการสร้างชุมชนเพื่อโปรโมตโปรเจกต์ของคุณ"
        }
    ];

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(a => a.category === activeCategory);

    return (
        <div className="pt-28 pb-24 min-h-screen bg-black relative overflow-hidden">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-colestia-purple/20 border border-colestia-purple/30 text-colestia-purple text-sm font-medium mb-4">
                        <BookOpen size={16} />
                        <span>Learning Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        {language === 'th' ? "แหล่งเรียนรู้สำหรับนักสร้างสรรค์" : "Education & Resources"}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {language === 'th'
                            ? "รวมบทความและคู่มือเกี่ยวกับอุตสาหกรรมภาพยนตร์ การลงทุน และเทคโนโลยี"
                            : "Curated guides and insights on film industry, investment, and technology."}
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-gradient-to-r from-colestia-purple to-colestia-blue text-white shadow-lg shadow-colestia-purple/25'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Content Area - Top Row */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {filteredArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Spotlight className="h-full rounded-2xl" size={300}>
                                <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden h-full hover:border-colestia-purple/50 transition-colors group flex flex-col">
                                    {/* Image Wrapper */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                                            {article.category === 'Investment' && <TrendingUp size={12} className="text-emerald-400" />}
                                            {article.category === 'Production' && <Film size={12} className="text-amber-400" />}
                                            {article.category === 'Technology' && <Cpu size={12} className="text-blue-400" />}
                                            {article.category === 'Legal' && <ShieldAlert size={12} className="text-red-400" />}
                                            {article.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <span>{article.readTime}</span>
                                            <span>•</span>
                                            <span>{language === 'th' ? "บทความ" : "Article"}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-colestia-purple transition-colors">
                                            {language === 'th' ? article.titleTh : article.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                                            {language === 'th' ? article.descTh : article.desc}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:px-2 transition-all duration-300">
                                            {language === 'th' ? "อ่านต่อ" : "Read More"}
                                            <ArrowRight size={16} className="text-colestia-purple" />
                                        </div>
                                    </div>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </div>

                {/* Risk Section (Previously Existing Content - Kept at bottom as footer info) */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-16"
                >
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-900/10 to-black border border-red-500/20 p-8 rounded-3xl relative overflow-hidden">
                        <div className="flex items-start gap-4 relatie z-10">
                            <div className="p-3 bg-red-500/10 rounded-full shrink-0">
                                <ShieldAlert className="text-red-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-400 mb-2">
                                    {t('edu_risk_title')}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {language === 'th'
                                        ? "การลงทุนในสินทรัพย์ดิจิทัลและภาพยนตร์มีความเสี่ยงสูง อาจสูญเสียเงินลงทุนทั้งจำนวน โปรดศึกษาข้อมูลให้ครบถ้วนก่อนตัดสินใจลงทุน"
                                        : "Investing in digital assets and films involves high risks. You may lose the entire investment amount. Please study the information carefully before investing."}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default Education;

import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const News = () => {
    const { language } = useLanguage();

    const articles = [
        {
            id: 1,
            title: "Colestia Raises $5M Series A to Revolutionize Film Funding",
            titleTh: "Colestia ระดมทุน Series A กว่า 5 ล้านเหรียญฯ พลิกโฉมวงการทุนภาพยนตร์",
            date: "Jan 15, 2026",
            author: "Press Team",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
            category: "Corporate",
            excerpt: "We are thrilled to announce our latest funding round led by top venture capital firms to accelerate our mission.",
            excerptTh: "เรามีความยินดีที่จะประกาศความสำเร็จในการระดมทุนรอบล่าสุด นำโดยบริษัท VC ชั้นนำ เพื่อเร่งภารกิจของเรา"
        },
        {
            id: 2,
            title: "New Partnership with Major Streaming Platform",
            titleTh: "จับมือพันธมิตรใหม่กับแพลตฟอร์มสตรีมมิ่งระดับโลก",
            date: "Jan 10, 2026",
            author: "Partnerships",
            image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80",
            category: "Business",
            excerpt: "Colestia enables direct-to-stream distribution for funded projects through this strategic partnership.",
            excerptTh: "Colestia เปิดช่องทางจัดจำหน่ายตรงสู่สตรีมมิ่งสำหรับโปรเจกต์ที่ได้รับการระดมทุน ผ่านความร่วมมือเชิงกลยุทธ์ครั้งนี้"
        },
        {
            id: 3,
            title: "'The Last Horizon' Wins Audience Award at Sundance",
            titleTh: "'The Last Horizon' คว้ารางวัลขวัญใจผู้ชมที่ซันแดนซ์",
            date: "Dec 28, 2025",
            author: "Film News",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
            category: "Success Stories",
            excerpt: "One of our very first funded projects has received international acclaim at the prestigious festival.",
            excerptTh: "หนึ่งในโปรเจกต์แรกๆ ที่ได้รับการระดมทุนจากเรา ได้รับการยอมรับในระดับสากลที่เทศกาลภาพยนตร์อันทรงเกียรติ"
        },
        {
            id: 4,
            title: "How Web3 Technology is Changing Movie Rights",
            titleTh: "เทคโนโลยี Web3 เปลี่ยนแปลงลิขสิทธิ์ภาพยนตร์อย่างไร",
            date: "Dec 15, 2025",
            author: "Tech Team",
            image: "https://images.unsplash.com/photo-1639322537228-ad71c429d243?auto=format&fit=crop&w=800&q=80",
            category: "Technology",
            excerpt: "Exploring the impact of blockchain and smart contracts on intellectual property in the film industry.",
            excerptTh: "สำรวจผลกระทบของบล็อกเชนและ Smart Contracts ต่อทรัพย์สินทางปัญญาในอุตสาหกรรมภาพยนตร์"
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">News & Updates</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Latest stories, announcements, and insights from the Colestia team.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Spotlight className="h-full rounded-2xl" size={300}>
                                <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden h-full hover:border-colestia-purple/50 transition-colors group">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={language === 'th' ? article.titleTh : article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                            {article.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                            <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-colestia-purple transition-colors">
                                            {language === 'th' ? article.titleTh : article.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                            {language === 'th' ? article.excerptTh : article.excerpt}
                                        </p>
                                        <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-colestia-purple transition-colors">
                                            Read Article <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;

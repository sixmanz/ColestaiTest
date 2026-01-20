import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { Film, TrendingUp, Users, Globe, Video, Clapperboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const { language } = useLanguage();

    const services = [
        {
            icon: <TrendingUp size={32} />,
            title: "Film Financing",
            titleTh: "การระดมทุนภาพยนตร์",
            desc: "Connecting filmmakers with a global network of investors through our secure and transparent production-funding platform.",
            descTh: "เชื่อมโยงผู้สร้างภาพยนตร์กับเครือข่ายนักลงทุนทั่วโลกผ่านแพลตฟอร์มระดมทุนที่ปลอดภัยและโปร่งใส"
        },
        {
            icon: <Film size={32} />,
            title: "Production Support",
            titleTh: "สนับสนุนการผลิต",
            desc: "End-to-end production assistance, from pre-production planning to post-production coordination.",
            descTh: "บริการช่วยเหลือด้านการผลิตแบบครบวงจร ตั้งแต่การวางแผนก่อนการถ่ายทำไปจนถึงขั้นตอนหลังการผลิต"
        },
        {
            icon: <Globe size={32} />,
            title: "Global Distribution",
            titleTh: "การจัดจำหน่ายระดับโลก",
            desc: "Strategic partnerships with streaming platforms and theater chains to ensure your content reaches the widest audience.",
            descTh: "พันธมิตรเชิงกลยุทธ์กับแพลตฟอร์มสตรีมมิ่งและเครือข่ายโรงภาพยนตร์ เพื่อให้ผลงานของคุณเข้าถึงผู้ชมได้กว้างขวางที่สุด"
        },
        {
            icon: <Users size={32} />,
            title: "Talent Management",
            titleTh: "การบริหารจัดการนักแสดง",
            desc: "Representing and managing contracts for actors, directors, and key creative personnel.",
            descTh: "ดูแลและบริหารจัดการสัญญาสำหรับนักแสดง ผู้กำกับ และทีมงานสร้างสรรค์หลัก"
        },
        {
            icon: <Video size={32} />,
            title: "Equipments & Studio",
            titleTh: "อุปกรณ์และสตูดิโอ",
            desc: "Rental services for high-end camera gear, lighting, and sound stages for productions of any scale.",
            descTh: "บริการเช่าอุปกรณ์กล้อง ไฟ และสตูดิโอถ่ายทำระดับไฮเอนด์ สำหรับการผลิตทุกขนาด"
        },
        {
            icon: <Clapperboard size={32} />,
            title: "IP Licensing",
            titleTh: "ลิขสิทธิ์ทรัพย์สินทางปัญญา",
            desc: "Legal and commercial support for licensing movie rights, merchandise, and adaptations.",
            descTh: "สนับสนุนด้านกฎหมายและธุรกิจสำหรับการขายลิขสิทธิ์ภาพยนตร์ สินค้าที่ระลึก และการดัดแปลงผลงาน"
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-black relative">
            <InteractiveGrid />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Our Services</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Colestia is more than just a crowdfunding platform. We offer a comprehensive ecosystem
                        designed to empower filmmakers and protect investors.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Spotlight className="h-full rounded-2xl" size={200}>
                                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl h-full hover:border-colestia-blue/50 transition-colors group">
                                    <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-colestia-blue mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {language === 'th' ? service.titleTh : service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {language === 'th' ? service.descTh : service.desc}
                                    </p>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

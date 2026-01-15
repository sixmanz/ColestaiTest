import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Film, CheckCircle, Loader } from 'lucide-react';
import InteractiveGrid from '../components/InteractiveGrid';
import Spotlight from '../components/Spotlight';
import { useLanguage } from '../context/LanguageContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectTitle: '',
        projectType: 'feature_film',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                status: 'new',
                createdAt: serverTimestamp()
            });
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                projectTitle: '',
                projectType: 'feature_film',
                budget: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting contact:', error);
            alert(t('contact_error') || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="pt-28 pb-24 min-h-screen bg-black relative overflow-hidden">
                <InteractiveGrid />
                <div className="container mx-auto px-6 max-w-2xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">{t('contact_success_title') || 'ส่งข้อความสำเร็จ!'}</h1>
                        <p className="text-xl text-gray-400 mb-8">{t('contact_success_message') || 'ทีมงานจะติดต่อกลับภายใน 24-48 ชั่วโมง'}</p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
                        >
                            {t('contact_send_another') || 'ส่งข้อความอีกครั้ง'}
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-24 min-h-screen bg-black relative overflow-hidden">
            <InteractiveGrid />
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm mb-6">
                        <Film className="text-purple-400" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{t('contact_title') || 'ติดต่อเรา'}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('contact_subtitle') || 'สนใจนำหนังมาลงทุน หรือต้องการร่วมงานกับเรา? ส่งรายละเอียดให้เราได้เลย'}</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <Spotlight className="rounded-2xl" size={200}>
                            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 h-full">
                                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                                    <Mail className="text-purple-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{t('contact_email_label') || 'อีเมล'}</h3>
                                <p className="text-gray-400">contact@colestia.com</p>
                            </div>
                        </Spotlight>

                        <Spotlight className="rounded-2xl" size={200}>
                            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 h-full">
                                <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                                    <Phone className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{t('contact_phone_label') || 'โทรศัพท์'}</h3>
                                <p className="text-gray-400">+66 2 123 4567</p>
                            </div>
                        </Spotlight>

                        <Spotlight className="rounded-2xl" size={200}>
                            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 h-full">
                                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mb-4">
                                    <MapPin className="text-emerald-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{t('contact_address_label') || 'ที่อยู่'}</h3>
                                <p className="text-gray-400 text-sm">Colestia Studios, Bangkok, Thailand</p>
                            </div>
                        </Spotlight>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <Spotlight className="rounded-3xl" size={400}>
                            <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Film className="text-purple-400" size={24} />
                                    {t('contact_form_title') || 'ส่งข้อเสนอโปรเจกต์'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_name') || 'ชื่อ-นามสกุล'} *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="เช่น สมชาย ใจดี"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_email') || 'อีเมล'} *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="example@email.com"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_phone') || 'เบอร์โทรศัพท์'}</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="08X-XXX-XXXX"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_project_title') || 'ชื่อโปรเจกต์'}</label>
                                            <input
                                                type="text"
                                                name="projectTitle"
                                                value={formData.projectTitle}
                                                onChange={handleInputChange}
                                                placeholder="ชื่อภาพยนตร์หรือซีรีส์"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_project_type') || 'ประเภทโปรเจกต์'}</label>
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            >
                                                <option value="feature_film">{t('contact_type_feature') || 'ภาพยนตร์โรง'}</option>
                                                <option value="series">{t('contact_type_series') || 'ซีรีส์'}</option>
                                                <option value="documentary">{t('contact_type_doc') || 'สารคดี'}</option>
                                                <option value="short_film">{t('contact_type_short') || 'หนังสั้น'}</option>
                                                <option value="other">{t('contact_type_other') || 'อื่นๆ'}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_budget') || 'งบประมาณโดยประมาณ'}</label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            >
                                                <option value="">{t('contact_budget_select') || 'เลือกช่วงงบประมาณ'}</option>
                                                <option value="under_1m">{t('contact_budget_1') || 'ต่ำกว่า 1 ล้านบาท'}</option>
                                                <option value="1m_5m">{t('contact_budget_2') || '1 - 5 ล้านบาท'}</option>
                                                <option value="5m_10m">{t('contact_budget_3') || '5 - 10 ล้านบาท'}</option>
                                                <option value="10m_50m">{t('contact_budget_4') || '10 - 50 ล้านบาท'}</option>
                                                <option value="over_50m">{t('contact_budget_5') || 'มากกว่า 50 ล้านบาท'}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact_message') || 'ข้อความ / รายละเอียดโปรเจกต์'} *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            placeholder="บอกเราเกี่ยวกับโปรเจกต์ของคุณ เช่น เนื้อเรื่องย่อ ทีมงาน สถานะปัจจุบัน..."
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">{t('contact_message_hint') || 'แนะนำให้ระบุรายละเอียดโปรเจกต์ให้มากที่สุด'}</p>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-colestia-purple to-colestia-blue text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-colestia-purple/30"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader className="animate-spin" size={20} />
                                                {t('contact_sending') || 'กำลังส่ง...'}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                {t('contact_submit') || 'ส่งข้อเสนอ'}
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-xs text-gray-500 text-center">
                                        {t('contact_privacy') || 'ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้ติดต่อกลับเท่านั้น'}
                                    </p>
                                </form>
                            </div>
                        </Spotlight>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

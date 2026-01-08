import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Search, Loader, Newspaper, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Static mockup data for News
const initialNews = [
    {
        id: '1',
        title: 'Colestia เปิดตัวโปรเจค Space Wars Eternal อย่างเป็นทางการ',
        titleEn: 'Colestia Officially Launches Space Wars Eternal Project',
        summary: 'โปรเจคภาพยนตร์ไซไฟครั้งแรกของไทยที่ระดมทุนผ่าน Blockchain',
        content: 'Colestia ประกาศเปิดตัวโปรเจค Space Wars Eternal ภาพยนตร์ไซไฟครั้งแรกของไทยที่ใช้เทคโนโลยี Blockchain ในการระดมทุนจากนักลงทุน...',
        image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=500',
        status: 'published',
        createdAt: '2026-01-05'
    },
    {
        id: '2',
        title: 'ปรัชญา ปิ่นแก้ว เข้าร่วมเป็น Director ใน Colestia',
        titleEn: 'Prachya Pinkaew Joins Colestia as Director',
        summary: 'ผู้กำกับชื่อดังจากหนัง องค์บาก เข้าร่วมทีม Colestia',
        content: 'ปรัชญา ปิ่นแก้ว ผู้กำกับภาพยนตร์ชื่อดังของไทย ผู้สร้างสรรค์ผลงานอย่าง องค์บาก และ ต้มยำกุ้ง ได้เข้าร่วมกับ Colestia...',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500',
        status: 'published',
        createdAt: '2026-01-03'
    },
    {
        id: '3',
        title: 'Colestia ได้รับการสนับสนุนจาก SEC',
        titleEn: 'Colestia Receives Support from SEC',
        summary: 'สำนักงาน ก.ล.ต. ให้การสนับสนุน Colestia ในฐานะ Digital Asset Platform',
        content: 'สำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (ก.ล.ต.) ได้ให้การรับรอง Colestia...',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        status: 'draft',
        createdAt: '2026-01-01'
    }
];

const AdminNews = () => {
    const { t } = useLanguage();
    const [news, setNews] = useState(initialNews);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '', titleEn: '', summary: '', content: '', image: '', status: 'draft'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ title: '', titleEn: '', summary: '', content: '', image: '', status: 'draft' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setNews(news.map(n => n.id === editingItem.id ? { ...formData, id: editingItem.id } : n));
            alert('News updated! (Mockup Mode)');
        } else {
            const newItem = { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] };
            setNews([newItem, ...news]);
            alert('News created! (Mockup Mode)');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm(t('admin_confirm_delete'))) {
            setNews(news.filter(n => n.id !== id));
        }
    };

    const togglePublish = (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published';
        setNews(news.map(n => n.id === item.id ? { ...n, status: newStatus } : n));
    };

    const filteredNews = news.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.titleEn?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_manage_news')}</h2>
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('admin_search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                        <Plus size={20} />
                        {t('admin_add_news')}
                    </button>
                </div>
            </div>

            {/* News Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Newspaper size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {item.status || 'draft'}
                                    </span>
                                    <span className="text-xs text-gray-500">{item.createdAt}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => togglePublish(item)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                                    >
                                        {item.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-purple-600"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {filteredNews.length === 0 && !isLoading && (
                <div className="text-center py-12 text-gray-500">No news found. Create one to get started.</div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingItem ? 'Edit News' : 'New News'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (Thai)</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="เช่น Colestia เปิดตัวโปรเจคใหม่"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">หัวข้อข่าวภาษาไทย (ไม่เกิน 150 ตัวอักษร)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (English)</label>
                                    <input
                                        type="text"
                                        name="titleEn"
                                        value={formData.titleEn}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Colestia Launches New Project"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">News title in English (max 150 characters)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/news-image.jpg"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">📸 ขนาดแนะนำ: 1200 x 630 px (อัตราส่วน 1.91:1) | รูปแบบ: JPG, PNG | ขนาดไฟล์: ไม่เกิน 2MB</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</label>
                                    <input
                                        type="text"
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleInputChange}
                                        placeholder="สรุปย่อเนื้อหาข่าว..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">สรุปย่อสำหรับแสดงในหน้ารวมข่าว (แนะนำ 80-150 ตัวอักษร)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={6}
                                        required
                                        placeholder="เนื้อหาข่าวฉบับเต็ม..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">เนื้อหาข่าวเต็ม (แนะนำ 500-2000 ตัวอักษร) | สามารถใช้ HTML tags ได้</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="draft">Draft (ฉบับร่าง)</option>
                                        <option value="published">Published (เผยแพร่แล้ว)</option>
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Draft = ยังไม่แสดง | Published = แสดงบนเว็บไซต์</p>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {editingItem ? 'Update News' : 'Create News'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNews;

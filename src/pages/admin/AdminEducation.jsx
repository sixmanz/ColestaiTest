import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Search, Loader, BookOpen, Eye, EyeOff, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Static mockup data for Education/Learning Hub
const initialEducation = [
    {
        id: '1',
        title: 'พื้นฐานการลงทุนในภาพยนตร์',
        titleEn: 'Basics of Film Investment',
        summary: 'เรียนรู้พื้นฐานการลงทุนในอุตสาหกรรมภาพยนตร์ ความเสี่ยง และผลตอบแทนที่คาดหวัง',
        content: 'การลงทุนในภาพยนตร์เป็นการลงทุนทางเลือกที่น่าสนใจ โดยมีโอกาสได้รับผลตอบแทนสูง แต่ก็มาพร้อมกับความเสี่ยง...',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500',
        videoUrl: '',
        difficulty: 'beginner',
        status: 'published',
        createdAt: '2026-01-05'
    },
    {
        id: '2',
        title: 'Blockchain กับอุตสาหกรรมบันเทิง',
        titleEn: 'Blockchain in Entertainment Industry',
        summary: 'เข้าใจการใช้ Blockchain ในอุตสาหกรรมบันเทิงและภาพยนตร์',
        content: 'เทคโนโลยี Blockchain กำลังปฏิวัติวิธีการระดมทุนและการกระจายรายได้ในอุตสาหกรรมบันเทิง...',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        difficulty: 'intermediate',
        status: 'published',
        createdAt: '2026-01-03'
    },
    {
        id: '3',
        title: 'การวิเคราะห์โปรเจคภาพยนตร์ก่อนลงทุน',
        titleEn: 'Analyzing Film Projects Before Investing',
        summary: 'วิธีการวิเคราะห์และประเมินโปรเจคภาพยนตร์ก่อนตัดสินใจลงทุน',
        content: 'ก่อนลงทุนในโปรเจคภาพยนตร์ใดๆ นักลงทุนควรพิจารณาปัจจัยหลายประการ ได้แก่ ทีมงานผู้สร้าง งบประมาณ...',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        videoUrl: '',
        difficulty: 'advanced',
        status: 'draft',
        createdAt: '2026-01-01'
    }
];

const AdminEducation = () => {
    const { t } = useLanguage();
    const [education, setEducation] = useState(initialEducation);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '', titleEn: '', summary: '', content: '', image: '', videoUrl: '', difficulty: 'beginner', status: 'draft'
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
            setFormData({ title: '', titleEn: '', summary: '', content: '', image: '', videoUrl: '', difficulty: 'beginner', status: 'draft' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setEducation(education.map(n => n.id === editingItem.id ? { ...formData, id: editingItem.id } : n));
            alert(t('msg_edu_updated'));
        } else {
            const newItem = { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] };
            setEducation([newItem, ...education]);
            alert(t('msg_edu_created'));
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm(t('msg_edu_delete_confirm'))) {
            setEducation(education.filter(n => n.id !== id));
        }
    };

    const togglePublish = (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published';
        setEducation(education.map(n => n.id === item.id ? { ...n, status: newStatus } : n));
    };

    const filteredEducation = education.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-700';
            case 'intermediate': return 'bg-yellow-100 text-yellow-700';
            case 'advanced': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_edu_management')}</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    {t('admin_add_edu_content')}
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={t('admin_search_edu')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
            </div>

            {/* Education Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEducation.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <BookOpen size={48} />
                                    </div>
                                )}
                                {item.videoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                                            <Play size={32} className="text-purple-600 ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}>
                                        {item.difficulty === 'beginner' ? t('admin_diff_beginner') :
                                            item.difficulty === 'intermediate' ? t('admin_diff_intermediate') :
                                                t('admin_diff_advanced')}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {item.status === 'published' ? t('admin_status_published') : t('admin_status_draft')}
                                    </span>
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

            {filteredEducation.length === 0 && !isLoading && (
                <div className="text-center py-12 text-gray-500">{t('admin_no_edu_found')}</div>
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
                                    {editingItem ? t('admin_modal_edit_edu') : t('admin_modal_new_edu')}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_form_title_th')}</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_form_title_en')}</label>
                                    <input
                                        type="text"
                                        name="titleEn"
                                        value={formData.titleEn}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_label_difficulty')}</label>
                                        <select
                                            name="difficulty"
                                            value={formData.difficulty}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            <option value="beginner">{t('admin_diff_beginner')}</option>
                                            <option value="intermediate">{t('admin_diff_intermediate')}</option>
                                            <option value="advanced">{t('admin_diff_advanced')}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_header_status')}</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            <option value="draft">{t('admin_status_draft')}</option>
                                            <option value="published">{t('admin_status_published')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_form_image_url')}</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_help_video_url')}</label>
                                    <input
                                        type="url"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_form_summary')}</label>
                                    <input
                                        type="text"
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_form_content')}</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={6}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {editingItem ? t('admin_btn_update_edu') : t('admin_btn_create_edu')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminEducation;

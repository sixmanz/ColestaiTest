import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Search, Loader, FileText, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AdminArticles = () => {
    const { t } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [formData, setFormData] = useState({
        title: '', content: '', summary: '', image: '', category: 'news', status: 'draft'
    });

    const articlesCollectionRef = collection(db, "articles");

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (isLoading) setIsLoading(false);
        }, 5000);

        const unsubscribe = onSnapshot(articlesCollectionRef, (snapshot) => {
            setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching articles:", error);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (article = null) => {
        if (article) {
            setEditingArticle(article);
            setFormData(article);
        } else {
            setEditingArticle(null);
            setFormData({ title: '', content: '', summary: '', image: '', category: 'news', status: 'draft' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArticle) {
                await updateDoc(doc(db, 'articles', editingArticle.id), { ...formData, updatedAt: serverTimestamp() });
                alert(t('msg_article_updated'));
            } else {
                await addDoc(articlesCollectionRef, { ...formData, createdAt: serverTimestamp() });
                alert(t('msg_article_created'));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving article:", error);
            alert(t('msg_article_save_error'));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('msg_article_delete_confirm'))) {
            await deleteDoc(doc(db, 'articles', id));
        }
    };

    const togglePublish = async (article) => {
        const newStatus = article.status === 'published' ? 'draft' : 'published';
        await updateDoc(doc(db, 'articles', article.id), { status: newStatus });
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' || article.category === activeTab;
        return matchesSearch && matchesTab;
    });

    const tabs = [
        { id: 'all', label: t('admin_tab_all') },
        { id: 'news', label: t('admin_tab_news') },
        { id: 'learning_hub', label: t('admin_tab_learning_hub') }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_content_management')}</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    {t('admin_add_article')}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-medium transition-colors ${activeTab === tab.id
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={t('admin_search_articles')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
            </div>

            {/* Articles Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                                {article.image ? (
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <FileText size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${article.category === 'news' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {article.category === 'learning_hub' ? t('admin_tab_learning_hub') : t('admin_tab_news')}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${article.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {article.status === 'published' ? t('admin_status_published') : t('admin_status_draft')}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{article.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{article.summary || article.content?.substring(0, 100)}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => togglePublish(article)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                                    >
                                        {article.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button
                                        onClick={() => openModal(article)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-purple-600"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.id)}
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

            {filteredArticles.length === 0 && !isLoading && (
                <div className="text-center py-12 text-gray-500">{t('admin_no_articles')}</div>
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
                                    {editingArticle ? t('admin_modal_edit_article') : t('admin_modal_new_article')}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_label_title')}</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin_label_category')}</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            <option value="news">{t('admin_tab_news')}</option>
                                            <option value="learning_hub">{t('admin_tab_learning_hub')}</option>
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
                                    {editingArticle ? t('admin_btn_update_article') : t('admin_btn_create_article')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminArticles;

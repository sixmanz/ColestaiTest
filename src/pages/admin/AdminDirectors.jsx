import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Upload, User } from 'lucide-react';
import { useDirectors } from '../../hooks/useDirectors';
import { useLanguage } from '../../context/LanguageContext';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminDirectors = () => {
    const { directors, isLoading } = useDirectors();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDirector, setEditingDirector] = useState(null);
    const [formData, setFormData] = useState({
        name: '', role: '', bio: '', bioEn: '', works: '', worksEn: '', img: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (director = null) => {
        if (director) {
            setEditingDirector(director);
            setFormData(director);
        } else {
            setEditingDirector(null);
            setFormData({ name: '', role: '', bio: '', bioEn: '', works: '', worksEn: '', img: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDirector) {
                await updateDoc(doc(db, 'directors', editingDirector.id), formData);
                alert('Director updated successfully!');
            } else {
                await addDoc(collection(db, 'directors'), formData);
                alert('Director added successfully!');
            }
            setIsModalOpen(false);
            window.location.reload(); // Simple reload to refresh data
        } catch (error) {
            console.error("Error saving director: ", error);
            alert('Error saving director');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('admin_confirm_delete'))) {
            try {
                await deleteDoc(doc(db, 'directors', id));
                window.location.reload();
            } catch (error) {
                console.error("Error deleting director: ", error);
            }
        }
    };

    const filteredDirectors = directors.filter(director =>
        director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        director.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('admin_manage_directors')}</h2>
                </div>
                <div className="flex items-center gap-4">
                    {/* Search Box */}
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
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
                    >
                        <Plus size={20} />
                        <span>{t('admin_add_director')}</span>
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('admin_name')}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('admin_role')}</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('admin_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredDirectors.map((director) => (
                                <tr key={director.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                                <img src={director.img} alt={director.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">{director.name}</h4>
                                                <p className="text-xs text-gray-500 truncate max-w-[200px]">{director.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        {director.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openModal(director)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(director.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingDirector ? 'Edit Director' : 'Add New Director'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="e.g. Christopher Nolan"
                                            required
                                        />
                                        <p className="text-xs text-gray-400 mt-1">ชื่อ-นามสกุล (ไม่เกิน 50 ตัวอักษร)</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="e.g. Director / Producer"
                                            required
                                        />
                                        <p className="text-xs text-gray-400 mt-1">ตำแหน่ง (เช่น Director, Producer, Screenwriter)</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image URL</label>
                                        <input
                                            type="text"
                                            name="img"
                                            value={formData.img}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="https://example.com/profile.jpg"
                                            required
                                        />
                                        <p className="text-xs text-gray-400 mt-1">📸 ขนาดแนะนำ: 400 x 400 px (สี่เหลี่ยม) | รูปแบบ: JPG, PNG | ขนาดไฟล์: ไม่เกิน 1MB</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Works (Thai)</label>
                                        <textarea
                                            name="works"
                                            value={formData.works}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-24"
                                            placeholder="เช่น องค์บาก, ต้มยำกุ้ง, ช็อคโกแลต"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">ผลงานที่ผ่านมา (คั่นด้วย comma)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Works (English)</label>
                                        <textarea
                                            name="worksEn"
                                            value={formData.worksEn}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-24"
                                            placeholder="e.g. Ong-Bak, Tom Yum Goong, Chocolate"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Previous works (comma separated)</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biography (Thai)</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-32"
                                            placeholder="ประวัติและผลงานเด่น..."
                                        />
                                        <p className="text-xs text-gray-400 mt-1">ประวัติย่อภาษาไทย (แนะนำ 100-300 ตัวอักษร)</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biography (English)</label>
                                        <textarea
                                            name="bioEn"
                                            value={formData.bioEn}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-32"
                                            placeholder="Biography and notable achievements..."
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Short biography in English (recommended 100-300 characters)</p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/20 transition-all font-medium flex items-center gap-2"
                                    >
                                        <Save size={18} />
                                        <span>{editingDirector ? 'Update Director' : 'Create Director'}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDirectors;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Search, Loader } from 'lucide-react';
import { projects as initialProjects, comingSoonMovies } from '../../data/projectsData';
import { useLanguage } from '../../context/LanguageContext';

// Import Firestore functions if they were used (keeping imports clean although we use mock data)
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { db } from '../../config/firebase';

const AdminProjects = () => {
    const { t } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        titleTh: '', titleEn: '', genre: '', description: '', descriptionEn: '',
        poster: '', goalFunding: '', currentFunding: 0, percentage: 0,
        startDate: '', endDate: '', director: '', status: 'active'
    });

    useEffect(() => {
        // Use static data directly (mockup mode)
        const allProjects = [...initialProjects, ...comingSoonMovies].map((p, index) => ({
            ...p,
            id: p.id?.toString() || `project-${index}`
        }));
        setProjects(allProjects);
        setIsLoading(false);
    }, []);

    // Filter projects based on search query
    const filteredBySearch = projects.filter(project => {
        const query = searchQuery.toLowerCase();
        return (
            project.titleEn?.toLowerCase().includes(query) ||
            project.titleTh?.toLowerCase().includes(query) ||
            project.genre?.toLowerCase().includes(query) ||
            project.director?.toLowerCase().includes(query)
        );
    });

    // New state for status filter
    const [statusFilter, setStatusFilter] = useState('active');

    // Displayed projects based on status filter
    const filteredProjects = filteredBySearch.filter(project => {
        if (statusFilter === 'all') return true;

        // Map dropdown values to project status logic
        if (statusFilter === 'active') return !['finished', 'coming_soon'].includes(project.status);
        if (statusFilter === 'coming_soon') return project.status === 'coming_soon';
        if (statusFilter === 'finished') return project.status === 'finished';

        return true;
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData(project);
        } else {
            setEditingProject(null);
            setFormData({
                titleTh: '', titleEn: '', genre: '', description: '', descriptionEn: '',
                poster: '', goalFunding: '', currentFunding: 0, percentage: 0,
                startDate: '', endDate: '', director: '', status: 'active'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProject) {
                // Mock Update
                setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: editingProject.id } : p));
            } else {
                // Mock Create
                const newProject = { ...formData, id: `new-${Date.now()}` };
                setProjects([...projects, newProject]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Error saving project: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('admin_confirm_delete'))) {
            try {
                // Mock Delete
                setProjects(projects.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-purple-600" size={32} /></div>;

    return (
        <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('admin_manage_projects')}</h2>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    {/* Status Filter Dropdown */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 border border-purple-200 dark:border-purple-900/50 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                        >
                            <option value="active">🟢 กำลังระดมทุน (Active)</option>
                            <option value="coming_soon">🟡 กำลังจะเปิด (Coming Soon)</option>
                            <option value="finished">🔴 ปิดระดมทุนแล้ว (Finished)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>

                    {/* Search Box */}
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('admin_search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
                        />
                    </div>

                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all font-medium whitespace-nowrap"
                    >
                        <Plus size={20} />
                        {t('admin_add_project')}
                    </button>
                </div>
            </div>

            {/* Unified Projects List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500 px-1">
                    <span>Showing <span className="font-bold text-gray-900 dark:text-white">{filteredProjects.length}</span> projects in <span className="font-bold text-gray-700 dark:text-gray-300">
                        {statusFilter === 'active' ? 'Active Fundraising' :
                            statusFilter === 'coming_soon' ? 'Coming Soon' :
                                statusFilter === 'finished' ? 'Closed Fundraising' : 'All Projects'}
                    </span></span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`p-4 rounded-xl shadow-sm border transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden group
                                    ${project.status === 'finished' ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-90' :
                                        project.status === 'coming_soon' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30' :
                                            'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-md'}`}
                            >
                                <div className={`absolute top-0 left-0 w-1 h-full 
                                    ${project.status === 'finished' ? 'bg-gray-400' :
                                        project.status === 'coming_soon' ? 'bg-amber-400' : 'bg-gradient-to-b from-green-500 to-emerald-600'}`}>
                                </div>

                                {/* Image */}
                                <div className="w-full md:w-48 h-32 md:h-full shrink-0">
                                    <img
                                        src={project.poster}
                                        alt={project.titleEn}
                                        className={`w-full h-full object-cover rounded-lg shadow-sm ${project.status === 'finished' ? 'grayscale group-hover:grayscale-0 transition-all' : ''}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                                    {/* Title & Dates */}
                                    <div className="col-span-1 lg:col-span-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{project.titleEn}</h4>
                                            {project.status !== 'active' && (
                                                <span className={`text-[10px] px-2 py-0.5 rounded border 
                                                    ${project.status === 'coming_soon' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-gray-200 text-gray-600 border-gray-300'}`}>
                                                    {project.status === 'coming_soon' ? 'Coming Soon' : 'Finished'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">{project.titleTh}</p>
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 rounded-full ${project.status === 'coming_soon' ? 'bg-amber-400' : 'bg-green-500'}`}></span>
                                                Start: {new Date(project.startDate).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-red-400' : 'bg-gray-400'}`}></span>
                                                End: {new Date(project.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Financial Stats */}
                                    <div className="col-span-1 lg:col-span-2 space-y-3">
                                        <div className="flex justify-between items-end text-sm">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-0.5">Raised Amount</p>
                                                <p className="font-bold text-gray-900 dark:text-white text-lg">฿{project.currentFunding?.toLocaleString() || 0}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500 text-xs mb-0.5">Goal</p>
                                                <p className="font-medium text-gray-600 dark:text-gray-300">฿{project.goalFunding?.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 item-center justify-between">
                                                <div className="text-right">
                                                    <span className={`text-xs font-semibold inline-block 
                                                        ${project.status === 'finished' ? 'text-gray-600' :
                                                            project.status === 'coming_soon' ? 'text-amber-600' : 'text-purple-600 dark:text-purple-400'}`}>
                                                        {project.percentage}% Funded
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                                                <div style={{ width: `${project.percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500
                                                    ${project.status === 'finished' ? 'bg-gray-500' :
                                                        project.status === 'coming_soon' ? 'bg-amber-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md">
                                                👥 {project.investors?.toLocaleString() || 0} Investors
                                            </div>
                                            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md mb-2 md:mb-0">
                                                🎬 {project.genre}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex md:flex-col gap-2 justify-end">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Edit2 size={16} /> Edit Details
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Trash2 size={16} /> Delete Project
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-500">
                            <Search size={48} className="mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No projects found</p>
                            <p className="text-sm">Try changing the filter or search query</p>
                        </div>
                    )}
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
                            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingProject ? 'Edit Project' : 'New Project'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title (EN)</label>
                                        <input required name="titleEn" value={formData.titleEn} onChange={handleInputChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="e.g. Space Wars Eternal" />
                                        <p className="text-xs text-gray-400 mt-1">ชื่อภาษาอังกฤษ (ไม่เกิน 100 ตัวอักษร)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title (TH)</label>
                                        <input required name="titleTh" value={formData.titleTh} onChange={handleInputChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="เช่น สงครามอวกาศนิรันดร์" />
                                        <p className="text-xs text-gray-400 mt-1">ชื่อภาษาไทย (ไม่เกิน 100 ตัวอักษร)</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (EN)</label>
                                    <textarea required name="descriptionEn" value={formData.descriptionEn} onChange={handleInputChange} rows="3" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="Project description in English..." />
                                    <p className="text-xs text-gray-400 mt-1">คำอธิบายโปรเจกต์ภาษาอังกฤษ (แนะนำ 150-500 ตัวอักษร)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (TH)</label>
                                    <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="คำอธิบายโปรเจกต์ภาษาไทย..." />
                                    <p className="text-xs text-gray-400 mt-1">คำอธิบายโปรเจกต์ภาษาไทย (แนะนำ 150-500 ตัวอักษร)</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genre</label>
                                        <input name="genre" value={formData.genre} onChange={handleInputChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="e.g. Sci-Fi, Drama, Action" />
                                        <p className="text-xs text-gray-400 mt-1">ประเภทหนัง (คั่นด้วย comma ถ้ามีหลายประเภท)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                                            <option value="active">Active (กำลังระดมทุน)</option>
                                            <option value="finished">Finished (สำเร็จแล้ว)</option>
                                            <option value="coming_soon">Coming Soon (เร็วๆ นี้)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Poster URL</label>
                                    <input required name="poster" value={formData.poster} onChange={handleInputChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="https://example.com/poster.jpg" />
                                    <p className="text-xs text-gray-400 mt-1">📸 ขนาดแนะนำ: 800 x 1200 px (อัตราส่วน 2:3) | รูปแบบ: JPG, PNG, WebP | ขนาดไฟล์: ไม่เกิน 2MB</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Goal Funding</label>
                                        <input type="number" name="goalFunding" value={formData.goalFunding} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="10000000" />
                                        <p className="text-xs text-gray-400 mt-1">เป้าหมาย (บาท)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current</label>
                                        <input type="number" name="currentFunding" value={formData.currentFunding} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="5000000" />
                                        <p className="text-xs text-gray-400 mt-1">ปัจจุบัน (บาท)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Percent</label>
                                        <input type="number" name="percentage" value={formData.percentage} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="50" />
                                        <p className="text-xs text-gray-400 mt-1">ความคืบหน้า (%)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
                                        <p className="text-xs text-gray-400 mt-1">วันเริ่มต้นระดมทุน</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
                                        <p className="text-xs text-gray-400 mt-1">วันสิ้นสุดระดมทุน</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30"
                                    >
                                        <Save size={18} />
                                        Save Project
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

export default AdminProjects;

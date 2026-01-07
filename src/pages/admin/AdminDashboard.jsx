import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Film, Database, Loader } from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { collection, getDocs, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { projects as initialProjects, comingSoonMovies } from '../../data/projectsData';
import { directors as initialDirectors } from '../../data/creatorsData';
import { teamMembers as initialTeam } from '../../data/teamData';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}>
                <Icon className={`text-${color}-600 dark:text-${color}-400`} size={24} />
            </div>
            <span className={`text-sm font-medium text-${color}-600 bg-${color}-50 px-2 py-1 rounded-full`}>
                +12%
            </span>
        </div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </motion.div>
);

const AdminDashboard = () => {
    const { stats, isLoading } = useDashboardStats();
    const [seeding, setSeeding] = useState(false);

    const seedDatabase = async () => {
        setSeeding(true);
        try {
            // Seed Projects
            const projectsRef = collection(db, 'projects');
            const projectsSnap = await getDocs(projectsRef);
            if (projectsSnap.empty) {
                const allProjects = [...initialProjects, ...comingSoonMovies];
                for (const project of allProjects) {
                    await addDoc(projectsRef, { ...project, type: project.status || 'active' });
                }
                console.log('Seeded projects');
            }

            // Seed Directors (with URL fallback for images)
            const directorsRef = collection(db, 'directors');
            const directorsSnap = await getDocs(directorsRef);
            if (directorsSnap.empty) {
                for (const director of initialDirectors) {
                    // Convert imported image to string or use placeholder
                    const directorData = {
                        ...director,
                        img: typeof director.img === 'string' ? director.img : 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(director.name)
                    };
                    await addDoc(directorsRef, directorData);
                }
                console.log('Seeded directors');
            }

            // Seed Team (with URL fallback for images)
            const teamRef = collection(db, 'team');
            const teamSnap = await getDocs(teamRef);
            if (teamSnap.empty) {
                for (const member of initialTeam) {
                    const memberData = {
                        ...member,
                        image: typeof member.image === 'string' ? member.image : 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(member.name)
                    };
                    await addDoc(teamRef, memberData);
                }
                console.log('Seeded team');
            }

            alert('Database seeded successfully! Refresh the page to see data.');
        } catch (error) {
            console.error('Error seeding database:', error);
            alert('Error seeding database: ' + error.message);
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
                <button
                    onClick={seedDatabase}
                    disabled={seeding}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                    {seeding ? <Loader className="animate-spin" size={20} /> : <Database size={20} />}
                    {seeding ? 'Seeding...' : 'Seed Database'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value={isLoading ? '...' : stats.projects} icon={Film} color="purple" />
                <StatCard title="Directors" value={isLoading ? '...' : stats.directors} icon={Users} color="blue" />
                <StatCard title="Team Members" value={isLoading ? '...' : stats.team} icon={Users} color="green" />
                <StatCard title="Growth Rate" value={stats.growth} icon={TrendingUp} color="pink" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {stats.projects === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Database size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No data yet. Click "Seed Database" to add initial data.</p>
                        </div>
                    ) : (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <Film size={20} className="text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 dark:text-white">New Project Created</h4>
                                    <p className="text-sm text-gray-500">Space Wars Eternal was added by Admin</p>
                                </div>
                                <span className="text-sm text-gray-400">2 hours ago</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;


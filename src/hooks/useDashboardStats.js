import { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';

export const useDashboardStats = () => {
    const [stats, setStats] = useState({
        projects: 0,
        directors: 0,
        team: 0,
        investors: 1234, // Mock data for now
        funding: '45.2M', // Mock data
        growth: '24.5%'   // Mock data
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const projectsCount = await getCountFromServer(collection(db, 'projects'));
                const directorsCount = await getCountFromServer(collection(db, 'directors'));
                const teamCount = await getCountFromServer(collection(db, 'team'));

                setStats(prev => ({
                    ...prev,
                    projects: projectsCount.data().count,
                    directors: directorsCount.data().count,
                    team: teamCount.data().count
                }));
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, isLoading };
};

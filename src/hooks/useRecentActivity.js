import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export const useRecentActivity = () => {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (isLoading) setIsLoading(false);
        }, 5000);

        // Fetch recent items from multiple collections in parallel
        const fetchActivities = async () => {
            const allActivities = [];

            // Listen to projects
            const projectsRef = collection(db, 'projects');
            const unsubProjects = onSnapshot(projectsRef, (snapshot) => {
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    allActivities.push({
                        id: doc.id,
                        type: 'project',
                        title: data.titleEn || data.titleTh || 'New Project',
                        createdAt: data.createdAt,
                        action: 'Project added'
                    });
                });
            });

            // Listen to articles
            const articlesRef = collection(db, 'articles');
            const unsubArticles = onSnapshot(articlesRef, (snapshot) => {
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    allActivities.push({
                        id: doc.id,
                        type: 'article',
                        title: data.title || 'New Article',
                        createdAt: data.createdAt,
                        action: 'Article published'
                    });
                });

                // Sort by date and take most recent
                allActivities.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || new Date(0);
                    const dateB = b.createdAt?.toDate?.() || new Date(0);
                    return dateB - dateA;
                });

                setActivities(allActivities.slice(0, 10));
                setIsLoading(false);
            });

            return () => {
                unsubProjects();
                unsubArticles();
                clearTimeout(safetyTimeout);
            };
        };

        fetchActivities();
    }, []);

    return { activities, isLoading };
};

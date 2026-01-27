import { useState, useEffect } from 'react';
import { projects as initialProjects } from '../data/projectsData';

const STORAGE_KEY = 'colestia_project_views';

export const useViewCount = () => {
    const [views, setViews] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // Initialize with default views from projectsData
        const initialViews = {};
        initialProjects.forEach(p => {
            initialViews[p.id] = p.views || 0;
        });
        return initialViews;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
    }, [views]);

    const incrementView = (projectId) => {
        setViews(prev => ({
            ...prev,
            [projectId]: (prev[projectId] || 0) + 1
        }));
    };

    const getViews = (projectId) => {
        return views[projectId] || 0;
    };

    return { views, incrementView, getViews };
};

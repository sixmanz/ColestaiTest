import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Safety timeout to prevent infinite spinner
        const safetyTimeout = setTimeout(() => {
            if (isLoading) {
                console.warn("Firestore snapshot timed out, forcing loading false");
                setIsLoading(false);
            }
        }, 5000);

        const projectsRef = collection(db, 'projects');

        const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                firestoreId: doc.id,
                id: doc.data().id || doc.id
            }));
            setProjects(data);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching projects:", err);
            setError(err);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    const getProjectById = (id) => {
        return projects.find(p => p.id == id || p.firestoreId === id);
    };

    return { projects, isLoading, error, getProjectById };
};


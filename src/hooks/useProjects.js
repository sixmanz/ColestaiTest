import { useState, useEffect } from 'react';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { projects as initialProjects, comingSoonMovies } from '../data/projectsData';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsRef = collection(db, 'projects');
                const snapshot = await getDocs(projectsRef);

                if (snapshot.empty) {
                    console.log('Seeding initial data to Firestore...');
                    const batch = writeBatch(db);

                    // Seed active projects
                    initialProjects.forEach(project => {
                        const newDocRef = doc(projectsRef); // Auto-ID
                        // Or use custom ID if we want to preserve 1, 2, 3? 
                        // Better to let Firestore generate IDs or strictly use string IDs.
                        // For simplicity and routing, let's try to keep numerical IDs if possible, 
                        // but Firestore IDs are strings. 
                        // To avoid breaking /project/:id routing which expects 1, 2, 3...
                        // We will store the numeric ID as a field 'displayId' or just use the doc ID if we update routing.
                        // For now, let's just write the data. routing might break if we rely on IDs being 1, 2, 3.
                        // Let's rely on the 'id' field inside the data object.
                        batch.set(newDocRef, { ...project, type: 'active' });
                    });

                    // Seed coming soon
                    comingSoonMovies.forEach(movie => {
                        const newDocRef = doc(projectsRef);
                        batch.set(newDocRef, { ...movie, type: 'coming_soon' });
                    });

                    await batch.commit();

                    // Refetch
                    const newSnapshot = await getDocs(projectsRef);
                    setProjects(newSnapshot.docs.map(doc => ({ ...doc.data(), firestoreId: doc.id })));
                } else {
                    setProjects(snapshot.docs.map(doc => ({ ...doc.data(), firestoreId: doc.id })));
                }
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err);
                // Fallback to static data if firebase fails (e.g. no internet/config)
                setProjects([...initialProjects, ...comingSoonMovies]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper to get project by ID (handling both numeric IDs from JSON and potential string IDs)
    const getProjectById = (id) => {
        return projects.find(p => p.id == id || p.firestoreId === id);
    };

    return { projects, isLoading, error, getProjectById };
};

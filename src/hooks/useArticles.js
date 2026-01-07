import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (isLoading) {
                console.warn("Firestore snapshot timed out (Articles), forcing loading false");
                setIsLoading(false);
            }
        }, 5000);

        const articlesRef = collection(db, 'articles');

        const unsubscribe = onSnapshot(articlesRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            // Client-side sort by date descending
            data.sort((a, b) => {
                const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
                const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
                return dateB - dateA;
            });

            setArticles(data);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching articles:", err);
            setError(err);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    // Filter helpers
    const getPublished = () => articles.filter(a => a.status === 'published');
    const getNews = () => articles.filter(a => a.category === 'news' && a.status === 'published');
    const getLearningHub = () => articles.filter(a => (a.category === 'learning_hub' || a.category === 'education') && a.status === 'published');

    return { articles, isLoading, error, getPublished, getNews, getLearningHub };
};

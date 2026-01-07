import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useTeam = () => {
    const [team, setTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (isLoading) {
                console.warn("Firestore snapshot timed out, forcing loading false");
                setIsLoading(false);
            }
        }, 5000);

        const collectionRef = collection(db, 'team');
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setTeam(data);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching team:", err);
            setError(err);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    return { team, isLoading, error };
};


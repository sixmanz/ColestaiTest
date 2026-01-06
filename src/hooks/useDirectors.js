import { useState, useEffect } from 'react';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { directors as initialDirectors } from '../data/creatorsData';

export const useDirectors = () => {
    const [directors, setDirectors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const collectionRef = collection(db, 'directors');
                const snapshot = await getDocs(collectionRef);

                if (snapshot.empty) {
                    console.log('Seeding initial Directors data to Firestore...');
                    const batch = writeBatch(db);

                    initialDirectors.forEach(item => {
                        const newDocRef = doc(collectionRef);
                        batch.set(newDocRef, item);
                    });

                    await batch.commit();

                    const newSnapshot = await getDocs(collectionRef);
                    setDirectors(newSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                } else {
                    setDirectors(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                }
            } catch (err) {
                console.error("Error fetching directors:", err);
                setError(err);
                setDirectors(initialDirectors);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDirectors();
    }, []);

    return { directors, isLoading, error };
};

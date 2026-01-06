import { useState, useEffect } from 'react';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { teamMembers as initialTeam } from '../data/teamData';

export const useTeam = () => {
    const [team, setTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const collectionRef = collection(db, 'team');
                const snapshot = await getDocs(collectionRef);

                if (snapshot.empty) {
                    console.log('Seeding initial Team data to Firestore...');
                    const batch = writeBatch(db);

                    initialTeam.forEach(item => {
                        const newDocRef = doc(collectionRef);
                        batch.set(newDocRef, item);
                    });

                    await batch.commit();

                    const newSnapshot = await getDocs(collectionRef);
                    setTeam(newSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                } else {
                    setTeam(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                }
            } catch (err) {
                console.error("Error fetching team:", err);
                setError(err);
                setTeam(initialTeam);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return { team, isLoading, error };
};

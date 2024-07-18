// hooks/useUserDisplayName.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { auth } from 'config/firebase';

const useUserDisplayName = () => {
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, 'partners', uid);
        const userSnap = await getDoc(userRef);

        let displayName;
        if (userSnap.exists()) {
        //   displayName = `${userSnap.data().firstName} ${userSnap.data().lastName}` || userSnap.data().email;
        
        displayName = `${userSnap.data().firstName} ${userSnap.data().lastName}`;
        
        displayName = displayName.trim() ? displayName : userSnap.data().email;
        } else {
          displayName = user.email;
        }

        displayName = displayName.split('@')[0].charAt(0).toUpperCase() + displayName.split('@')[0].slice(1);
        setDisplayName(displayName);
        setIsLoading(false);
      } else {
        setDisplayName('Guest');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { displayName, isLoading };
};

export default useUserDisplayName;

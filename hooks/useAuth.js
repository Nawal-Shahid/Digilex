import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log('Got user: ', currentUser);

      if (currentUser) {
        if (currentUser.emailVerified) {
          // Email is verified → allow login
          setUser(currentUser);
        } else {
          // Email not verified → block login
          Alert.alert(
            'Email Not Verified',
            'Please verify your email before logging in.'
          );
          signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return { user };
}

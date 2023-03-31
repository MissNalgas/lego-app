import { getAuth, onAuthStateChanged, updateCurrentUser, User } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import firebaseApp from '@utils/firebase';

type AuthType = User | null | false;

const authContext = createContext<AuthType>(null); //todo: types

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider({children} : {children: React.ReactNode}) {

    const [user, setUser] = useState<AuthType>(null); //todo: types

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        })

        return () => {
            unsubscribe();
        }
    }, []);



    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    );
}
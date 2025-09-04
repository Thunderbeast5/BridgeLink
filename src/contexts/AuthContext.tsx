import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, AuthContextType, SignUpData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          if (db) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email!,
                firstName: userData.firstName,
                middleName: userData.middleName,
                lastName: userData.lastName,
                role: userData.role,
                branch: userData.branch,
                batchYear: userData.batchYear,
                createdAt: userData.createdAt.toDate(),
                updatedAt: userData.updatedAt.toDate(),
                emailVerified: firebaseUser.emailVerified
              });
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth, db]);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (userData: SignUpData) => {
    if (!auth || !db) {
      throw new Error('Firebase not initialized');
    }
    setLoading(true);
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      const userDoc = {
        firstName: userData.firstName,
        middleName: userData.middleName || '',
        lastName: userData.lastName,
        role: userData.role,
        branch: userData.branch,
        batchYear: userData.batchYear,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false
      };

      // Create user document in /users collection
      await setDoc(doc(db, 'users', firebaseUser.uid), userDoc);

      // Create user document in branch-specific collection
      const branchCollection = userData.role === 'alumni' ? 'alumni' : 'students';
      await setDoc(doc(db, 'branches', userData.branch, branchCollection, firebaseUser.uid), {
        ...userDoc,
        uid: firebaseUser.uid,
        email: userData.email
      });

      // Send email verification
      await firebaseSendEmailVerification(firebaseUser);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const sendEmailVerification = async () => {
    if (!auth || !auth.currentUser) {
      throw new Error('Firebase not initialized or no user');
    }
    await firebaseSendEmailVerification(auth.currentUser);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendEmailVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  ref, 
  set, 
  get, 
  update,
  query,
  orderByChild,
  limitToFirst,
  onValue
} from 'firebase/database';
import { auth, db } from '../../firebase';

interface UserData {
  uid: string;
  name: string;
  class: string;
  email: string;
  points: number;
  level: number;
  progress: number;
  completedActivities: string[];
  badges: string[];
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  register: (name: string, className: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addPoints: (points: number) => Promise<void>;
  completeActivity: (activityId: string) => Promise<void>;
  addBadge: (badge: string) => Promise<void>;
  updateProgress: (progress: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email);
      if (firebaseUser) {
        try {
          console.log('Loading user data for:', firebaseUser.uid);
          // Load user data from Realtime Database
          const userRef = ref(db, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val() as UserData;
            console.log('User data loaded from Realtime Database:', userData);
            setUser(userData);
          } else {
            // If no data in Realtime Database, create default
            const defaultUser: UserData = {
              uid: firebaseUser.uid,
              name: '',
              class: '',
              email: firebaseUser.email || '',
              points: 0,
              level: 1,
              progress: 0,
              completedActivities: [],
              badges: []
            };
            console.log('Creating default user data in Realtime Database');
            await set(ref(db, `users/${firebaseUser.uid}`), defaultUser);
            setUser(defaultUser);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          // If Realtime Database fails, create a basic user object from auth
          const basicUser: UserData = {
            uid: firebaseUser.uid,
            name: '',
            class: '',
            email: firebaseUser.email || '',
            points: 0,
            level: 1,
            progress: 0,
            completedActivities: [],
            badges: []
          };
          console.log('Setting basic user due to Realtime Database error');
          setUser(basicUser);
        }
      } else {
        console.log('No user, clearing user state');
        setUser(null);
      }
      console.log('Setting loading to false');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (name: string, className: string, email: string, password: string) => {
    try {
      // Validate input
      if (!name.trim()) {
        throw new Error('Nama tidak boleh kosong');
      }
      if (!className.trim()) {
        throw new Error('Kelas tidak boleh kosong');
      }
      if (!email.trim()) {
        throw new Error('Email tidak boleh kosong');
      }
      if (password.length < 6) {
        throw new Error('Password harus minimal 6 karakter');
      }

      // Normalize email: trim and lowercase
      const normalizedEmail = email.trim().toLowerCase();

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail)) {
        throw new Error('Format email tidak valid');
      }

      console.log('Attempting registration with email:', normalizedEmail);
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      console.log('User created in Firebase Auth, UID:', userCredential.user.uid);
      
      const userData: UserData = {
        uid: userCredential.user.uid,
        name: name.trim(),
        class: className.trim(),
        email: normalizedEmail,
        points: 0,
        level: 1,
        progress: 0,
        completedActivities: [],
        badges: []
      };
      
      try {
        console.log('Saving user data to Realtime Database for UID:', userCredential.user.uid);
        await set(ref(db, `users/${userCredential.user.uid}`), userData);
        console.log('User data saved to Realtime Database successfully');
        setUser(userData);
        console.log('User registered and data saved successfully');
      } catch (dbError: any) {
        console.error('Error saving user data to Realtime Database:', dbError);
        setUser(userData);
        throw new Error('Akun berhasil dibuat, tetapi ada masalah menyimpan data. Silakan login kembali.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Format email tidak valid.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password terlalu lemah. Gunakan minimal 6 karakter.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Koneksi internet bermasalah. Periksa koneksi Anda.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Terlalu banyak percobaan. Coba lagi nanti.');
      } else {
        // For other errors, show the original message or a generic one
        throw new Error(error.message || 'Terjadi kesalahan saat mendaftar. Coba lagi.');
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Validate input
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password;

      if (!trimmedEmail) {
        throw new Error('Email tidak boleh kosong');
      }
      if (!trimmedPassword) {
        throw new Error('Password tidak boleh kosong');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        throw new Error('Format email tidak valid');
      }

      console.log('Step 1: Attempting login with email:', trimmedEmail);
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      console.log('Step 2: Login successful, user UID:', userCredential.user.uid);
      
      // Wait a bit for auth state to propagate
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Step 3: Loading user data from Realtime Database');
      
      try {
        const userRef = ref(db, `users/${userCredential.user.uid}`);
        const snapshot = await get(userRef);
        console.log('Step 4: Database query completed, data exists:', snapshot.exists());
        
        if (snapshot.exists()) {
          const userData = snapshot.val() as UserData;
          console.log('Step 5: User data retrieved:', userData.uid, userData.email);
          setUser(userData);
        } else {
          console.warn('Step 5: No user data found, creating default');
          const defaultUser: UserData = {
            uid: userCredential.user.uid,
            name: '',
            class: '',
            email: userCredential.user.email || '',
            points: 0,
            level: 1,
            progress: 0,
            completedActivities: [],
            badges: []
          };
          await set(ref(db, `users/${userCredential.user.uid}`), defaultUser);
          console.log('Step 6: Default user created');
          setUser(defaultUser);
        }
      } catch (dbError: any) {
        console.warn('Database error, using auth data:', dbError.message);
        // If database fails, still set user from auth
        const authUser: UserData = {
          uid: userCredential.user.uid,
          name: '',
          class: '',
          email: userCredential.user.email || '',
          points: 0,
          level: 1,
          progress: 0,
          completedActivities: [],
          badges: []
        };
        setUser(authUser);
      }
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      
      // Handle Firebase Auth errors
      if (error.code === 'auth/user-not-found') {
        throw new Error('Email tidak terdaftar. Silakan daftar terlebih dahulu.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Password salah. Periksa kembali password Anda.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Format email tidak valid.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Akun ini telah dinonaktifkan.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Terlalu banyak percobaan login. Coba lagi nanti.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Koneksi internet bermasalah. Periksa koneksi Anda.');
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('Email atau password salah. Periksa kembali.');
      } else {
        throw new Error(error.message || 'Terjadi kesalahan saat login. Coba lagi.');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const addPoints = async (points: number) => {
    if (!user) return;
    const newPoints = user.points + points;
    const newLevel = Math.min(5, Math.floor(newPoints / 10) + 1);
    const newUser = { ...user, points: newPoints, level: newLevel };
    
    setUser(newUser);
    await update(ref(db, `users/${user.uid}`), { points: newPoints, level: newLevel });
  };

  const completeActivity = async (activityId: string) => {
    if (!user) return;
    if (!user.completedActivities.includes(activityId)) {
      const newCompletedActivities = [...user.completedActivities, activityId];
      const newUser = { ...user, completedActivities: newCompletedActivities };
      setUser(newUser);
      await update(ref(db, `users/${user.uid}`), { completedActivities: newCompletedActivities });
    }
  };

  const addBadge = async (badge: string) => {
    if (!user) return;
    if (!user.badges.includes(badge)) {
      const newBadges = [...user.badges, badge];
      const newUser = { ...user, badges: newBadges };
      setUser(newUser);
      await update(ref(db, `users/${user.uid}`), { badges: newBadges });
    }
  };

  const updateProgress = async (progress: number) => {
    if (!user) return;
    const newUser = { ...user, progress };
    setUser(newUser);
    await update(ref(db, `users/${user.uid}`), { progress });
  };

  return (
    <UserContext.Provider value={{ user, loading, register, login, logout, addPoints, completeActivity, addBadge, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

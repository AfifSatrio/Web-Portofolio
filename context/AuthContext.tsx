"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { isEmailWhitelisted } from "@/lib/auth-whitelist";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isWhitelisted: boolean;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isWhitelisted: false,
  loginWithGoogle: async () => false,
  logout: async () => {},
  authError: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        const whitelisted = isEmailWhitelisted(currentUser.email);
        setIsWhitelisted(whitelisted);
        if (!whitelisted) {
          setAuthError("Email Anda tidak terdaftar dalam whitelist admin.");
        } else {
          setAuthError(null);
        }
      } else {
        setIsWhitelisted(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      const whitelisted = isEmailWhitelisted(email);

      if (!whitelisted) {
        setAuthError("Akses Ditolak: Email (" + email + ") tidak terdaftar di ADMIN_WHITELIST_EMAILS.");
        await firebaseSignOut(auth);
        setIsWhitelisted(false);
        setUser(null);
        return false;
      }

      setIsWhitelisted(true);
      return true;
    } catch (err: any) {
      console.error("Login error:", err);
      setAuthError(err.message || "Gagal melakukan Google Sign-In.");
      return false;
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIsWhitelisted(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isWhitelisted,
        loginWithGoogle,
        logout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

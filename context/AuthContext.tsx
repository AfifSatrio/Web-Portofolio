"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

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
    async function verifyAdmin(currentUser: User) {
      const token = await currentUser.getIdToken();
      const response = await fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Email Anda tidak terdaftar dalam whitelist admin.");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (!currentUser) {
        setIsWhitelisted(false);
        setAuthError(null);
        setLoading(false);
        return;
      }

      try {
        await verifyAdmin(currentUser);
        setIsWhitelisted(true);
        setAuthError(null);
      } catch (err) {
        setIsWhitelisted(false);
        setAuthError(err instanceof Error ? err.message : "Email Anda tidak terdaftar dalam whitelist admin.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setAuthError(payload?.error || "Akses ditolak. Email tidak terdaftar di whitelist admin.");
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

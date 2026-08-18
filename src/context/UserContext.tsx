"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface UserProfile {
  fullName: string;
  email: string;
  dob: string;
  age: number;
  avatarUrl: string | null;
  restrictedMode: boolean; // true if age < 18
  track?: string;
  role?: string;
  currentXP?: number;
  playerLevel?: number;
}

interface UserContextType {
  userSession: UserProfile | null;
  isRestricted: boolean;
  login: (profile: UserProfile) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (base64Image: string) => Promise<void>;
}

const USER_SESSION_KEY = 'SYNTAX_KNIGHT_USER_SESSION_V1';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_SESSION_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  });

  const isRestricted = Boolean(userSession && (userSession.restrictedMode || userSession.age < 18));

  // Sync session state to LocalStorage and MongoDB
  const syncUserToMongo = async (profile: UserProfile) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn("MongoDB sync failed:", err);
    }
  };

  const login = useCallback(async (profile: UserProfile) => {
    // Ensure strict age restriction check
    const calculatedAge = profile.age;
    const isUnder18 = calculatedAge > 0 ? calculatedAge < 18 : Boolean(profile.restrictedMode);
    const updated: UserProfile = {
      ...profile,
      age: calculatedAge,
      restrictedMode: isUnder18,
      role: isUnder18 ? 'Cadet (Restricted Mode)' : (profile.role || 'Knight Operator'),
    };
    setUserSession(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(updated));
    }
    await syncUserToMongo(updated);
  }, []);

  const logout = useCallback(() => {
    setUserSession(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!userSession) return;
    const updated: UserProfile = {
      ...userSession,
      ...updates,
    };
    if (updates.age !== undefined || updates.dob !== undefined) {
      const age = updated.age;
      updated.restrictedMode = age < 18;
    }
    setUserSession(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(updated));
    }
    await syncUserToMongo(updated);
  }, [userSession]);

  const uploadAvatar = useCallback(async (base64Image: string) => {
    if (!userSession) return;
    await updateProfile({ avatarUrl: base64Image });
  }, [userSession, updateProfile]);

  return (
    <UserContext.Provider
      value={{
        userSession,
        isRestricted,
        login,
        logout,
        updateProfile,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

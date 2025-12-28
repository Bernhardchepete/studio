'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { demoUsers, demoData, type DemoUser, type DemoData } from '@/lib/demo-data';
import { useRouter, usePathname } from 'next/navigation';

interface DemoUserContextType {
  user: DemoUser | null;
  data: DemoData | null;
  login: (userId: string) => void;
  logout: () => void;
  updateData: (newData: Partial<DemoData>) => void;
}

const DemoUserContext = createContext<DemoUserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'thuox_demo_user';

export const DemoUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [data, setData] = useState<DemoData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUserId) {
        const foundUser = demoUsers.find(u => u.id === storedUserId) || null;
        setUser(foundUser);
        if (foundUser) {
            // Make a deep copy to avoid modifying the original demoData object
            setData(JSON.parse(JSON.stringify(demoData[foundUser.id as keyof typeof demoData])));
        }
      } else if (pathname.startsWith('/dashboard')) {
        // If no user is logged in and they try to access dashboard, redirect to login
        router.replace('/');
      }
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  }, [pathname, router]);

  const login = (userId: string) => {
    const foundUser = demoUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      // Make a deep copy to avoid modifying the original demoData object
      setData(JSON.parse(JSON.stringify(demoData[foundUser.id as keyof typeof demoData])));
      try {
        localStorage.setItem(USER_STORAGE_KEY, userId);
      } catch (error) {
        console.error("Could not access local storage:", error);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setData(null);
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
    router.push('/');
  };

  const updateData = (newData: Partial<DemoData>) => {
    setData(prevData => {
        if (!prevData) return null;
        return { ...prevData, ...newData };
    });
  }

  return (
    <DemoUserContext.Provider value={{ user, data, login, logout, updateData }}>
      {children}
    </DemoUserContext.Provider>
  );
};

export const useDemoUser = () => {
  const context = useContext(DemoUserContext);
  if (context === undefined) {
    throw new Error('useDemoUser must be used within a DemoUserProvider');
  }
  return context;
};

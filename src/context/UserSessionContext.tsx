"use client";

import { useContext, createContext, useState, useMemo, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter, usePathname } from "next/navigation";

export interface UserSessionContextType {
  session: Session | null;
  loading: boolean;
  prevLoading: boolean;
  setSession: (session: Session | null) => void;
}

const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export function UserSessionProvider({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();
  const [session, setSession] = useState<Session | null>(data || null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Current loading state
  const loading = status === "loading";
  
  // Track previous loading state
  const [prevLoading, setPrevLoading] = useState(loading);
  
  // Update session when NextAuth session changes
  useEffect(() => {
    if (data !== session) {
      setSession(data);
    }
  }, [data, session]);
  
  // Update prevLoading when loading changes
  useEffect(() => {
    if (loading !== prevLoading) {
      setPrevLoading(loading);
    }
  }, [loading, prevLoading]);
  
  // Detect loading completion (transition from loading:true to loading:false)
  useEffect(() => {
    if (prevLoading && !loading) {
      console.log("Loading just completed", { session, status });
    }
  }, [prevLoading, loading, session, status]);

  // Redirect if needed - FIXED VERSION
  useEffect(() => {
    // Get the current path to avoid redirect loops
    const isAuthPage = pathname === "/api/auth/signin" || pathname === "/login";
    
    // Only redirect if:
    // 1. Not currently loading
    // 2. Session is null (user not authenticated)
    // 3. Not already on an auth page
    if (!loading && session === null && !isAuthPage) {
      console.log("Redirecting to login: No session found");
      router.push("/api/auth/signin");
    }
  }, [loading, session, router, pathname]);

  const setSessionHandler = useCallback((newSession: Session | null) => {
    setSession(newSession);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      prevLoading,
      setSession: setSessionHandler,
    }),
    [session, loading, prevLoading, setSessionHandler]
  );

  return <UserSessionContext.Provider value={value}>{children}</UserSessionContext.Provider>;
}

export function useUserSession() {
  const context = useContext(UserSessionContext);

  if (context === undefined) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
}
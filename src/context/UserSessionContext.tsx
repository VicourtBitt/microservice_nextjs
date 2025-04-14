// context/UserSessionContext.tsx
"use client";

import { useContext, createContext, useState, useMemo, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface UserSessionContextType {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
}

const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export function UserSessionProvider({ children }: { children: React.ReactNode }) {
  // We'll use NextAuth's useSession hook here.
  const { data, status } = useSession();
  const [session, setSession] = useState<Session | null>(data || null);
  
  // Optionally track loading state: "loading" is provided by useSession.
  const loading = status === "loading";

  // Update our custom session state when NextAuth session changes.
  useEffect(() => {
    if (data !== session) {
      setSession(data);
    }
  }, [data, session]);

  const setSessionHandler = useCallback((newSession: Session | null) => {
    setSession(newSession);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      setSession: setSessionHandler,
    }),
    [session, loading, setSessionHandler]
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

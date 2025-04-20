'use client'

import React, { useContext, useEffect, useState } from "react"
import { useUserSession, UserSessionContextType } from "@/context/UserSessionContext"

type RBACUserContext = Omit<UserSessionContextType, "setSession">

const RBACContext = React.createContext<RBACUserContext | undefined>(undefined)

export const RBACProvider = ({ children }: { children: React.ReactNode }) => {
    const { session, loading, prevLoading } = useUserSession()
    const [rbacUser, setRBACUser] = useState<RBACUserContext | undefined>(undefined)

    useEffect(() => {
        if (session) {
            setRBACUser({ session, loading, prevLoading })
        }
    }, [session, loading, prevLoading])

    // Check if the session is valid and set the RBAC user context
    useEffect(() => {
        if (!session) {
            setRBACUser(undefined);
        }
    }, [session])

    return (
        <RBACContext.Provider value={rbacUser}>
            {children}
        </RBACContext.Provider>
    )
}

export const useRBAC = () => {
    const context = useContext(RBACContext)
    if (context === undefined) {
        throw new Error("useRBAC must be used within a RBACProvider")
    }
    return context
}

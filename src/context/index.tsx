"use client";

import { ThemeProvider } from "@/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { UserSessionProvider } from "@/context/UserSessionContext";

export default function MainProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <SessionProvider>
                <UserSessionProvider>
                    {children}
                </UserSessionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
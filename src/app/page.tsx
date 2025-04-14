"use client";

import DrawerComponent from "@/components/theme/ThemeDrawer";
import LogoutButton from "@/components/logout/LogoutButton";
import Link from "next/link";
import { Grid } from "@mui/material";
import { useUserSession } from "@/context/UserSessionContext";

export default function Home() {
  const { session, setSession } = useUserSession();

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}> 
      <Grid size={12} justifyContent={"center"} alignItems="center">
        <Grid size={12}>
          <h1>Welcome to the Home Page</h1>
          {session && (
            <p>
              Hello, {session.user?.name}!
            </p>
          )}
          {!session && (
            <p>
              You are not logged in.
            </p>
          )}
        </Grid>
        <Grid size={12}>
          <Link href="/api/auth/signin">Go to the SignIn Page</Link>
        </Grid>
        <Grid size={12}>
          <LogoutButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

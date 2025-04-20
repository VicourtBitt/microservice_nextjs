"use client";

import LogoutButton from "@/components/logout/LogoutButton";
import { Grid } from "@mui/material";
import { useUserSession } from "@/context/UserSessionContext";
import useTitle from "@/hooks/useTitle";

export default function Home() {
  useTitle("Home", "MDAN")
  const { session } = useUserSession();

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
          <LogoutButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

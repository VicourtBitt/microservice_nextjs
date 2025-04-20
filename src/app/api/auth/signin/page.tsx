"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import { useTheme } from "@/theme/ThemeProvider";
import { GitHub, Google } from "@mui/icons-material";
import useTitle from "@/hooks/useTitle";

interface AuthProvider {
  id: string;
  name: string;
}

export default function SignInPage() {
  useTitle("Sign In", "MDAN");
  const [providers, setProviders] = useState<Record<string, AuthProvider>>({});
  const { themeMode, font } = useTheme();

  // Fetch the providers from NextAuth on mount
  useEffect(() => {
    fetch("/api/auth/providers")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  const getProviderIcon = (providerId: string) => {
    switch(providerId) {
      case 'github':
        return <GitHub />;
      case 'google':
        return <Google />;
      default:
        return null;
    }
  };

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      sx={{
        height: "100%",
        bgcolor: themeMode === "dark" ? "background.default" : "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{ 
          maxWidth: "400px", 
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          sx={{ 
            p: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: font,
              fontWeight: 600,
              color: "primary.main"
            }}
          >
            Sign In
          </Typography>

          <Divider 
            sx={{ 
              my: 3,
              width: '100%',
              '&::before, &::after': {
                borderColor: 'divider',
              }
            }}
            textAlign="center"
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ px: 2 }}
            >
              With
            </Typography>
          </Divider>

          {providers &&
            Object.values(providers).map((provider: AuthProvider) => (
              <Box key={provider.name} mb={2} width="100%">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={getProviderIcon(provider.id)}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  sx={{ 
                    py: 1.2,
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: provider.id === "github" ? 
                      (themeMode === "dark" ? "#333" : "#24292e") : 
                      (provider.id === "google" ? "#4285F4" : "primary.main"),
                    "&:hover": {
                      backgroundColor: provider.id === "github" ? 
                        (themeMode === "dark" ? "#444" : "#2f363d") : 
                        (provider.id === "google" ? "#5c9aff" : "primary.dark"),
                    }
                  }}
                >
                  Sign in with {provider.name}
                </Button>
              </Box>
            ))
          }

          <Box mt={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                fontSize: "0.875rem",
                fontFamily: font,
              }}
            >
              {"Don't have an account?"}{" "}
              <Button
                component="a"
                href="/register"
                color="primary"
                sx={{ 
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontFamily: font,
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
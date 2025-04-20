"use client";

import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { PRIMARY, SECONDARY } from "./theme";
import "@fontsource/inter";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/merriweather";

type Font = "inter" | "roboto" | "montserrat" | "poppins" | "merriweather";
type ThemeMode = "light" | "dark";

// Define color themes with descriptive names
export const colorThemes = {
  green: { primary: PRIMARY, secondary: SECONDARY },
  blue: { primary: { ...PRIMARY, main: '#1976d2', dark: '#115293', light: '#42a5f5' }, secondary: SECONDARY },
  purple: { primary: { ...PRIMARY, main: '#9c27b0', dark: '#7b1fa2', light: '#ba68c8' }, secondary: SECONDARY },
  orange: { primary: { ...PRIMARY, main: '#ff9800', dark: '#f57c00', light: '#ffb74d' }, secondary: SECONDARY },
  red: { primary: { ...PRIMARY, main: '#f44336', dark: '#d32f2f', light: '#e57373' }, secondary: SECONDARY },
};

type ColorTheme = keyof typeof colorThemes;

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  font: Font;
  setFont: (font: Font) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Root provider that combines next-themes with our custom provider
export function ThemeProviderRoot({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeProviderInternal>{children}</ThemeProviderInternal>
    </NextThemesProvider>
  );
}

// Internal provider that uses next-themes and manages our custom theme state
function ThemeProviderInternal({ children }: { children: React.ReactNode }) {
  const { theme: nextTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  
  // Map next-themes theme to our ThemeMode
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (nextTheme === "dark") return "dark";
    return "light";
  });
  
  // Sync our themeMode with next-themes on mount
  useEffect(() => {
    setMounted(true);
    if (nextTheme === "dark") {
      setThemeMode("dark");
    } else if (nextTheme === "light") {
      setThemeMode("light");
    }
  }, [nextTheme]);
  
  // Get initial values from localStorage if available
  const [font, setFont] = useState<Font>(() => {
    if (typeof window !== 'undefined') {
      const savedFont = localStorage.getItem('font') as Font;
      return savedFont || "inter";
    }
    return "inter";
  });
  
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
      return savedColorTheme || "green";
    }
    return "green";
  });
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('font', font);
    }
  }, [font, mounted]);
  
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('colorTheme', colorTheme);
    }
  }, [colorTheme, mounted]);

  // Toggle theme using next-themes
  const toggleTheme = useCallback(() => {
    setTheme(themeMode === "light" ? "dark" : "light");
  }, [themeMode, setTheme]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const setFontHandler = useCallback((newFont: Font) => {
    setFont(newFont);
  }, []);
  
  const setColorThemeHandler = useCallback((newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme);
  }, []);

  const fontHandler = useMemo(() => {
    return {
      inter: '"Inter", sans-serif',
      roboto: '"Roboto", sans-serif',
      montserrat: '"Montserrat", sans-serif',
      poppins: '"Poppins", sans-serif',
      merriweather: '"Merriweather", serif',
    };
  }, []);

  const fontFamily = useMemo(() => {
    switch (font) {
      case "inter": return fontHandler.inter;
      case "roboto": return fontHandler.roboto;
      case "montserrat": return fontHandler.montserrat;
      case "poppins": return fontHandler.poppins;
      case "merriweather": return fontHandler.merriweather;
      default: return fontHandler.inter;
    }
  }, [font, fontHandler]);

  const theme = useMemo(() => {
    const selectedColors = colorThemes[colorTheme];
    
    return createTheme({
      palette: {
        mode: themeMode,
        primary: selectedColors.primary,
        secondary: selectedColors.secondary,
      },
      typography: {
        fontFamily: fontFamily,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: fontFamily,
              // Add smooth transitions only after mounting
              transition: mounted ? 'background-color 0.2s ease-out, color 0.2s ease-out' : 'none',
            },
          },
        },
      },
    });
  }, [themeMode, fontFamily, colorTheme, mounted]);

  // Hide UI until after client-side hydration to prevent flash
  if (!mounted) {
    return null; // or return a loading spinner or skeleton
  }

  return (
    <ThemeContext.Provider value={{ 
      themeMode, 
      toggleTheme, 
      font, 
      setFont: setFontHandler, 
      drawerOpen, 
      toggleDrawer,
      colorTheme,
      setColorTheme: setColorThemeHandler
    }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

// Export this as the main ThemeProvider for ease of use
export const ThemeProvider = ThemeProviderRoot;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
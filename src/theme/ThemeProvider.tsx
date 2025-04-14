"use client";

import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { PRIMARY, SECONDARY, themeColors } from "./theme";
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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Get initial values from localStorage if available
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
            return savedTheme || "light";
        }
        return "light";
    });
    
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
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    useEffect(() => {
        localStorage.setItem('font', font);
    }, [font]);
    
    useEffect(() => {
        localStorage.setItem('colorTheme', colorTheme);
    }, [colorTheme]);

    const toggleTheme = useCallback(() => {
        setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

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
                        },
                    },
                },
            },
        });
    }, [themeMode, fontFamily, colorTheme]);

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
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
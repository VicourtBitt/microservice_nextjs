"use client";

import React from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Divider,
  Box,
  Typography,
  Grid
} from "@mui/material";
import { useTheme } from "@/theme/ThemeProvider";
import { colorThemes } from "@/theme/ThemeProvider";
import { LightMode, DarkMode } from "@mui/icons-material";

const ColorOption = ({ color, name, selected, onClick }: { 
  color: string; 
  name: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        mb: 1
      }}
    >
      <Box
        onClick={onClick}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: color,
          cursor: 'pointer',
          border: selected ? '3px solid' : '1px solid',
          borderColor: selected ? 'secondary.main' : 'divider',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      />
      <Typography variant="caption" mt={0.5}>
        {name}
      </Typography>
    </Box>
  );
};

const ThemeDrawer = () => {
  const { 
    drawerOpen, 
    toggleDrawer, 
    themeMode, 
    toggleTheme, 
    setFont, 
    font,
    colorTheme,
    setColorTheme
  } = useTheme();

  return (
    <Drawer open={drawerOpen} onClose={toggleDrawer} anchor="right">
      <List sx={{ width: 280, marginTop: "64px", px: 2 }}>
        <ListItem>
          <ListItemText 
            primary="Appearance" 
            primaryTypographyProps={{ 
              variant: 'h6', 
              fontWeight: 'bold' 
            }} 
          />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        
        {/* THEME MODE SECTION */}
        <ListItem>
          <ListItemText 
            primary="Theme Mode" 
            primaryTypographyProps={{ 
              fontWeight: 'medium'
            }}
          />
        </ListItem>
        
        <ListItemButton onClick={toggleTheme} sx={{ borderRadius: 1 }}>
          {themeMode === 'dark' ? <LightMode sx={{ mr: 2 }} /> : <DarkMode sx={{ mr: 2 }} />}
          <ListItemText primary={`Switch to ${themeMode === "dark" ? "Light" : "Dark"} Mode`} />
        </ListItemButton>
        
        <Divider sx={{ my: 2 }} />
        
        {/* COLOR THEME SECTION */}
        <ListItem>
          <ListItemText 
            primary="Color Theme" 
            primaryTypographyProps={{ 
              fontWeight: 'medium' 
            }} 
            secondary="Choose your primary color"
          />
        </ListItem>
        
        <Grid container spacing={2} sx={{ px: 2, mb: 2 }}>
          {Object.entries(colorThemes).map(([name, theme]) => (
            <Grid size={4} key={name} sx={{ textAlign: 'center' }}>
              <ColorOption 
                color={theme.primary.main} 
                name={name.charAt(0).toUpperCase() + name.slice(1)}
                selected={colorTheme === name}
                onClick={() => setColorTheme(name as any)}
              />
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        {/* FONT SECTION */}
        <ListItem>
          <ListItemText 
            primary="Font Family" 
            primaryTypographyProps={{ 
              fontWeight: 'medium' 
            }}
          />
        </ListItem>
        
        <ListItemButton onClick={() => setFont("inter")} selected={font === "inter"} sx={{ borderRadius: 1 }}>
          <ListItemText primary="Inter" />
        </ListItemButton>
        <ListItemButton onClick={() => setFont("roboto")} selected={font === "roboto"} sx={{ borderRadius: 1 }}>
          <ListItemText primary="Roboto" />
        </ListItemButton>
        <ListItemButton onClick={() => setFont("montserrat")} selected={font === "montserrat"} sx={{ borderRadius: 1 }}>
          <ListItemText primary="Montserrat" />
        </ListItemButton>
        <ListItemButton onClick={() => setFont("poppins")} selected={font === "poppins"} sx={{ borderRadius: 1 }}>
          <ListItemText primary="Poppins" />
        </ListItemButton>
        <ListItemButton onClick={() => setFont("merriweather")} selected={font === "merriweather"} sx={{ borderRadius: 1 }}>
          <ListItemText primary="Merriweather" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default ThemeDrawer;
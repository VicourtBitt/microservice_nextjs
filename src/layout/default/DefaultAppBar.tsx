"use client"

import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { MenuOutlined, Settings } from "@mui/icons-material"
import { useTheme } from "@/theme/ThemeProvider" 
import Link from "next/link"

export default function DefaultAppBar({ 
    handleDrawerToggle 
}: {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}) {
    const muiTheme = useMuiTheme()
    const { toggleDrawer: toggleThemeDrawer } = useTheme()
    
    return (
        <AppBar 
            position="sticky" 
            color="primary"
            enableColorOnDark
            sx={{ 
                zIndex: muiTheme.zIndex.drawer + 1,
                transition: muiTheme.transitions.create(['margin', 'width'], {
                    easing: muiTheme.transitions.easing.sharp,
                    duration: muiTheme.transitions.duration.leavingScreen,
                }),
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{ marginRight: 2 }}
                >
                    <MenuOutlined />
                </IconButton>
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        color="inherit"
                        sx={{
                            textDecoration: "none",
                            fontWeight: 700,
                            fontSize: 24,
                            lineHeight: "normal",
                        }}
                    >
                        MUI-Database-API-NextJS
                    </Typography>
                </Box>
                
                <IconButton
                    color="inherit"
                    aria-label="theme settings"
                    onClick={toggleThemeDrawer}
                    edge="end"
                >
                    <Settings />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
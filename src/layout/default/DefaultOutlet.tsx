"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import DefaultAppBar from "./DefaultAppBar"
import DefaultDrawer from "./DefaultDrawer"
import ThemeDrawer from "@/components/theme/ThemeDrawer" // Import the ThemeDrawer component

export default function DefaultOutlet({
    children,
}: {
    children: React.ReactNode
}) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <DefaultAppBar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        transition: theme => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        marginLeft: 0,
                        ...(drawerOpen && {
                            transition: theme => theme.transitions.create('margin', {
                                easing: theme.transitions.easing.easeOut,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            marginLeft: '240px',
                        }),
                    }}
                >
                    {children}
                </Box>
            </Box>
            <ThemeDrawer />
        </Box>
    )
}
"use client"

import { Box, Drawer, Paper, Toolbar } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export default function DefaultDrawer({ 
    open, 
    handleDrawerToggle 
}: {
    open: boolean
    handleDrawerToggle: () => void
}) {
    const theme = useTheme()
    const drawerWidth = 240

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar /> {/* This creates space for the AppBar */}
            <Box sx={{ overflow: 'auto' }}>
                <Paper
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: "flex",
                        flexDirection: "column",
                        padding: 2
                    }}
                >
                    {/* Your drawer content here */}
                    <Box component="span" sx={{ flexGrow: 1 }} />
                </Paper>
            </Box>
        </Drawer>
    )
}
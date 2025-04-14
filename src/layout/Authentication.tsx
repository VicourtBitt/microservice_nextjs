"use client"

import { Box, AppBar, Toolbar, Typography } from "@mui/material"

export default function Authentication({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Authentication
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
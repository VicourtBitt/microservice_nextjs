"use client"

import { Box, Drawer, Paper } from "@mui/material"
import NavigationList from "@/components/navigation/NavigationList"
import { useUserSession } from "@/context/UserSessionContext"

export default function DefaultDrawer({ 
    open, 
}: {
    open: boolean
    handleDrawerToggle: () => void
}) {
    const { session } = useUserSession()
    const drawerWidth = session && session.user ? 240 : 0

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
            <Box sx={{ overflow: 'auto', mt: 6 }}>
                <Paper
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: "flex",
                        flexDirection: "column",
                        padding: 2
                    }}
                >
                    <Box component="span" sx={{ flexGrow: 1 }}>
                        {
                            session && session.user && (
                                <NavigationList />
                            )
                        }
                    </Box>
                </Paper>
            </Box>
        </Drawer>
    )
}
import React from "react";
import { 
    DashboardOutlined, 
    InsightsOutlined,
    SignalCellularAltOutlined
} from "@mui/icons-material";

export type Navigation = {
    type?: 'divider' | null;
    path?: string;
    title?: string;
    icon?: React.ReactNode;
    children?: Navigation[];
};

export const navigationObject: Navigation[] = [
    {
        path: '/overview',
        title: 'Overview',
        icon: <DashboardOutlined />,
        children: [
            {
                path: '/overview/insights',
                title: 'Insights',
                icon: <InsightsOutlined />,
            }
        ]
    },
    {
        path: '/metrics',
        title: 'Metrics',
        icon: <SignalCellularAltOutlined />,
    }
]
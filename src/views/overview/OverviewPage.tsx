"use client"

import { Employee } from "@/lib/interfaces/Employee"
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material"


export default function OverviewPage({ data }: { data: Employee[] }) {
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {
                data && data.length > 0 ? (
                    data.map((employee) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={employee.employee_id}>
                            <Card>
                                <CardHeader title={employee.employee_name} />
                                <CardContent>
                                    <Typography variant="body2">
                                        {employee.employee_phone}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6">No data available</Typography>
                )
            }
        </Grid>
    );
}
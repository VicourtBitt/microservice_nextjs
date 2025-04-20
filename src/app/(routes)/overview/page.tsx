import OverviewPage from "@/views/overview/OverviewPage";
import { Employee } from "@/lib/interfaces/Employee"
import { fetchData } from '@/lib/utils'

export default async function Page() {
    const data = await fetchData<Employee[]>('employee/employees');
    return <OverviewPage data={data}/>;
}
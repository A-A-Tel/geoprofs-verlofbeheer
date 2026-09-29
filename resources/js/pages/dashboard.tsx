import { Sidebar } from '@/components/sidebar';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const {
        props
    } = usePage();

    console.log(props.auth)

    return (
        <>
            <Sidebar />
        </>
    );
}

import { Sidebar } from '@/components/sidebar';
import { useTypedPage } from '@/hooks/typedPage';

export default function Dashboard() {
    const { props } = useTypedPage();

    console.log(props.auth?.user);

    return (
        <>
            <Sidebar />
        </>
    );
}

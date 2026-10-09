import { LeaveModal } from '@/components/leave-modal';
import { Sidebar } from '@/components/sidebar';
import { useTypedPage } from '@/hooks/typedPage';
import { Succeeded } from '@/types';

type LeaveProps = {
    types: string[];
};

export default function Leave({ types }: LeaveProps) {
    const { url } = useTypedPage();

    const params = new URLSearchParams(url);
    const succeeded = params.get('succeeded') as Succeeded | null;

    console.log(succeeded);
    console.log(types);

    return (
        <>
            <Sidebar />
            <LeaveModal />
        </>
    );
}

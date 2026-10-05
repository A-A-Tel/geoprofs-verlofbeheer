import { useTypedPage } from '@/hooks/typedPage';
import { Succeeded } from '@/types';
import { Sidebar } from '@/components/sidebar';
import { LeaveModal} from '@/components/leave-modal';

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

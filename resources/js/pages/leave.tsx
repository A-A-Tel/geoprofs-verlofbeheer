import { LeaveModal } from '@/components/leave-modal';
import { Sidebar } from '@/components/sidebar';
import { useTypedPage } from '@/hooks/typedPage';
import { LeaveType, Succeeded } from '@/types';

type LeaveProps = {
    types: LeaveType[];
    availableDays: number;
};

export default function Leave({ types, availableDays }: LeaveProps) {
    const { url } = useTypedPage();

    const params = new URLSearchParams(url);
    const succeeded = params.get('succeeded') as Succeeded | null;

    return (
        <>
            <Sidebar children={[
                <LeaveModal types={types} availableDays={availableDays} />
            ]} />
        </>
    );
}

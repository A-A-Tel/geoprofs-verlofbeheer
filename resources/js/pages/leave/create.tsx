import { Sidebar } from '@/components/sidebar';
import { useTypedPage } from '@/hooks/typedPage';
import { LeaveType, Status } from '@/types';
import { LeaveCreateModal } from '@/components/leave/leave-create-modal';

type LeaveProps = {
    types: LeaveType[];
    availableDays: number;
};

export default function Create({ types, availableDays }: LeaveProps) {
    const { url } = useTypedPage();

    const params = new URLSearchParams(url);
    const succeeded = params.get('succeeded') as Status | null;

    return (
        <>
            <Sidebar children={[
                <LeaveCreateModal key='leave-create-modal' types={types} availableDays={availableDays} />
            ]} />
        </>
    );
}

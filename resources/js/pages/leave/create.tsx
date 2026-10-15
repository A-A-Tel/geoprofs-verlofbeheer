import { Sidebar } from '@/components/sidebar';
import { LeaveType } from '@/types';
import { LeaveCreateModal } from '@/components/leave/leave-create-modal';

type LeaveProps = {
    types: LeaveType[];
    available_days: number;
};

export default function Create({ types, available_days }: LeaveProps) {
    return (
        <>
            <Sidebar children={[
                <LeaveCreateModal key='leave-create-modal' types={types} availableDays={available_days} />
            ]} />
        </>
    );
}

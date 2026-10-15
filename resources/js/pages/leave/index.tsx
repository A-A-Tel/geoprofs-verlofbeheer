import { LeaveList } from '@/components/leave/leave-list';
import { Sidebar } from '@/components/sidebar';
import { Leave } from '@/types';

type LeaveOverviewProps = {
    leaves: Leave[];
};

export default function Index({ leaves }: LeaveOverviewProps) {
    const tempLeaves = [
        {
            id: 1,
            type: 'Ziek',
            requester: 'Harry',
        },
        {
            id: 2,
            type: 'Ziek',
            requester: 'Harry',
        },
        {
            id: 3,
            type: 'Ziek',
            requester: 'Harry',
        },
    ];
    leaves.push();

    return (
        <>
            <Sidebar children={[<LeaveList key='leave-list' leaves={tempLeaves} />]} />
        </>
    );
}

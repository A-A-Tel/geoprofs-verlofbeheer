import { LeaveList } from '@/components/leave-list';
import { Sidebar } from '@/components/sidebar';
import { Leave } from '@/types';

type LeaveOverviewProps = {
    leaves: Leave[];
};

export default function LeaveOverview({ leaves }: LeaveOverviewProps) {
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
    console.log(leaves);

    return (
        <>
            <Sidebar children={
                [
                    <LeaveList leaves={tempLeaves} />
                ]
            } />
        </>
    );
}

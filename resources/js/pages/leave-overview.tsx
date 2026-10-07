import { LeaveRequestOverview } from '@/components/leave-request-overview';
import { Sidebar } from '@/components/sidebar';

type LeaveOverviewProps = {
    leaves: {
        id: number;
        type: string;
        requester: string;
    }[];
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

    return (
        <>
            <Sidebar />
            <LeaveRequestOverview leaves={tempLeaves} />
        </>
    );
}

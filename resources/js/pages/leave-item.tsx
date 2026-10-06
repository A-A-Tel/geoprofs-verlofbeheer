import { LeaveRequestItem } from '@/components/leave-request-item';
import { Sidebar } from '@/components/sidebar';

type LeaveOverviewProps = {
    leaves: {
        id: number;
        type: string;
        requester: string;
        reason: string;
    }[];
};

export default function LeaveOverview({leaves}: LeaveOverviewProps) {

    const tempLeaves = [
        {
            id: 1,
            type: 'Ziek',
            requester: 'Harry',
            reason: 'heb ligma gekregen'
        }
    ];

    return (
        <>
            <Sidebar />
            <LeaveRequestItem leaves={tempLeaves} />
        </>
    );
}

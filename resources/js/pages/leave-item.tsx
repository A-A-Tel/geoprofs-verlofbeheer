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

export default function LeaveOverview({ leaves }: LeaveOverviewProps) {
    const tempLeaves = [
        {
            id: 1,
            type: 'Bijzonder',
            requester: 'Harry',
            reason: 'Ik ben van de trap gevallen dus ik kan helaas niet komen',
        },
    ];

    return (
        <>
            <Sidebar />
            <LeaveRequestItem leaves={tempLeaves} />
        </>
    );
}

import { LeaveOverviewEntry } from '@/components/leave-request-overview/LeaveOverviewEntry';

export type LeaveRequestOverviewProps = {
    leaves: {
        id: number;
        type: string;
        requester: string;
    }[];
};

export function LeaveRequestOverview({ leaves }: LeaveRequestOverviewProps) {
    console.log(leaves);
    const entries = leaves.map((leave) => {
        return <LeaveOverviewEntry key={leave.id} type={leave.type} action={'/leave-overview/' + leave.id} requester={leave.requester} />;
    });

    return <div className={`flex items-center gap-3`}>{entries}</div>;
}

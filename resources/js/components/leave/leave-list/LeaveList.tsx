import { LeaveListEntry } from './LeaveListEntry';

export type LeaveRequestOverviewProps = {
    leaves: {
        id: number;
        type: string;
        requester: string;
    }[];
};

export function LeaveList({ leaves }: LeaveRequestOverviewProps) {
    const entries = leaves.map((leave) => {
        return <LeaveListEntry key={leave.id} type={leave.type} action={'#'} requester={leave.requester} />;
    });

    return <div className={`flex flex-wrap items-center gap-3`}>{entries}</div>;
}

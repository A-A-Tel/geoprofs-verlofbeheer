import { LeaveItemEntry } from '@/components/leave-request-item/LeaveItemEntry';

export type LeaveRequestOverviewProps = {
    leaves: {
        id: number;
        type: string;
        requester: string;
        reason: string;
    }[];
};

export function LeaveRequestItem({leaves}: LeaveRequestOverviewProps) {

    console.log(leaves);
    const entries = leaves.map(leave => {
        return <LeaveItemEntry key={leave.id} type={leave.type} action={'#'} requester={leave.requester} reason={leave.reason}/>
    });

    return (
        <div className={`flex gap-3 items-center`}>
            {entries}
        </div>
    );
}

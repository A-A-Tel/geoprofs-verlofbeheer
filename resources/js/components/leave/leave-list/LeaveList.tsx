import { LeaveListEntry } from './LeaveListEntry';
import { Leave } from '@/types';

export type LeaveRequestOverviewProps = {
    leaves: Leave[]
};

export function LeaveList({ leaves }: LeaveRequestOverviewProps) {
    const entries = leaves.map((leave) => {
        return <LeaveListEntry key={leave.id} leave={leave} action={route('leave.show', [leave.id])} />;
    });

    return <div className={`flex flex-wrap items-center gap-3`}>{entries}</div>;
}

import { Leave } from '@/types';
import { LeaveListEntry } from './LeaveListEntry';

export type LeaveRequestOverviewProps = {
    leaves: Leave[];
};

export function LeaveList({ leaves }: LeaveRequestOverviewProps) {
    const entries = leaves.map((leave) => {
        return <LeaveListEntry key={leave.id} leave={leave} action={route('leave.show', [leave.id])} />;
    });

    return <div className={`flex flex-wrap items-center gap-3`}>{entries}</div>;
}

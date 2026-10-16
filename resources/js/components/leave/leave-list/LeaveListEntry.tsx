import { Leave } from '@/types';
import { Link } from '@inertiajs/react';
import ChatIcon from '@mui/icons-material/Chat';

export type LeaveOverviewEntryProps = {
    leave: Leave;
    action: string;
};

export function LeaveListEntry({ action, leave }: LeaveOverviewEntryProps) {
    return (
        <Link href={action}>
            <div className={'text-text-primary flex font-bold'}>
                <div className={'bg-primary-light border-text-secondary grid gap-3 rounded-xl border-3 p-5'}>
                    <span>Type: {leave.type.name}</span>
                    <span>
                        Aanvrager: {leave.requester.first_name} {leave.requester.last_name}
                    </span>
                    <ChatIcon fontSize="large" />
                </div>
            </div>
        </Link>
    );
}

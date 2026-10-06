import { Link } from '@inertiajs/react';
import ChatIcon from '@mui/icons-material/Chat';

export type LeaveOverviewEntryProps = {
    type: string;
    action: string;
    requester: string;
}

export function LeaveOverviewEntry({type, action, requester}: LeaveOverviewEntryProps) {
    return (
        <Link href={action}>
            <div className={'text-text-primary flex font-bold'}>
                <div className={'bg-primary-light gap-3 border-text-secondary grid rounded-xl border-3 p-5'}>
                    <span>Type: {type}</span>
                    <span>Aanvrager: {requester}</span>
                    <ChatIcon fontSize="large" />
                </div>
            </div>
        </Link>
    );
}

import { Link } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';

export type UserListEntryProps = {
    first_name: string;
    last_name: string;
    id: number;
    action: string;
};

export function UserListEntry({ first_name, last_name, action }: UserListEntryProps) {
    return (
        <Link href={action}>
            <div className={'text-text-primary flex font-bold'}>
                <div className={'bg-primary-light border-text-secondary flex items-center gap-5 rounded-lg border-3 p-5'}>
                    <span className={'text-lg'}>
                        {first_name} {last_name}
                    </span>
                    <EditIcon fontSize="large" />
                </div>
            </div>
        </Link>
    );
}

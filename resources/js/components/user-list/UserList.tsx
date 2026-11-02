import { UserListEntry } from '@/components/user-list/UserListEntry';
import { UserData } from '@/types';

export type UserListOverviewProps = {
    users: UserData[];
};

export function UserList({ users }: UserListOverviewProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 p-5">
            {users.map((user) => (
                <UserListEntry key={user.user_id} id={user.user_id} first_name={user.first_name} last_name={user.last_name} />
            ))}
        </div>
    );
}

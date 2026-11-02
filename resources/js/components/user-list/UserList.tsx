import { UserListEntry } from '@/components/user-list/UserListEntry';

type User = {
    first_name: string;
    last_name: string;
    id: number;
    action: string;
};

export type UserListOverviewProps = {
    users: User[];
};

export function UserList({ users }: UserListOverviewProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 p-5">
            {users.map((user) => (
                <UserListEntry key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} action={user.action} />
            ))}
        </div>
    );
}

import { Sidebar } from '@/components/sidebar';
import { UserList } from '@/components/user-list';
import { UserData } from '@/types';

type UserOverviewProps = {
    users: UserData[];
};

export default function Index({ users }: UserOverviewProps) {
    return (
        <Sidebar>
            <UserList users={users} />
        </Sidebar>
    );
}

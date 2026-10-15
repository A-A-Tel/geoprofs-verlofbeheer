import { Sidebar } from '@/components/sidebar';
import { UserList } from '@/components/user-list';

type User = {
    first_name: string;
    last_name: string;
    id: number;
    action: string;
};

export default function LeaveOverview() {
    const tempLeaves: User[] = [
        { first_name: 'Regu', last_name: 'Larjoe', id: 1, action: '#' },
        { first_name: 'Emp', last_name: 'Loyee', id: 2, action: '#' },
    ];

    return (
        <Sidebar>
            <UserList users={tempLeaves} />
        </Sidebar>
    );
}

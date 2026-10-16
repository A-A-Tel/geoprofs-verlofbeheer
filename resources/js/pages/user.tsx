import { Sidebar } from '@/components/sidebar';
import { UserList } from '@/components/user-list';
import { globalUserData } from '@/testdata/TestdataUser';

export default function LeaveOverview() {
    return (
        <Sidebar>
            <UserList users={globalUserData} />
        </Sidebar>
    );
}

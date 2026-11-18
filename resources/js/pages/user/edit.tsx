import { Sidebar } from '@/components/sidebar';
import { UserEditModal } from '@/components/user-edit-modal';
import { Department, User } from '@/types';

type UserCreateProps = {
    users: User[];
    departments: Department[];
};
export default function Edit({ users, departments }: UserCreateProps) {
    return (
        <Sidebar>
            <UserEditModal departments={departments} users={users} />
        </Sidebar>
    );
}

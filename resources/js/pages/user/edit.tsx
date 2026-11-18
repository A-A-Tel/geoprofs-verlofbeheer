import { Sidebar } from '@/components/sidebar';
import { UserEditModal } from '@/components/user-edit-modal';
import { Department, User } from '@/types';

type UserEditProps = {
    departments: Department[];
    users: User[];
    user: User;
};

export default function Edit({ users, departments, user }: UserEditProps) {
    return (
        <Sidebar>
            <UserEditModal departments={departments} users={users} user={user} />
        </Sidebar>
    );
}

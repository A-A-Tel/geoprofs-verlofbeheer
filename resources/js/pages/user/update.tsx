import { Sidebar } from '@/components/sidebar';
import { UserUpdateModal } from '@/components/user-update-modal';
import { Department, User } from '@/types';

type UserCreateProps = {
    users: User[];
    departments: Department[];
};
export default function Update({ users, departments }: UserCreateProps) {
    return (
        <Sidebar>
            <UserUpdateModal departments={departments} users={users} />
        </Sidebar>
    );
}

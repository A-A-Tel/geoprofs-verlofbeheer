import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';
import { Department, User } from '@/types';

type UserCreateProps = {
    users: User[];
    departments: Department[];
};
export default function Create({ users, departments }: UserCreateProps) {
    return (
        <Sidebar>
            <UserCreationModal departments={departments} users={users} />
        </Sidebar>
    );
}

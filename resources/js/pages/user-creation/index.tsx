import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';

// test data voor departments
const departments = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'DEPARTMENT 2' },
    { id: 2, name: 'WWWW' },
];
// test data voor users
const users = [
    { id: 10, role_id: 2, department_id: 1, user_data: { first_name: 'man', last_name: 'ager' } },
    { id: 11, role_id: 2, department_id: 2, user_data: { first_name: 'Anouar', last_name: 'Tel' } },
    { id: 12, role_id: 1, department_id: 1, user_data: { first_name: 'Bart', last_name: 'Peters' } },
];

export default function Index() {
    return (
        <Sidebar>
            <UserCreationModal departments={departments} users={users} />
        </Sidebar>
    );
}

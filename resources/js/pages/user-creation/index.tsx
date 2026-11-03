import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';

// test data voor departments
const departments = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'DEPARTMENT 2' },
    { id: 2, name: 'WWWW' },
];

export default function Index() {
    return (
        <Sidebar>
            <UserCreationModal departments={departments} />
        </Sidebar>
    );
}

import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';
import { globalUserData } from '@/testdata/TestdataUser';
import { globalDepartmentData } from '@/testdata/TestdataDepartment';

export default function Index() {
    return (
        <Sidebar>
            <UserCreationModal departments={globalDepartmentData} users={globalUserData} />
        </Sidebar>
    );
}

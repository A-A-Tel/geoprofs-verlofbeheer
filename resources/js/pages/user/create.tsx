import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';
import { globalDepartmentData } from '@/testdata/TestdataDepartment';
import { globalUserData } from '@/testdata/TestdataUser';

export default function Create() {
    return (
        <Sidebar>
            <UserCreationModal departments={globalDepartmentData} users={globalUserData} />
        </Sidebar>
    );
}

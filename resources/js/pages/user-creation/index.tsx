import { Sidebar } from '@/components/sidebar';
import { UserCreationModal } from '@/components/user-creation-modal';


export default function Index() {
    return (
        <Sidebar>
            <UserCreationModal />
        </Sidebar>
    );
}

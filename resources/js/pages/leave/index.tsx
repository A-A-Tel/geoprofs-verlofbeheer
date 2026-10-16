import { LeaveList } from '@/components/leave/leave-list';
import { Sidebar } from '@/components/sidebar';
import { Leave } from '@/types';

type LeaveOverviewProps = {
    leaves: Leave[];
};

export default function Index({ leaves }: LeaveOverviewProps) {

    return (
        <>
            <Sidebar children={[<LeaveList key="leave-list" leaves={leaves} />]} />
        </>
    );
}

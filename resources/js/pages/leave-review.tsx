import { LeaveReviewModal } from '@/components/leave-review-modal';
import { Sidebar } from '@/components/sidebar';
import { Leave } from '@/types';

type LeaveOverviewProps = {
    leave: Leave;
};

export default function LeaveOverview({ leave }: LeaveOverviewProps) {
    return (
        <>
            <Sidebar children={[<LeaveReviewModal leave={leave} />]} />
        </>
    );
}

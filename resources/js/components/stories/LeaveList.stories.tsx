import { LeaveList } from '../leave-list/LeaveList';
import { LeaveListEntry } from '../leave-list/LeaveListEntry';

export default {
    title: 'LeaveList/LeaveList',
    component: LeaveList,
};

export const Lijst = {
    args: {
        leaves: [
            { id: 1, type: 'Vakantie', requester: 'Jan Jansen' },
            { id: 2, type: 'Ziekte', requester: 'Regu larjoe' },
        ],
    },
};

export const Kaart = {
    render: () => <LeaveListEntry type="Vakantie" requester="Jan Jansen" action="#" />,
};

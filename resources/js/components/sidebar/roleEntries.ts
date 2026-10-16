import { SidebarEntryProps } from '@/components/sidebar/SidebarEntry';
import { Role, RoleLevel } from '@/types/types';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';

type RoleSidebarEntries = SidebarEntryProps & {
    level: RoleLevel;
};

const entries: RoleSidebarEntries[] = [
    {
        href: route('leave.create'),
        label: 'Verlofaanvraag aanmaken',
        icon: EditIcon,
        level: RoleLevel.Employee,
    },
    {
        href: route('user.index'),
        label: 'Gebruikers inzien',
        icon: GroupIcon,
        level: RoleLevel.Employee,
    },
    {
        href: route('leave.index'),
        label: 'Verlofoverzicht',
        icon: ReceiptIcon,
        level: RoleLevel.Manager,
    },
];

export default function getFilteredEntries(role: Role | null): SidebarEntryProps[] {
    const roleLevels: RoleLevel[] = [];

    while (role != null) {
        roleLevels.push(role.id);
        role = role.parent;
    }

    return entries.filter((entry) => roleLevels.includes(entry.level));
}

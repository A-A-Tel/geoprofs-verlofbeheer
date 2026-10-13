import { SidebarEntryProps } from '@/components/sidebar/SidebarEntry';
import { RoleLevel } from '@/types/types';
import EditIcon from '@mui/icons-material/Edit';

type RoleSidebarEntries = SidebarEntryProps & {
    level: RoleLevel;
}

const entries: RoleSidebarEntries[] = [
    {
        href: route('leave'),
        label: 'Verlofaanvraag aanmaken',
        icon: EditIcon,
        level: RoleLevel.Employee
    },
    {
        href: route(''),
        label: 'Verlofaanvragen inzien',
        icon: EditIcon,
        level: RoleLevel.Manager
    },
];


export default function getFilteredEntries(role: RoleLevel): SidebarEntryProps[] {
    console.log(role);
    return [];
}

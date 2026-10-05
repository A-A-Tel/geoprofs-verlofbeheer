import getEntriesForRole from '@/components/sidebar/roleEntries';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { SidebarEntry } from './SidebarEntry';

export function Sidebar() {
    const entryProps = getEntriesForRole(null!);
    const entries = [];

    for (let i = 0; i < entryProps.length; i++) {
        const entry = entryProps[i];

        entries.push(<SidebarEntry key={i} {...entry} />);
    }

    return (
        <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7 absolute min-w-1/6'}>
            <div className={'flex gap-2 md:flex-col'}>
                <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                <div className={'bg-divider w-hidden h-1 md:block'} />
                {entries}
                <SidebarEntry action={route('leave')} icon={EditIcon} label={'Verlofaanvraag maken'}/>
                <SidebarEntry action={route('logout')} method="post" icon={LogoutIcon} label={'Uitloggen'} />
            </div>
        </div>
    );
}

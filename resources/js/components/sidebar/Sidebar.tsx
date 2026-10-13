import getFilteredEntries from '@/components/sidebar/roleEntries';
import { ReactNode } from 'react';
import { SidebarEntry } from './SidebarEntry';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

export type SidebarProps = {
    children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
    const entryProps = getFilteredEntries(null!);
    const entries = entryProps.map((props) => (<SidebarEntry {...props} />))

    return (
        <div className="flex w-full flex-col md:flex-row">
            <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7 mb-15 md:m-0'}>
                <nav className={'flex gap-2 md:flex-col'}>
                    <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                    <div className={'bg-divider w-hidden h-1 md:block'} />
                    {entries}
                    <SidebarEntry href={route('leave')} icon={EditIcon} label={'Verlofaanvraag maken'} />
                    <div className={'mt-0 ml-auto md:mt-auto md:ml-0'}>
                        <SidebarEntry href={route('logout')} method="post" icon={LogoutIcon} label={'Uitloggen'} />
                    </div>
                </nav>
            </div>
            <main className={'w-full'}>{children}</main>
        </div>
    );
}

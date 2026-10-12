import getEntriesForRole from '@/components/sidebar/roleEntries';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactNode } from 'react';
import { SidebarEntry } from './SidebarEntry';

export type SidebarProps = {
    children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
    const entryProps = getEntriesForRole(null!);
    const entries = [];

    for (let i = 0; i < entryProps.length; i++) {
        const entry = entryProps[i];

        entries.push(<SidebarEntry key={i} {...entry} />);
    }

    return (
        <div className="flex w-full flex-col md:flex-row">
            <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7'}>
                <div className={'flex gap-2 md:flex-col'}>
                    <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                    <div className={'bg-divider w-hidden h-1 md:block'} />
                    {entries}
                    <SidebarEntry action={route('logout')} method="post" icon={LogoutIcon} />
                </div>
            </div>
            <div className={'m-5'}>{children}</div>
        </div>
    );
}

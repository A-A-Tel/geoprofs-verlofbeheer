import getFilteredEntries from '@/components/sidebar/roleEntries';
import { ReactNode } from 'react';
import { SidebarEntry } from './SidebarEntry';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTypedPage } from '@/hooks/typedPage';

export type SidebarProps = {
    children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {

    const { props } = useTypedPage();

    const entryProps = getFilteredEntries(props.auth?.role?? null);
    const entries = entryProps.map((props) => (<SidebarEntry {...props} />))

    return (
        <div className="flex w-full flex-col md:flex-row">
            <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7 mb-15 md:m-0'}>
                <nav className={'flex gap-2 md:flex-col'}>
                    <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                    <div className={'bg-divider w-hidden h-1 md:block'} />
                    {entries}
                    <div className={'mt-0 ml-auto md:mt-auto md:ml-0'}>
                        <SidebarEntry href={route('logout')} method="post" icon={LogoutIcon} label={'Uitloggen'} />
                    </div>
                </nav>
            </div>
            <main className={'w-full'}>{children}</main>
        </div>
    );
}

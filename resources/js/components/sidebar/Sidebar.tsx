import getFilteredEntries from '@/components/sidebar/roleEntries';
import { useTypedPage } from '@/hooks/typedPage';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactNode } from 'react';
import { SidebarEntry } from './SidebarEntry';

export type SidebarProps = {
    children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
    const { props } = useTypedPage();

    const entryProps = getFilteredEntries(props.auth?.role ?? null);

    let i = 0;
    const entries = entryProps.map((props) => <SidebarEntry key={(i += 1)} {...props} />);

    return (
        <div className="flex w-full flex-col md:flex-row">
            <div className={'bg-primary-light mb-5 w-full md:m-0 md:min-h-screen md:w-fit'}>
                <nav className={'flex gap-2 md:flex-col'}>
                    <h1 className={'m-5 hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                    <div className={'bg-divider w-hidden h-1 md:block'} />
                    {entries}
                    <div className={'mt-0 ml-auto md:mt-auto md:ml-0'}>
                        <SidebarEntry href={route('logout')} method="post" icon={LogoutIcon} label={'Uitloggen'} />
                    </div>
                </nav>
            </div>
            <main className={'w-full p-10'}>{children}</main>
        </div>
    );
}

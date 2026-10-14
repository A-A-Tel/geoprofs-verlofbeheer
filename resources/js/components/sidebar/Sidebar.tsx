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

    let i = 0;
    const entries = entryProps.map((props) => (<SidebarEntry key={i+=1} {...props} />))

    return (
        <div className="flex w-full flex-col md:flex-row">
            <div className={'bg-primary-light md:min-h-screen w-full md:w-fit mb-5 md:m-0'}>
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

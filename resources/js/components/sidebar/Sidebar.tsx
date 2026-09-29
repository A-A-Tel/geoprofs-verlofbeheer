import LogoutIcon from '@mui/icons-material/Logout';
import SidebarEntry from './SidebarEntry';
export function Sidebar() {
    return (
        <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7'}>
            <div className={'flex gap-2 md:flex-col'}>
                <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                <div className={'bg-divider w-hidden h-[0.25rem] md:block'}></div>
                <SidebarEntry action={'/logout'} method="post" icon={LogoutIcon} />
            </div>
        </div>
    );
}

import LogoutIcon from '@mui/icons-material/Logout';
export function Sidebar() {
    return (
        <div className={'bg-primary-light grid p-3 sm:w-full md:h-screen md:w-1/7'}>
            <div className={'flex gap-2 md:flex-col'}>
                <h1 className={'hidden text-3xl font-bold text-white md:block'}>GeoProfs</h1>
                <div className={'md:block bg-divider w-hidden h-[0.25rem]'}></div>
                <button
                    className={'hover:text-accent text-text-primary hover:bg-primary flex h-[3rem] cursor-pointer items-center gap-2 rounded-xl p-2'}
                >
                    <LogoutIcon fontSize="large" />
                    <div className={'hidden font-bold md:block'}>Uitloggen</div>
                </button>
            </div>
        </div>
    );
}

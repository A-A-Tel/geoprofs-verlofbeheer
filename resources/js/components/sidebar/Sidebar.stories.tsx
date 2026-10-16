// resources/js/components/sidebar/Sidebar.stories.tsx
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Sidebar/Sidebar',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="flex w-full flex-col md:flex-row">
            <div className="bg-primary-light grid p-3 md:h-screen md:w-1/7">
                <div className="flex gap-2 md:flex-col">
                    <h1 className="hidden text-3xl font-bold text-white md:block">GeoProfs</h1>
                    <div className="bg-divider hidden h-1 md:block" />

                    <button className="bg-primary text-accent flex h-12 items-center gap-2 rounded-xl p-2 font-bold">
                        <DashboardIcon fontSize="large" />
                        <span className="hidden md:block">Dashboard</span>
                    </button>

                    <button className="text-text-primary hover:bg-primary hover:text-accent flex h-12 items-center gap-2 rounded-xl p-2 font-bold">
                        <LogoutIcon fontSize="large" />
                        <span className="hidden md:block">Uitloggen</span>
                    </button>
                </div>
            </div>
            <div className="m-5">Pagina</div>
        </div>
    ),
};

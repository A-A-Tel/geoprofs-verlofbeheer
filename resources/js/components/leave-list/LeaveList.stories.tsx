// resources/js/components/sidebar/Sidebar.stories.tsx
import ChatIcon from '@mui/icons-material/Chat';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'LeaveList/LeaveList',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <div className="text-text-primary flex font-bold">
                <div className="bg-primary-light border-text-secondary grid gap-3 rounded-xl border-3 p-5">
                    <span>Type: Vakantie</span>
                    <span>Aanvrager: Jan Jansen</span>
                    <ChatIcon fontSize="large" />
                </div>
            </div>
            <div className="text-text-primary flex font-bold">
                <div className="bg-primary-light border-text-secondary grid gap-3 rounded-xl border-3 p-5">
                    <span>Type: Ziekte</span>
                    <span>Aanvrager: Regu larjoe</span>
                    <ChatIcon fontSize="large" />
                </div>
            </div>
        </div>
    ),
};

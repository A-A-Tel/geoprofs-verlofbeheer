// resources/js/components/sidebar/Sidebar.stories.tsx
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '@inertiajs/react';

const meta = {
    title: 'login-modal/login-modal',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className={`grid h-screen w-full items-center`}>
            <form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto grid gap-12 rounded-3xl border-3 p-8 md:w-1/3'}
            >
                <div className={'grid flex-col gap-2'}>
                    <div className={'text-3xl font-bold'}>Welkom</div>
                    <div>Log in met naam en wachtwoord</div>
                </div>
                <div className={'grid flex-col gap-2'}>
                    <div>Email</div>
                    <input
                        name="email"
                        placeholder={'regu.larjoe@bedrijf.nl'}
                        type={'email'}
                        className={'bg-primary-dark border-text-secondary rounded-md border-2 p-2'}
                    />
                    <div>Wachtwoord</div>
                    <input
                        name="password"
                        placeholder={'*******'}
                        type={'password'}
                        className={'bg-primary-dark border-text-secondary rounded-md border-2 p-2'}
                    />
                </div>
                <button
                    type={'submit'}
                    className={
                        'bg-background border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold'
                    }
                >
                    Inloggen
                </button>
            </form>
        </div>
    ),
};

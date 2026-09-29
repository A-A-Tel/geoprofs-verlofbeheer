import { Form } from '@inertiajs/react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTypedPage } from '@/hooks/typedPage';

export type SidebarEntryProps = {
    method?: 'get' | 'post';
    action: string;
    icon: typeof SvgIcon;
};

export function SidebarEntry({ method = 'get', action, icon: Icon }: SidebarEntryProps) {
    const { url } = useTypedPage();

    const isActive = url === action;
    return (
        <Form action={action} method={method} className="">
            <button
                className={`flex h-[3rem] cursor-pointer items-center gap-2 rounded-xl p-2 font-bold transition-colors ${
                    isActive
                        ? 'bg-primary text-accent' // Classes als de URL actief is
                        : 'text-text-primary hover:bg-primary hover:text-accent' // Standaard / Hover classes
                } `}
            >
                <Icon fontSize="large" />
                <div className={'hidden font-bold md:block'}>Uitloggen</div>
            </button>
        </Form>
    );
}

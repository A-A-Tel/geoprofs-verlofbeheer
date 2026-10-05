import { useTypedPage } from '@/hooks/typedPage';
import { Form } from '@inertiajs/react';
import SvgIcon from '@mui/material/SvgIcon';

export type SidebarEntryProps = {
    method?: 'get' | 'post';
    action: string;
    icon: typeof SvgIcon;
    label: string;
};

export function SidebarEntry({ method = 'get', action, icon: Icon, label }: SidebarEntryProps) {
    const { url } = useTypedPage();

    const isActive = url === action;
    return (
        <Form action={action} method={method} className="">
            <button
                className={`flex h-12 cursor-pointer items-center gap-2 rounded-xl p-2 font-bold transition-colors whitespace-nowrap ${
                    isActive
                        ? 'bg-primary text-accent' // Classes als de URL actief is
                        : 'text-text-primary hover:bg-primary hover:text-accent' // Standaard / Hover classes
                } `}
            >
                <Icon fontSize="large" />
                <div className={'hidden font-bold md:block'}>{label}</div>
            </button>
        </Form>
    );
}

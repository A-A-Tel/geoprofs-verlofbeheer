import { useTypedPage } from '@/hooks/typedPage';
import { Link } from '@inertiajs/react';
import SvgIcon from '@mui/material/SvgIcon';

export type SidebarEntryProps = {
    method?: 'get' | 'post';
    href: string;
    icon: typeof SvgIcon;
    label: string;
};

export function SidebarEntry({ method = 'get', href, icon: Icon, label }: SidebarEntryProps) {
    const { url } = useTypedPage();

    const isActive = url === href;
    return (
        <Link
            href={href}
            method={method}
            className={`flex h-12 cursor-pointer items-center gap-2 rounded-xl p-2 font-bold whitespace-nowrap transition-colors ${
                isActive ? 'bg-primary text-accent' : 'text-text-primary hover:bg-primary hover:text-accent'
            } `}
        >
            <Icon fontSize="large" />
            <div className={'hidden font-bold md:block'}>{label}</div>
        </Link>
    );
}

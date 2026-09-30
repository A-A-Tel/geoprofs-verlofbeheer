import { PageProps } from '@/types/global';
import { usePage } from '@inertiajs/react';

export function useTypedPage<T extends Record<string, unknown> = Record<string, unknown>>() {
    return usePage<PageProps<T>>();
}

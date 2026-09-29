import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/global'; // Adjust paths to match your tsconfig aliases

export function useTypedPage<T extends Record<string, any> = Record<string, any>>() {
    return usePage<PageProps<T>>();
}

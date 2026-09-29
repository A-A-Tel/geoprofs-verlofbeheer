import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Auth } from '@/types/inertia';

export interface User {
    id: number;
    name: string;
    email: string;
}

export type SharedData = {
    auth: Auth|null
};

export type PageProps<T extends Record<string, any> = Record<string, any>> = InertiaPageProps & SharedData & T;

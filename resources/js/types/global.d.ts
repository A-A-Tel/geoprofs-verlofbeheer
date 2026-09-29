import { Auth } from '@/types/inertia';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
}

export type SharedData = {
    auth: Auth | null;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = InertiaPageProps & SharedData & T;

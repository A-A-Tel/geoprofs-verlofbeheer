import './inertia';
import './types';
import { Auth } from '@/types/inertia';

export * from './inertia';
export * from './types';

declare module '@inertiajs/react' {
    interface PageProps {
        auth: Auth
    }
}

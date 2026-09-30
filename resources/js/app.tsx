import { http } from '@inertiajs/core';
import { createInertiaApp } from '@inertiajs/react';
import { setupCaseShift, transformInitialPage } from 'inertia-caseshift';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import '../css/app.css';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

setupCaseShift(http);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        transformInitialPage(props.initialPage as unknown as Record<string, unknown>);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

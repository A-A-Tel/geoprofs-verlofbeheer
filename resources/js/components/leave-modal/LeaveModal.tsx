import { Form } from '@inertiajs/react';

export function LeaveModal(){
    return(
        <div className={`grid h-screen w-full items-center`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto grid gap-12 rounded-3xl border-3 p-8 md:w-1/3'}
                method="POST"
                action={route('login')}
            >
                <button
                    type={'submit'}
                    className={
                        'bg-background border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold'
                    }
                >
                    Inloggen
                </button>
            </Form>
        </div>
    );
}

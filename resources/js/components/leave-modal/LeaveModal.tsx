import { Form } from '@inertiajs/react';

export function LeaveModal() {
    return (
        <div className={`grid h-screen w-full items-center`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto grid gap-12 rounded-3xl border-3 p-8 md:w-1/3'}
                method="POST"
                action={route('leave')}
            >
                <label htmlFor="Leave">type verlof*</label>
                <select
                    name="leave"
                    id="Leave"
                    className="bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold"
                >
                    <option value="ziekdag">Ziekdag</option>
                    <option value="persoonlijk">persoonlijk</option>
                    <option value="verlof">verlof</option>
                    <option value="bijzonder">bijzonder verlof</option>
                </select>
                <textarea
                    name="verlofreden"
                    placeholder={'verlofreden'}
                    className={'bg-primary-dark border-text-secondary h-30 rounded-md border-2 p-2'}
                />
                <button
                    type={'submit'}
                    className={
                        'bg-background border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold'
                    }
                >
                    versturen
                </button>
            </Form>
        </div>
    );
}

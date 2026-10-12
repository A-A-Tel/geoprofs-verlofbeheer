import { Form } from '@inertiajs/react';
import { LeaveType } from '@/types';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
}

export function LeaveModal({types, availableDays}: LeaveModalProps) {
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
                    {types.map((type) => <option className='text-text-primary' key={type.id} value={type.id}>{type.name}</option>)}
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

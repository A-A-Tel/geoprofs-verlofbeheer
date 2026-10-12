import { Form } from '@inertiajs/react';
import { LeaveType } from '@/types';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
}

export function LeaveModal({types, availableDays}: LeaveModalProps) {
    return (
        <div className={`grid h-full w-full items-center`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto grid rounded-3xl border-3 p-8 md:w-2/3'}
                method="post"
                action={route('leave.store')}
            >
                <h1 className='text-4xl font-bold'>Stuur een verlofaanvraag</h1>

                <h2 className='text-2xl font-semibold mt-9 mb-4'>Verlofaanvraag type*</h2>
                <select
                    required
                    name="type"
                    className="text-xl bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold"
                >
                    {types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>

                <h2 className='text-2xl font-semibold mt-9 mb-4'>Begindatum*</h2>
                <input name='start_on' required type="date" className='text-xl bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold' />

                <h2 className='text-2xl font-semibold mt-9 mb-4'>Einddatum</h2>
                <input name='end_on' type="date" className='text-xl bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold' />

                <h2 className='text-2xl font-semibold mt-9 mb-4'>Verlofaanvraag reden*</h2>
                <textarea
                    required
                    name="reason"
                    placeholder={'verlofreden'}
                    className={'text-xl bg-primary-dark border-text-secondary h-30 rounded-md border-2 p-2'}
                />
                <button
                    type='submit'
                    className={
                        'text-2xl mt-9 bg-background border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold'
                    }
                >
                    Versturen
                </button>
            </Form>
        </div>
    );
}

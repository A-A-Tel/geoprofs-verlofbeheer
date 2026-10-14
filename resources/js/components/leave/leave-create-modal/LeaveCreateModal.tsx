import { Form } from '@inertiajs/react';
import { LeaveType } from '@/types';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
}

export function LeaveCreateModal({types, availableDays}: LeaveModalProps) {
    return (
        <div className={`m-auto`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto rounded-3xl border-3 p-8 w-full'}
                method="post"
                action={route('leave.store')}
            >
                <h1 className='md:text-4xl text-3xl font-bold'>Stuur een verlofaanvraag</h1>

                <h2 className='md:text-2xl text-xl font-semibold mt-9 mb-4'>Verlofaanvraag type*</h2>
                <select
                    required
                    name="type"
                    className="md:text-xl text-lg bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold w-full"
                >
                    {types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>

                <h2 className='md:text-2xl font-semibold mt-9 mb-4 text-xl'>Begindatum*</h2>
                <input name='start_on' required type="date" className='w-full text-lg md:text-xl bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold' />

                <h2 className='md:text-2xl font-semibold mt-9 mb-4 text-xl'>Einddatum</h2>
                <input name='end_on' type="date" className='text-lg w-full md:text-xl bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold' />

                <h2 className='md:text-2xl text-xl font-semibold mt-9 mb-4'>Verlofaanvraag reden*</h2>
                <textarea
                    required
                    name="reason"
                    placeholder={'...'}
                    className={'w-full text-lg md:text-xl bg-primary-dark border-text-secondary h-30 rounded-md border-2 p-2'}
                />
                <button
                    type='submit'
                    className={
                        'w-full text-xl md:text-2xl mt-9 bg-background border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 font-bold'
                    }
                >
                    Versturen
                </button>
            </Form>
        </div>
    );
}

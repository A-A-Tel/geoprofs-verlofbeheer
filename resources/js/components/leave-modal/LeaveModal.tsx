import { LeaveType } from '@/types';
import { Form } from '@inertiajs/react';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
};

export function LeaveModal({ types, availableDays }: LeaveModalProps) {
    console.log(availableDays);
    return (
        <div className={`grid h-full w-full items-center`}>
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto grid rounded-3xl border-3 p-8 md:w-2/3'}
                method="post"
                action={route('leave.store')}
            >
                <h1 className="text-4xl font-bold">Stuur een verlofaanvraag</h1>

                <h2 className="mt-9 mb-4 text-2xl font-semibold">Verlofaanvraag type*</h2>
                <select
                    required
                    name="type"
                    className="bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 text-xl font-bold"
                >
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                <h2 className="mt-9 mb-4 text-2xl font-semibold">Begindatum*</h2>
                <input
                    name="start_on"
                    required
                    type="date"
                    className="bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 text-xl font-bold"
                />

                <h2 className="mt-9 mb-4 text-2xl font-semibold">Einddatum</h2>
                <input
                    name="end_on"
                    type="date"
                    className="bg-primary-dark border-text-secondary flex cursor-pointer items-center justify-center rounded-md border-2 p-2 text-xl font-bold"
                />

                <h2 className="mt-9 mb-4 text-2xl font-semibold">Verlofaanvraag reden*</h2>
                <textarea
                    required
                    name="reason"
                    placeholder={'...'}
                    className={'bg-primary-dark border-text-secondary h-30 rounded-md border-2 p-2 text-xl'}
                />
                <button
                    type="submit"
                    className={
                        'bg-background border-text-secondary mt-9 flex cursor-pointer items-center justify-center rounded-md border-2 p-2 text-2xl font-bold'
                    }
                >
                    Versturen
                </button>
            </Form>
        </div>
    );
}

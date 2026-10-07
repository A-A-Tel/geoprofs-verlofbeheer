import { Leave } from '@/types';
import { Form, Link } from '@inertiajs/react';

export type LeaveRequestOverviewProps = {
    leave: Leave;
};

export function LeaveReviewModal({ leave }: LeaveRequestOverviewProps) {

    return (
        <Form
        className={'bg-primary-light text-text-primary border-text-secondary m-auto grid gap-12 rounded-3xl border-3 p-8 md:w-1/2'}
        method="POST"
        action={'#'}
    >
            <div className={'flex flex-col gap-8'}>
                <Link href={`/leave-overview`}>
                    <button
                        type={'submit'}
                        className={'bg-secondary border-text-secondary flex cursor-pointer items-center justify-center rounded-md p-2'}
                    >
                        ← Terug
                    </button>
                </Link>
                <div className={'flex flex-col gap-2'}>
                    <div>Verlof aanvrager *</div>
                    <input
                        name="type"
                        disabled={true}
                        placeholder={leave.requester.firstName + ' ' + leave.requester.lastName}
                        type={'text'}
                        className={'bg-primary-dark border-text-secondary rounded-md border-2 p-2'}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <div>Verlofaanvraag type *</div>
                    <input
                        name="type"
                        disabled={true}
                        placeholder={leave.type.name}
                        type={'text'}
                        className={'bg-primary-dark border-text-secondary rounded-md border-2 p-2'}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <div>Verlofreden *</div>
                    <textarea
                        name="reason"
                        disabled={true}
                        placeholder={leave.reason}
                        className={'bg-primary-dark border-text-secondary rounded-md border-2 p-2'}
                    />
                </div>
                <div className={'flex gap-5'}>
                    <button type={'submit'} className={'bg-action-good flex cursor-pointer items-center justify-center rounded-md p-2'}>
                        Goedkeuren
                    </button>
                    <button
                        type={'submit'}
                        className={'bg-accent-bad border-text-secondary flex cursor-pointer items-center justify-center rounded-md p-2'}
                    >
                        Afkeuren
                    </button>
                </div>
            </div>
        </Form>
    );
}

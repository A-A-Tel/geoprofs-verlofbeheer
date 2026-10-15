import { InfoPopup } from '@/components/info-popup';
import { InfoPopupData } from '@/components/info-popup/InfoPopup';
import { useTypedPage } from '@/hooks/typedPage';
import { LeaveType, Status } from '@/types';
import { Form, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
};

type LeaveFormProps = {
    reason: string;
    type: string;
    start_on: string;
    end_on: string;
};

function getAmountOfDays(date1: Date, date2: Date) {
    const msPerDay = 86_400_000;

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const rawDays = Math.round((utc2 - utc1) / msPerDay);

    return rawDays + 1;
}

function isBeforeToday(date: Date): boolean {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const comparable = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    return comparable < today;
}

export function LeaveCreateModal({ types, availableDays }: LeaveModalProps) {
    const [popup, setPopup] = useState<InfoPopupData>({ content: '', title: '', isOpen: false });

    const { url } = useTypedPage();

    const status = new URL(url, location.origin).searchParams.get('status') as Status | null;

    useEffect(() => {
        if (status !== null) {
            if (status === 'failed') {
                setPopup({
                    isOpen: true,
                    title: 'Er is iets mis gegaan',
                    content: 'Let op dat je niet te veel dagen vrij hebt geprobeerd te nemen',
                });
            } else {
                setPopup({
                    isOpen: true,
                    title: 'Gelukt!',
                    content: 'Je aanvraag is verstuurd.',
                });
            }
            router.visit(window.location.pathname, {
                preserveState: true,
            });
        }
    }, [status]);

    const closePopup = () => {
        setPopup((popup) => ({
            ...popup,
            isOpen: false,
        }));
    };

    return (
        <div className={`my-auto`}>
            <InfoPopup title={popup.title} content={popup.content} isOpen={popup.isOpen} onClose={closePopup} />
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto w-full rounded-3xl border-3 p-8'}
                method="post"
                action={route('leave.store')}
                onBefore={(event) => {
                    const data = event.data as LeaveFormProps;

                    const type = data.type as string;
                    const startOn = data.start_on as string;
                    const endOn = data.end_on as string | null;

                    if (type !== '1') return true;

                    const startDate = new Date(startOn);
                    const endData = endOn ? new Date(endOn) : null;

                    const amountOfDays = endData ? getAmountOfDays(startDate, endData) : 1;

                    if (isBeforeToday(startDate)) {
                        setPopup({
                            isOpen: true,
                            title: 'Invalide datum',
                            content: 'Begindatum kan niet in het verleden liggen.',
                        });
                        return false;
                    }

                    if (amountOfDays < 1) {
                        setPopup({
                            isOpen: true,
                            title: 'Invalide datum',
                            content: 'Einddatum kan niet voor de begindatum liggen.',
                        });
                        return false;
                    }

                    if (amountOfDays > availableDays) {
                        setPopup({
                            isOpen: true,
                            title: 'Invalide duur',
                            content: 'Je hebt niet genoeg verlofdagen hiervoor.',
                        });
                        return false;
                    }

                    return true;
                }}
            >
                <h1 className="text-3xl font-bold md:text-4xl">Stuur een verlofaanvraag</h1>

                <p className="mt-3 text-lg md:text-xl">
                    Je hebt nog {availableDays} verlofdag{availableDays === 1 ? '' : 'en'} over.
                </p>

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Verlofaanvraag type*</h2>
                <select
                    required
                    name="type"
                    className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                >
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Begindatum*</h2>
                <input
                    name="start_on"
                    required
                    type="date"
                    className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                />

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Einddatum</h2>
                <input
                    name="end_on"
                    type="date"
                    className="bg-primary-dark border-text-secondary flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-lg font-bold md:text-xl"
                />

                <h2 className="mt-9 mb-4 text-xl font-semibold md:text-2xl">Verlofaanvraag reden*</h2>
                <textarea
                    required
                    name="reason"
                    placeholder={'...'}
                    className={'bg-primary-dark border-text-secondary h-30 w-full rounded-md border-2 p-2 text-lg md:text-xl'}
                />
                <button
                    type="submit"
                    className={
                        'bg-background border-text-secondary mt-9 flex w-full cursor-pointer items-center justify-center rounded-md border-2 p-2 text-xl font-bold md:text-2xl'
                    }
                >
                    Versturen
                </button>
            </Form>
        </div>
    );
}

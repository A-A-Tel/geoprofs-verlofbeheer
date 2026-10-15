import { Form } from '@inertiajs/react';
import { LeaveType, Status } from '@/types';
import { InfoPopup } from '@/components/info-popup';
import { useEffect, useState } from 'react';
import { InfoPopupData } from '@/components/info-popup/InfoPopup';
import { useTypedPage } from '@/hooks/typedPage';

export type LeaveModalProps = {
    types: LeaveType[];
    availableDays: number;
}

type LeaveFormProps = {
    reason: string;
    type: string;
    start_on: string;
    end_on: string;
}

function getAmountOfDays(date1: Date, date2: Date) {
    const msPerDay = 86_400_000;

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const rawDays = Math.round((utc2 - utc1) / msPerDay);

    return rawDays + 1;
}

export function LeaveCreateModal({types, availableDays}: LeaveModalProps) {
    const [popup, setPopup] = useState<InfoPopupData>({content: '', title: '', isOpen: false});

    const { url } = useTypedPage();

    const status = new URL(url, location.origin)
        .searchParams
        .get('status');

    useEffect(() => {
        if (status !== null) {
            if (status === 'failed') {
                setPopup({
                    isOpen: true,
                    title: 'Er is iets mis gegaan',
                    content: 'Let op dat je niet te veel dagen vrij hebt geprobeerd te nemen'
                });
            }
            else {
                setPopup({
                    isOpen: true,
                    title: 'Gelukt!',
                    content: 'Je aanvraag is verstuurd.'
                })
            }
        }
    }, [status]);

    const closePopup = () => {
        setPopup(popup => ({
            ...popup,
            isOpen: false
        }));
    }

    return (
        <div className={`m-auto`}>
            <InfoPopup title={popup.title} content={popup.content} isOpen={popup.isOpen} onClose={closePopup} />
            <Form
                className={'bg-primary-light text-text-primary border-text-secondary m-auto rounded-3xl border-3 p-8 w-full'}
                method="post"
                action={route('leave.store')}
                onBefore={
                (event) => {
                    const data = event.data as LeaveFormProps;

                    const type = data.type as string;
                    const startOn = data.start_on as string;
                    const endOn = data.end_on as string|null;

                    if (type !== '1') return true;

                    const startDate = new Date(startOn);
                    const endData = endOn ? new Date(endOn) : null;

                    const amountOfDays = endData ? getAmountOfDays(startDate, endData) : 1;


                    if (Date.now() > startDate.getTime()) {
                        setPopup({
                            isOpen: true,
                            title: "Invalide datum",
                            content: "Begindatum kan niet in het verleden liggen."
                        })
                        return false;
                    }

                    if (amountOfDays < 1) {
                        setPopup({
                            isOpen: true,
                            title: "Invalide datum",
                            content: "Einddatum kan niet voor de begindatum liggen."
                        })
                        return false;
                    }

                    if (amountOfDays > availableDays) {
                        setPopup({
                            isOpen: true,
                            title: 'Invalide duur',
                            content: 'Je hebt niet genoeg verlofdagen hiervoor.'
                        })
                        return false;
                    }

                    return true;
                }
                }
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

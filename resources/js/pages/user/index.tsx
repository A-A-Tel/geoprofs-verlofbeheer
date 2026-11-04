import { InfoPopup, InfoPopupData } from '@/components/info-popup/InfoPopup';
import { Sidebar } from '@/components/sidebar';
import { UserList } from '@/components/user-list';
import { useTypedPage } from '@/hooks/typedPage';
import { Status, UserData } from '@/types/types';
import { useEffect, useState } from 'react';

type UserOverviewProps = {
    users: UserData[];
};

export default function Index({ users }: UserOverviewProps) {
    const [popup, setPopup] = useState<InfoPopupData>({ content: '', title: '', isOpen: false });

    const { url } = useTypedPage();

    const status = new URL(url, location.origin).searchParams.get('status') as Status | null;

    useEffect(() => {
        if (status === 'success') {
            setPopup({
                title: 'Gelukt!',
                content: 'Gebruiker aangemaakt, het wachtwoord is gekopieerd naar klembord.',
                isOpen: true,
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
        <Sidebar>
            <InfoPopup title={popup.title} content={popup.content} isOpen={popup.isOpen} onClose={closePopup} />
            <UserList users={users} />
        </Sidebar>
    );
}

import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';

export type InfoPopupData = {
    title: string;
    content: string;
    isOpen: boolean;
};

export type InfoPopupProps = InfoPopupData & {
    onClose: () => void;
};

export function InfoPopup({ isOpen, onClose, title, content }: InfoPopupProps) {
    if (!isOpen) return <div />;

    return createPortal(
        <div className="bg-text-secondary/75 fixed inset-0 flex h-screen w-screen items-center justify-center" onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="text-text-primary bg-primary-light flex w-2/3 flex-col gap-3 rounded-xl p-5 md:w-1/3"
            >
                <div className="flex w-full flex-row items-center justify-between">
                    <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
                    <button className={'text-3xl md:text-5xl'} onClick={onClose}>
                        <CloseIcon fontSize="inherit" className="block" />
                    </button>
                </div>
                <p className="text-lg md:text-2xl">{content}</p>
            </div>
        </div>,
        document.body,
    );
}

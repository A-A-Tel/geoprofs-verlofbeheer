import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

export type InfoPopupData = {
    title: string;
    content: string;
    isOpen: boolean;
}

export type InfoPopupProps = InfoPopupData & {
    onClose: () => void;
}

export function InfoPopup({isOpen, onClose, title, content}: InfoPopupProps) {
    if (!isOpen) return <div/>;

    return createPortal(
        (
            <div className='fixed inset-0 w-screen h-screen bg-text-secondary/75 flex justify-center items-center' onClick={onClose}>
                <div onClick={e => e.stopPropagation()} className='gap-3 text-text-primary flex flex-col md:w-1/3 w-2/3 bg-primary-light p-5 rounded-xl'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <h2 className='font-bold text-2xl md:text-4xl'>{title}</h2>
                        <button className={'text-3xl md:text-5xl'} onClick={onClose}>
                            <CloseIcon fontSize='inherit' className="block" />
                        </button>
                    </div>
                    <p className='text-lg md:text-2xl'>{content}</p>
                </div>
            </div>
        ),
        document.body
    );
}

import { useTypedPage } from '@/hooks/typedPage';
import { Succeeded } from '@/types';

type LeaveProps = {
    types: string[]
}

export function Leave({ types }: LeaveProps) {
    const {
        url
    } = useTypedPage();

    const params = new URLSearchParams(url);
    const succeeded = params.get('succeeded') as Succeeded|null;

    console.log(succeeded);
    console.log(types);

    return (
        <>
        </>
    );
}

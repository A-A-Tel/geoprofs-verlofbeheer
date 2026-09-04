type HelloProps = {
    text: string;
};

export function Hello({ text }: HelloProps) {
    return <div>{text}</div>;
}

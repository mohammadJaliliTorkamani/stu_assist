import './Button.css'

interface IProps {
    title: string,
    reference?: any,
    className?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ title, onClick, className = "", reference = null }: IProps) {
    return (
        <button className={"btn " + className} ref={reference} onClick={(e) => onClick(e)
        }>
            {title}
        </button >
    )
}

export default Button
import styled from "@emotion/styled"
import './Button.css'

interface IProps {
    title: string,
    reference?: any,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ title, onClick, reference = null }: IProps) {
    return (
        <button
            className="btn"
            ref={reference}
            onClick={(e) => onClick!(e)}>{title}
        </button>
    )
}

export default Button
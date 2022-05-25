import styled from "@emotion/styled"

const Container = styled.button`
    color: white;
    border: 0px solid green;
    border-radius: 2px;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 1rem;
`;

interface IProps {
    title: string,
    color?: string,
    reference?: any,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ title, onClick, color = "green", reference = null }: IProps) {
    return (
        <Container
            style={{
                background: color,
                color: ((color === "white" || color === "#ffffff" || color === "#fff") ? "black" : "white")
            }}
            ref={reference}
            onClick={(e) => onClick(e)}>{title}
        </Container>
    )
}

export default Button
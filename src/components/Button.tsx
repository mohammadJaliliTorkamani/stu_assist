import styled from "@emotion/styled"

const Container = styled.button`
    color: white;
    border: 0px solid orange;
    border-radius: 2px;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 1rem;
`;

interface IProps {
    title: string,
    color?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ title, color = "orange", onClick }: IProps) {
    return (
        <Container
            style={{
                background: color,
                color: ((color === "white" || color === "#ffffff" || color === "#fff") ? "black" : "white")
            }}
            onClick={(e) => onClick(e)}>{title}
        </Container>
    )
}

export default Button
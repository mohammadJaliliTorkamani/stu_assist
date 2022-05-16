import styled from "@emotion/styled"

const Container = styled.button`
    width: 8rem;
    height: 2rem;
    background: orange;
    color: white;
    border: 0px solid orange;
    border-radius: 2px;
    font-size: 1.2rem;
    cursor: pointer;
`;

interface IProps {
    title: string,
    color: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ title, color, onClick }: IProps) {
    return (
        <Container style={{ background: color }} onClick={(e) => onClick(e)}>{title}</Container>
    )
}

export default Button
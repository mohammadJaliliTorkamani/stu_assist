import styled from "@emotion/styled"

const Container = styled.button`
    width: 8rem;
    height: 2rem;
    background: orange;
    color: white;
    border: 0px solid orange;
    border-radius: 2px;
    font-size: 1.2rem;
`;

interface IProps {
    title: string,
    color: string
}

function CalculateButton({ title, color }: IProps) {
    return (
        <Container style={{ background: color }}>{title}</Container>
    )
}

export default CalculateButton
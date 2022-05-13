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
    title: string
}

function CalculateButton({ title }: IProps) {
    return (
        <Container>{title}</Container>
    )
}

export default CalculateButton
import styled from "@emotion/styled"

const Container = styled.div`
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Title = styled.div`

`;

const ValueInput = styled.input`
    height: 2rem;
    width: 8rem;
    coolor: black;
    text-align: center;
    font-size: 1.2rem;
`;

interface IProps {
    title: string
}

function GPANumericField({ title }: IProps) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <ValueInput type='number' min={0} max={20} />
        </Container>
    )
}

export default GPANumericField
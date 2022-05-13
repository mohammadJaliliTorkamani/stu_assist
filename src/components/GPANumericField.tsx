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
    width: 5rem;
    coolor: black;
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
            <ValueInput type='number' max={20} min={0} />
        </Container>
    )
}

export default GPANumericField
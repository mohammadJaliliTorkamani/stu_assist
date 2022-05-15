import styled from "@emotion/styled"

interface IProps {
    title: string,
    value: string
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    color: black;
    font-weight: 700;
    font-size: 1.5rem'
`;

const Value = styled.div`
    color: black;
    font-size: 1.4rem'
`;

function InfoRecord({ title, value }: IProps) {
    return (
        <Container>
            <Title>{title} : </Title>
            <Value>{value}</Value>
        </Container>
    )
}

export default InfoRecord
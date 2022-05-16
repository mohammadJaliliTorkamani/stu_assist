import styled from "@emotion/styled"

const Container = styled.div`
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.div`
    color: black;
`;

const ValueInput = styled.input`
    height: 2rem;
    width: 6rem;
    coolor: black;
    text-align: center;
    font-size: 1.2rem;
`;

interface IProps {
    title: string,
    max: number,
    min: number,
    value: any,
    setValue: any
}

function TitledNumericInput({ title, max, min, value, setValue }: IProps) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <ValueInput
                type='number'
                min={min}
                max={max}
                value={value}
                onChange={e => parseInt(e.target.value) <= max ? setValue(e.target.value) : null}
            />
        </Container>
    )
}

export default TitledNumericInput
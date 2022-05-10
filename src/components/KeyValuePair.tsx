import styled from "@emotion/styled"

const Container = styled.div`
    display: flex;
    justify-content:flex-end;
    font-size: 0.9rem;
`;


interface IProps {
    label: string,
    value: string
}
function KeyValuePair(props: IProps) {
    return (
        <Container>{props.label} : {props.value}</Container>
    )
}

export default KeyValuePair
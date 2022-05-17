import styled from "@emotion/styled"

const Container = styled.a`
    display: flex;
    justify-content:flex-end;
    font-size: 0.9rem;
    text-decoration: none;
    color: white;
`;


interface IProps {
    label: string,
    value: string,
    color?: string
}
function KeyValuePair({ label, value, color = "white" }: IProps) {
    return (
        <Container href={"mailto: " + value} style={{ color: color }}> {label} : {value}</Container >
    )
}

export default KeyValuePair
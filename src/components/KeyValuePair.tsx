import styled from "@emotion/styled"

const Container = styled.a`
    display: flex;
    justify-content:space-between;
    align-items: center;
    font-size: 0.9rem;
    text-decoration: none;
    color: white;
    width: 15rem;
`;

const Child = styled.div`

`;


interface IProps {
    label: string,
    value: string,
    color?: string
}
function KeyValuePair({ label, value, color = "white" }: IProps) {
    return (
        <Container href={"mailto: " + value} style={{ color: color }}>
            <Child> {label} :</Child>            
            <Child> {value}</Child>
        </Container >
    )
}

export default KeyValuePair
import styled from "@emotion/styled"

const Container = styled.div`
    color: black;
    cursor: pointer;
    diosplay: flex;
    flex-direction : row;
    justify-content: cetner;
    align-items: center;
    margin: 1rem;
    border: 1px solid green;
    border-radius: 4px;
    padding: 1rem;
    font-size: 0.85rem;
`

interface IProps {
    title: string,
    selected: boolean,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

function ChargeOptionRecord(props: IProps) {
    return (
        <Container onClick={e => props.onClick(e)} style={props.selected ? { border: '2px solid #0a3816' } : {}}>
            {props.title}
        </Container >
    )
}

export default ChargeOptionRecord
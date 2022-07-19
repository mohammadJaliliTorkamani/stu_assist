import styled from "@emotion/styled"
import React from "react"

const Container = styled.div`
    color: black;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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
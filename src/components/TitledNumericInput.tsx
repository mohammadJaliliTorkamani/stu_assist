import styled from "@emotion/styled"
import React from "react";

const Title = styled.div`
    color: black;
`

const ValueInput = styled.input`
    height: 2rem;
    width: 6rem;
    coolor: black;
    text-align: center;
    font-size: 1.2rem;
`

interface IProps {
    title: string,
    max: number,
    min: number,
    value: any,
    setValue: any,
    className?: string
}

function TitledNumericInput({ title, max, min, value, setValue, className }: IProps) {
    return (
        <div className={className}>
            <Title>
                {title}
            </Title>
            <ValueInput
                type='number'
                min={min}
                max={max}
                value={value}
                step={1}
                onChange={e => parseInt(e.target.value) <= max ? setValue(e.target.value) : null}
            />
        </div>
    )
}

export default React.memo(TitledNumericInput)
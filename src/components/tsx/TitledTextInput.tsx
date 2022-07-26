import styled from "@emotion/styled"
import React from "react";

const Title = styled.div`
    color: black;
`

const ValueInput = styled.input`
    height: 2rem;
    width: 10rem;
    coolor: black;
    text-align: center;
    font-size: 1.2rem;
`

interface IProps {
    title: string,
    maxLength: number,
    value: any,
    setValue: any,
    className?: string
}

function TitledTextInput({ title, maxLength, value, setValue, className }: IProps) {
    return (
        <div className={className}>
            <Title>
                {title}
            </Title>
            <ValueInput
                type='text'
                maxLength={maxLength}
                value={value}
                step={1}
                onChange={e => {
                    if (e.target.value === '')
                        setValue('')
                    else {
                        setValue(e.target.value)
                    }
                }
                }
            />
        </div>
    )
}

export default React.memo(TitledTextInput)
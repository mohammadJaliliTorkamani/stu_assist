import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface IProps {
    isOK: boolean;
}

const GreenLabel = styled.div`
    color: green;
    font-size: 2rem;
    margin: 1rem;
    align-self: center;
`

const RedLabel = styled.div`
    color: red;
    font-size: 2rem;
    margin: 2rem;
`

const Continer = styled.div`
    display: flex;
    flex-direction: column;
    height: 56rem;
    background: #ededed;
    justify-content: center;
    align-items: center;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    height: 48rem;
    width: 30rem;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 1.2rem;
`

const OKContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: stretch;
`

const FailContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    flex: 1;
    justify-content: center;
`

const Pair = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: space-between;
    height: 4rem;
    align-items: stretch;
`

const Key = styled.div`
    color: black;
    align-self: center;
    font-size: 1rem;
`

const Value = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: gray;
    background: #dbdbdb;
    font-size: 1rem;
    height: 2.5rem;
    border-radius: 3rem;
    border: 0px solid black;
`

function PaymentResult(props: IProps) {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | " + (props.isOK ? "موفق" : "ناموفق")
    }, [props.isOK])

    return (
        <Continer>
            <Box>
                {
                    props.isOK && <OKContainer>
                        <GreenLabel>پرداخت موفق</GreenLabel>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Pair>
                            <Key>کلید</Key>
                            <Value>12345</Value>
                        </Pair>
                        <Button title="بازگشت به خانه" onClick={e => navigate('/', { replace: true })} />
                    </OKContainer>
                }
                {
                    !props.isOK && <FailContainer>
                        <RedLabel>خطا در پرداخت</RedLabel>
                        <Button title="بازگشت به خانه" onClick={e => navigate('/', { replace: true })} />
                    </FailContainer>
                }
            </Box>
        </Continer>
    )
}

export default PaymentResult
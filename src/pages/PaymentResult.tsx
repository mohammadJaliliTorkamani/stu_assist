import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";
import usePageTitle from "../hooks/usePageTitle";
import { LINK_PAYMENT_RESULT } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";
import { getToastColor, toastMessage, ToastStatus } from "../utils/Utils";

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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #ededed;
    justify-content: center;
    align-items: center;
    direction: rtl;
    height: calc(100vh - 160px);
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

interface PaymentResultTemplate {
    orderID: number,
    userPhone: string,
    cardNumber: string,
    price: number,
    status: number,
    statusMeaning: string,
    trackID: string,
    date: string,
    time: string
}

function PaymentResult() {
    const [token,] = useLocalStorage('token', null)
    const navigate = useNavigate()
    const [result, setResult] = useState<PaymentResultTemplate>({} as PaymentResultTemplate)
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    useEffect(() => {
        axios.get(LINK_PAYMENT_RESULT, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.data)
            .then(data => {
                if (data.error) {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(data.message)
                } else
                    setResult(data.data)

            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })

        document.title = "Stu Assist | " + result.statusMeaning
    }, [token, result.statusMeaning])

    return (
        <Container>
            <Box>
                {
                    result.status === 100 && <OKContainer>
                        <GreenLabel>پرداخت موفق</GreenLabel>
                        <Pair>
                            <Key>شماره تلفن</Key>
                            <Value>{result.userPhone}</Value>
                        </Pair>
                        <Pair>
                            <Key>شماره کارت</Key>
                            <Value>{result.cardNumber}</Value>
                        </Pair>
                        <Pair>
                            <Key>شماره سفارش</Key>
                            <Value>{result.orderID}</Value>
                        </Pair>
                        <Pair>
                            <Key>مبلغ</Key>
                            <Value>`{result.price} ریال`</Value>
                        </Pair>
                        <Pair>
                            <Key>شماره پیگیری</Key>
                            <Value>{result.trackID}</Value>
                        </Pair>
                        <Pair>
                            <Key>تاریخ پرداخت</Key>
                            <Value>{result.date}</Value>
                        </Pair>
                        <Pair>
                            <Key>زمان پرداخت</Key>
                            <Value>{result.time}</Value>
                        </Pair>
                        <Button title="بازگشت به خانه" onClick={e => navigate('/', { replace: true })} />
                    </OKContainer>
                }
                {
                    result.status !== 100 && <FailContainer>
                        <RedLabel>{result.statusMeaning}</RedLabel>
                        <Button title="بازگشت به خانه" onClick={e => navigate('/', { replace: true })} />
                    </FailContainer>
                }
            </Box>
            <ToastContainer
                toastStyle={{
                    backgroundColor: getToastColor(toastID),
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}
                limit={1}
                hideProgressBar={true}
                position='bottom-center' />
        </Container>
    )
}

export default PaymentResult
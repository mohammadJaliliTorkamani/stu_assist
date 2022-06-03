import styled from "@emotion/styled"
import axios from "axios";
import { useEffect, useState } from "react";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import InfoRecord from "../components/InfoRecord";
import TransactionRecord from "../components/TransactionRecord";
import useChargeOptions from "../hooks/useChargeOptions";
import { LINK_PAYMENT, LINK_PROFILE } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    flex: 3;
    height: 30rem;
    margin-top: 2rem;
    margin-left: 1rem;
    border: 2px solid green;
    border-radius: 2rem; 
    padding: 2rem;
`

const LeftBox = styled.div`
    flex: 2;
    border: 2px solid green;
    height: 30rem;
    margin-top: 2rem;
    border-radius: 2rem;
    padding: 2rem;
    overflow-y: scroll;
    overflow-x: none;
`

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 10rem;
    width : 100%;
`

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    padding-left: 3rem;
    padding-right: 3rem;
    height: 39rem;
`

const PayButton = styled.button`
    color: white;
    background: green;
    border-radius: 4px;
    border: 0px solid green;
    width: 14rem;
    height: 3rem;
    margin-top: 1rem;
    font-size : 0.94rem;
    cursor: pointer;
`

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const Table = styled.table`
    border: 2px solid forestgreen;
    width: 800px;
    max-height: 100%;
    overflow-y: scroll;
`

const Row = styled.tr`
    background: forestgreen;
`

const TableHeader = styled.th`
    color: white;
    height: 35px;
`

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    orderID: number,
    cardNo: string,
    date: string,
    time: string
}

function Profile() {
    const [fullName, setFullName] = useState('')
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<TranscationRecordType[]>([] as TranscationRecordType[])
    const [token,] = useLocalStorage('token', null)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()

    useEffect(() => {
        document.title = "Stu Assist | حساب کاربری"
        axios
            .get(LINK_PROFILE, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                if (!data.error) {

                    setFullName(data.data.fullName);
                    setBalance(data.data.balance)
                    setTransactions(data.data.transactions)
                }
                else
                    alert(data.message)
            })
            .catch(error => JSON.stringify(error))
    }, [token])

    return (
        <Content>
            <RightBox >
                <InfoBox >
                    <InfoRecord title={"نام و نام خانوادگی"} value={fullName === ' ' ? "ندارد" : fullName} />
                    <InfoRecord title={"موجودی"} value={balance + " ریال "} />
                </InfoBox>
                <ChargeBox>
                    <ChargeOptions>
                        {chargeValues.map(value =>
                            <ChargeOptionRecord
                                key={value.id}
                                selected={selectedChargeOption.id === value.id}
                                onClick={e => { setSelectedChargeOption(value) }}
                                title={`${value.price / 10} تومان`}
                            />)}
                    </ChargeOptions>
                    <PayButton onClick={e => {
                        axios
                            .post(LINK_PAYMENT,
                                {
                                    price: selectedChargeOption.price
                                }, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => response.data)
                            .then(data => window.open(data.data, "_self"))
                            .catch(error => {
                                alert(JSON.stringify(error.response.data.message))
                            })

                    }}>پرداخت</PayButton>
                </ChargeBox>
            </RightBox>
            <LeftBox>
                <Table>
                    <tbody>
                        <Row>
                            <TableHeader>ردیف</TableHeader>
                            <TableHeader>شماره سفارش</TableHeader>
                            <TableHeader>شماره کارت</TableHeader>
                            <TableHeader>کد پیگیری</TableHeader>
                            <TableHeader>تاریخ</TableHeader>
                            <TableHeader>ساعت</TableHeader>
                        </Row>

                        {
                            transactions.map(record => <TransactionRecord key={record.id} record={record} />)
                        }
                    </tbody>
                </Table>
            </LeftBox>
        </Content >
    )
}

export default Profile

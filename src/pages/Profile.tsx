import styled from "@emotion/styled"
import axios from "axios";
import { useEffect, useState } from "react";
import InfoRecord from "../components/InfoRecord";
import TransactionRecord from "../components/TransactionRecord";

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    flex: 3;
    min-height: 40rem;
    margin-left: 1rem;
    border: 2px solid red;
    border-radius: 2rem; 
    padding: 2rem;
`;

const LeftBox = styled.div`
    flex: 2;
    border: 2px solid blue;
    border-radius: 2rem;
    padding: 2rem;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 10rem;
    width : 100%;
`;

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    padding-left: 3rem;
    padding-right: 3rem;
    min-height: 30rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
`;

const PayButton = styled.button`
    color: white;
    background: orange;
    border-radius: 4px;
    border: 0px solid orange;
    width: 14rem;
    height: 3rem;
    margin-top: 1rem;
    font-size : 0.94rem;
    cursor: pointer;
`;

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const ChargeOptionRecord = styled.div`
    color: black;
    cursor: pointer;
    diosplay: flex;
    flex-direction : row;
    justify-content: cetner;
    align-items: center;
    margin: 1rem;
    border: 1px solid orange;
    border-radius: 4px;
    padding: 1rem;
    font-size: 0.85rem;
`;

const Table = styled.table`
    border: 2px solid forestgreen;
    width: 800px;
`;

const Row = styled.tr`
    background: forestgreen;
`;

const TableHeader = styled.th`
    color: white;
    height: 35px;
`;

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    bank: string,
    cardNo: string,
    date: string,
    time: string
}

const chargeValue = [{ id: 1, value: 50, price: 50000 }, { id: 2, value: 200, price: 100000 }, { id: 3, value: 500, price: 250000 }, { id: 4, value: 1000, price: 500000 }]

function Profile() {
    const [fullName, setFullName] = useState('')
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<TranscationRecordType[]>([] as TranscationRecordType[])
    const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'


    useEffect(() => {
        axios
            .get('http://localhost:8000/stu_assist_backend/user/profile.php', {
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
            .catch(error => alert('error!'))
    }, [])

    return (
        <Content>
            <RightBox >
                <InfoBox >
                    <InfoRecord title={"نام و نام خانوادگی"} value={fullName} />
                    <InfoRecord title={"تعداد درخواست باقی مانده"} value={balance + " ریال "} />
                </InfoBox>
                <ChargeBox>
                    <ChargeOptions>
                        {chargeValue.map(value => {
                            return <ChargeOptionRecord key={value.id}>{value.value} درخواست , {value.price} تومان</ChargeOptionRecord>
                        })}
                    </ChargeOptions>
                    <PayButton>پرداخت</PayButton>
                </ChargeBox>
            </RightBox>
            <LeftBox>
                <Table>
                    <tbody>
                        <Row>
                            <TableHeader>ردیف</TableHeader>
                            <TableHeader>بانک</TableHeader>
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
        </Content>
    )
}


export default Profile

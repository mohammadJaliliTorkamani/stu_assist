import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import TransactionRecord from "../components/TransactionRecord";
import useChargeOptions from "../hooks/useChargeOptions";
import { LINK_PAYMENT, LINK_PROFILE } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";
import './Profile.css'

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    orderID: number,
    cardNo: string,
    date: string,
    time: string
}

function Profile() {
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<TranscationRecordType[]>([] as TranscationRecordType[])
    const [token,] = useLocalStorage('token', null)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()

    const handlePayment = () => {
        axios.post(LINK_PAYMENT,
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
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
    }

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
                    setBalance(data.data.balance)
                    setTransactions(data.data.transactions)
                }
                else
                    alert(data.message)
            })
            .catch(error => JSON.stringify(error))
    }, [token])

    return (
        <div className="content">
            <div className="box top-box" >
                {"موجودی کیف پول : " + balance + " ریال "}
                <div className="charge-box">
                    <div className="charge-options">
                        {
                            chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${value.price / 10} تومان`}

                                />)
                        }
                    </div>
                    <Button title="پرداخت" onClick={e => handlePayment()} />
                </div>
            </div>
                <table className="table">
                    <tbody>
                        <tr className="table-row">
                            <th className="table-header">ردیف</th>
                            <th className="table-header"> سفارش</th>
                            <th className="table-header">کد پیگیری</th>
                            <th className="table-header">تاریخ</th>
                            <th className="table-header">ساعت</th>
                        </tr>
                        {transactions.map(record => <TransactionRecord key={record.id} record={record} />)}
                    </tbody>
                </table>
        </div >
    )
}

export default Profile

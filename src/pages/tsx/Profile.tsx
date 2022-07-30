import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../components/tsx/Button";
import ChargeOptionRecord from "../../components/tsx/ChargeOptionRecord";
import TransactionRecord from "../../components/tsx/TransactionRecord";
import useChargeOptions from "../../hooks/useChargeOptions";
import usePageTitle from "../../hooks/usePageTitle";
import { LINK_EDIT_USER, LINK_PAYMENT, LINK_PROFILE } from "../../utils/Constants";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";
import '../css/Profile.css'

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
    const [fullName, setFullName] = useState('')
    const [transactions, setTransactions] = useState<TranscationRecordType[]>([])
    const [token,] = useLocalStorage('token', null)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    usePageTitle('حساب کاربری')

    const handlePayment = () => {
        axios.post(LINK_PAYMENT,
            {
                price: selectedChargeOption.price,
                number_of_requests: selectedChargeOption.numberOfRequests,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => window.open(data.data, "_self"))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }

    const handleNameChangeClick = () => {
        const fullNameValue = fullName
        if (fullNameValue === '') {
            setToastStatus(ToastStatus.INFO)
            toastMessage("لطفا ابتدا نام و نام خانوادگی خود را وارد نمایید")
            return
        }

        axios
            .get(LINK_EDIT_USER, {
                params: {
                    fullName: fullNameValue
                }, headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                setToastStatus(ToastStatus.SUCCESS)
                toastMessage(data.message)
            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }

    useEffect(() => {
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
                    setFullName(data.data.fullName)
                    setTransactions(data.data.transactions)
                }
                else {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(data.message)
                }
            })
            .catch(error => JSON.stringify(error))
    }, [token])

    return (
        <div className="content">
            <div className="box top-box" >
                <div className="full-name-label">نام و نام خانوادگی</div>
                <div className="profile-name-input-container">
                    <input className="full-name-input" type="text" maxLength={140} value={fullName} onChange={e => setFullName(e.target.value)} placeholder="لطفا نام کامل خود را وارد نمایید" />
                    <Button title="اصلاح اطلاعات" onClick={e => handleNameChangeClick()} />
                </div>
            </div>

            <div className="box" >
                {"موجودی کیف پول : " + balance.toLocaleString() + " ریال "}
                <div className="charge-box">
                    <div className="charge-options">
                        {
                            chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${(value.price / 10).toLocaleString()} تومان به ازای  ${value.numberOfRequests} محاسبه `}

                                />)
                        }
                    </div>
                    <Button title="پرداخت" onClick={e => handlePayment()} />
                </div>
            </div>
            <table className="table">
                <tbody className="table-body">
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
        </div >
    )
}

export default Profile

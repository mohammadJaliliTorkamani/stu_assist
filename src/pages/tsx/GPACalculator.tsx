import styled from "@emotion/styled";
import Button from "../../components/tsx/Button";
import TitledNumericInput from "../../components/tsx/TitledNumericInput";
import { useNavigate } from "react-router-dom";
import ChargeOptionRecord from "../../components/tsx/ChargeOptionRecord";
import useGPA from "../../hooks/useGPA";
import useChargeOptions from "../../hooks/useChargeOptions";
import { LINK_PAYMENT } from "../../utils/Constants";
import axios from "axios";
import { useLocalStorage } from "../../utils/useLocalStorage";
import usePageTitle from "../../hooks/usePageTitle";
import { useCallback, useState } from "react";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";
import { ToastContainer } from "react-toastify";
import '../css/GPACalculator.css'


const SelectedTitle = styled.div`
    font-size: 1rem;
    padding-bottom: 1rem;
`

const Result = styled.div`
    font-size: 3.5rem;
    color: green;
`

function GPACalculator() {
    const [min, max, grade, gpa, loading, guest, outOfBalance, setMin, setMax, setGrade, trigger] = useGPA(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [token,] = useLocalStorage('token', null)
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    const naviaget = useNavigate()
    usePageTitle('محاسبه GPA')
    const handlePayment = useCallback(() => {
        axios
            .post(LINK_PAYMENT,
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
    }, [selectedChargeOption, token])

    return (
        <div className="gpa-container">
            <div className="gpa-box">
                <div className="fields-container">
                    <TitledNumericInput title={"نمره مورد نظر"} value={grade} setValue={setGrade} max={20} min={0} className="numeric-input-container" />
                    <TitledNumericInput title={"حداکثر نمره قابل قبول"} value={max} setValue={setMax} max={20} min={0} className="numeric-input-container" />
                    <TitledNumericInput title={"حداقل نمره قابل قبول"} value={min} setValue={setMin} max={20} min={0} className="numeric-input-container" />
                    <Button title={"محاسبه"} className="calculate-button" onClick={() => {
                        if (max.toString() === '' || min.toString() === '' || grade.toString() === '') {
                            setToastStatus(ToastStatus.INFO)
                            toastMessage('لطفا ابتدا تمامی فیلد ها را وارد کنید')
                        } else
                            trigger()
                    }} />
                </div>
                <div className="result-container">
                    {
                        loading && <div>در حال بارگذاری...</div>
                    }
                    {
                        guest && !loading && <div className="login-box">
                            <SelectedTitle>
                                لطفا ابتدا وارد حساب کاربری خود شوید
                            </SelectedTitle>
                            <Button title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
                        </div>
                    }
                    {
                        !guest && !loading && outOfBalance &&
                        <div className="charge-box">
                            <SelectedTitle>موجودی کیف پول شما به پایان رسیده است</SelectedTitle>
                            <SelectedTitle> {"برای ادامه، لطفا یکی از گزینه های پرداخت را انتخاب نمایید"} </SelectedTitle >

                            <div className="charge-options">
                                {chargeValues.map(value =>
                                    <ChargeOptionRecord
                                        key={value.id}
                                        selected={selectedChargeOption.id === value.id}
                                        onClick={e => { setSelectedChargeOption(value) }}
                                        title={`${(value.price / 10).toLocaleString()} تومان به ازای  ${value.numberOfRequests} محاسبه `}
                                    />)}
                            </div>
                            <Button title="پرداخت" onClick={e => handlePayment()} />
                        </div>
                    }
                    {
                        !loading && !guest && !outOfBalance &&
                        <>
                            <SelectedTitle>مقدار GPA : </SelectedTitle>
                            <Result>
                                {gpa}
                            </Result>
                        </>
                    }
                </div>
            </div>
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
        </div>
    )
}

export default GPACalculator
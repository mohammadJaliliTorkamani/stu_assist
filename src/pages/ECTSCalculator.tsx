import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import TitledNumericInput from "../components/TitledNumericInput";
import useChargeOptions from "../hooks/useChargeOptions";
import useECTS from "../hooks/useECTS";
import { LINK_PAYMENT } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";

import './ECTSCalculator.css'

const SelectedTitle = styled.div`
    font-size: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const Result = styled.div`
    font-size: 3.5rem;
    color: green;
`

function ECTSCalculator() {

    const [unit, time, week, ects, loading, guest, outOfCoupon, setUnit, setTime, setWeek, trigger] = useECTS(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [token,] = useLocalStorage('token', null)

    const navigate = useNavigate()

    const handlePayment = () => {
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
                alert(JSON.stringify(error.response.data.message))
            })
    }

    useEffect(() => {
        document.title = "Stu Assist | محاسبه ECTS "
    }, [])

    return (
        <div className="container">
            <div className="fields-container">
                <TitledNumericInput title={"تعداد واحد درس"} value={unit} setValue={setUnit} max={20} min={1} className="numeric-input-container" />
                <TitledNumericInput title={"مدت زمان تدریس هر واحد در هفته (دقیقه)"} value={time} setValue={setTime} max={120} min={0} className="numeric-input-container" />
                <TitledNumericInput title={"تعداد هفته نظام آموزشی اروپایی"} value={week} setValue={setWeek} max={25} min={10} className="numeric-input-container" />
                <Button title={"محاسبه"} className="calculate-button" onClick={() => trigger()} />
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
                        <Button title="ورود / ثبت نام" onClick={e => navigate('/login', { replace: true })} />
                    </div>
                }
                {
                    !guest && !loading && outOfCoupon &&
                    <div className="charge-box">
                        <SelectedTitle>موجودی کیف پول شما به پایان رسیده است</SelectedTitle>
                        <SelectedTitle> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گزینه های پرداخت را انتخاب نمایید"} </SelectedTitle >

                        <div className="charge-options">
                            {chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${value.price / 10} تومان به ازای  ${value.numberOfRequests}محاسبه`}
                                />)}
                        </div>
                        <Button title="پرداخت" onClick={e => handlePayment()} />
                    </div>
                }
                {
                    !loading && !guest && !outOfCoupon &&
                    <>
                        <SelectedTitle>مقدار ECTS : </SelectedTitle>
                        <Result>
                            {ects}
                        </Result>
                    </>
                }
            </div>
        </div>
    )
}

export default ECTSCalculator
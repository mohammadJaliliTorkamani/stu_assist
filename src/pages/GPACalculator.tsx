import styled from "@emotion/styled";
import { useEffect } from "react";
import Button from "../components/Button";
import TitledNumericInput from "../components/TitledNumericInput";
import { useNavigate } from "react-router-dom";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import useGPA from "../hooks/useGPA";
import useChargeOptions from "../hooks/useChargeOptions";
import { LINK_PAYMENT } from "../utils/Constants";
import axios from "axios";
import { useLocalStorage } from "../utils/useLocalStorage";
import './GPACalculator.css'


const SelectedTitle = styled.div`
    font-size: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const Result = styled.div`
    font-size: 3.5rem;
    color: green;
`

function GPACalculator() {
    const [min, max, grade, gpa, loading, guest, outOfCoupon, setMin, setMax, setGrade, trigger] = useGPA(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [token,] = useLocalStorage('token', null)

    const naviaget = useNavigate()

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
        document.title = "Stu Assist | محاسبه GPA "
    }, [])

    return (
        <div className="container">
            <div className="fields-container">
                <TitledNumericInput title={"نمره شما"} value={grade} setValue={setGrade} max={20} min={0} className="numeric-input-container" />
                <TitledNumericInput title={"حداکثر نمره قابل قبول"} value={max} setValue={setMax} max={20} min={0} className="numeric-input-container" />
                <TitledNumericInput title={"حداقل نمره قابل قبول"} value={min} setValue={setMin} max={20} min={0} className="numeric-input-container" />
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
                        <Button title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
                    </div>
                }
                {
                    !guest && !loading && outOfCoupon &&
                    <div className="charge-box">
                        <SelectedTitle>موجودی کیف پول شما به پایان رسیده است</SelectedTitle>
                        <SelectedTitle> {"برای ادامه، لطفا یکی از گزینه های پرداخت را انتخاب نمایید"} </SelectedTitle >

                        <div className="charge-options">
                            {chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${value.price / 10} تومان به ازای  ${value.numberOfRequests} محاسبه `}
                                />)}
                        </div>
                        <Button title="پرداخت" onClick={e => handlePayment()} />
                    </div>
                }
                {
                    !loading && !guest && !outOfCoupon &&
                    <>
                        <SelectedTitle>مقدار GPA : </SelectedTitle>
                        <Result>
                            {gpa}
                        </Result>
                    </>
                }
            </div>
        </div>
    )
}

export default GPACalculator
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import TitledNumericInput from "../components/TitledNumericInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChargeOptionRecord from "../components/ChargeOptionRecord";

const GPAContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 40rem;
`;

const FieldsContainer = styled.div`
    margin-top: 1rem;
    flex:0.7;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 8rem;
    padding-right: 8rem; 
    align-items: center;    
`;

const ResultContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
`;

const ResultInnerContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 2px solid #0a3816;
    border-radius: 1rem;
    min-width: 60rem;
`;

const Title = styled.div`
    font-size: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #11a841;
`;

const SelectedTitle = styled.div`
    font-size: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const Result = styled.div`
    font-size: 3.5rem;
    color: green;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    align-items: center;
`;

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 25rem;
`;

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

interface ChargeValue {
    id: number,
    value: number,
    price: number
}

function GPACalculator() {
    const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'
    const [isLoading, setIsLoading] = useState(true)
    const [isGuest, setIsGuest] = useState(false)
    const [isOutOfCoupon, setIsOutOfCoupon] = useState(false)
    const [selectedChargeOption, setSelectedChargeOption] = useState({ id: -1, value: -1, price: -1 })
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [grade, setGrade] = useState(0)
    const [gpa, setGPA] = useState(0)
    const [chargeValues, setChargeValues] = useState<ChargeValue[]>([])

    const naviaget = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | محاسبه GPA "
        axios
            .get('http://localhost:8000/stu_assist_backend/payment/charge_options.php', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                setIsLoading(false)
                return response.data
            })
            .then(data => data.error ? alert(data.message) : setChargeValues(data.data))
            .catch(error => {
                setIsLoading(false)
                alert('خطا')
            })
    }, [])

    const handleCalculate = () => {
        if (!isLoading && !isGuest)
            if (max - min === 0)
                setGPA(0)
            else {
                setIsLoading(true)
                axios.get('http://localhost:8000/stu_assist_backend/services/gpa_calculation.php', {
                    params: {
                        min: min,
                        max: max,
                        grade: grade
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setIsLoading(false)
                        return response.data
                    })
                    .then(data => {
                        if (!data.error) {
                            setIsOutOfCoupon(false)
                            setGPA(Number(parseFloat(data.data).toFixed(2)))
                        } else {
                            if (data.message === 'موجودی ناکافی') {
                                setIsOutOfCoupon(true)
                            } else {
                                alert(data.message)
                            }
                        }
                    }).catch(error => {
                        alert('error!')
                        setIsLoading(false)
                    })
            }
    }

    return (
        <GPAContainer>
            <FieldsContainer>
                <TitledNumericInput title={"معدل شما"} value={grade} setValue={setGrade} max={20} min={0} />
                <TitledNumericInput title={"حداکثر نمره قابل قبول"} value={max} setValue={setMax} max={20} min={0} />
                <TitledNumericInput title={"حداقل نمره قابل قبول"} value={min} setValue={setMin} max={20} min={0} />
                <Button title={"محاسبه"} onClick={() => handleCalculate()} />
            </FieldsContainer>
            <ResultContainer>
                {
                    isLoading && <div>در حال بارگذاری...</div>
                }
                {
                    isGuest && !isLoading && <LoginBox>
                        <SelectedTitle>
                            لطفا ابتدا وارد حساب کاربری خود شوید
                        </SelectedTitle>
                        <Button title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
                    </LoginBox>
                }
                {
                    !isGuest && !isLoading && isOutOfCoupon &&
                    <ChargeBox>
                        <Title>تعداد کوپن های درخواست شما به پایان رسیده است</Title>
                        <SelectedTitle> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.value} درخواست , ${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گز ینه های پرداخت را انتخاب نمایید"} </SelectedTitle >

                        <ChargeOptions>
                            {chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${value.value} درخواست , ${value.price / 10} تومان`}
                                />)}
                        </ChargeOptions>
                        <Button title="پرداخت" onClick={() => alert(selectedChargeOption.price)} />
                    </ChargeBox>
                }
                {
                    !isLoading && !isGuest && !isOutOfCoupon &&
                    <ResultInnerContainer>
                        <SelectedTitle>مقدار GPA : </SelectedTitle>
                        <Result>
                            {gpa}
                        </Result>
                    </ResultInnerContainer>
                }
            </ResultContainer>
        </GPAContainer>
    )
}


export default GPACalculator
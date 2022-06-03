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

const GPAContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 39rem;
`

const FieldsContainer = styled.div`
    margin-top: 1rem;
    flex:0.7;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 8rem;
    padding-right: 8rem; 
    align-items: center;    
`

const ResultContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
`

const ResultInnerContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 2px solid #0a3816;
    border-radius: 1rem;
    min-width: 60rem;
`

const Title = styled.div`
    font-size: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #11a841;
`

const SelectedTitle = styled.div`
    font-size: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const Result = styled.div`
    font-size: 3.5rem;
    color: green;
`

const LoginBox = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    align-items: center;
`

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 25rem;
`

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
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

function GPACalculator() {
    const [min, max, grade, gpa, loading, guest, outOfCoupon, setMin, setMax, setGrade, trigger] = useGPA(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [token,] = useLocalStorage('token', null)

    const naviaget = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | محاسبه GPA "
    }, [])

    return (
        <GPAContainer>
            <FieldsContainer>
                <TitledNumericInput title={"نمره شما"} value={grade} setValue={setGrade} max={20} min={0} />
                <TitledNumericInput title={"حداکثر نمره قابل قبول"} value={max} setValue={setMax} max={20} min={0} />
                <TitledNumericInput title={"حداقل نمره قابل قبول"} value={min} setValue={setMin} max={20} min={0} />
                <Button title={"محاسبه"} onClick={() => trigger()} />
            </FieldsContainer>
            <ResultContainer>
                {
                    loading && <div>در حال بارگذاری...</div>
                }
                {
                    guest && !loading && <LoginBox>
                        <SelectedTitle>
                            لطفا ابتدا وارد حساب کاربری خود شوید
                        </SelectedTitle>
                        <Button title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
                    </LoginBox>
                }
                {
                    !guest && !loading && outOfCoupon &&
                    <ChargeBox>
                        <Title>موجوی حساب شما به پایان رسیده است</Title>
                        <SelectedTitle> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گز ینه های پرداخت را انتخاب نمایید"} </SelectedTitle >

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
                }
                {
                    !loading && !guest && !outOfCoupon &&
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
import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ECTSContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    min-height: 40rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    padding-left: 10rem;
    padding-right: 10rem;
`;

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 2rem;
    border: 2px solid red;
    padding: 2rem;
    flex: 2; 
`;

const ResultButtonBox = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LeftBox = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 2rem;
    border: 2px solid pink;
`;

const Value = styled.input`
    font-size: 2rem;
    width: 10rem;
    text-align: center;
`;

const Title = styled.div`
    color: black;
`;

const TitleValuePair = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CalculateArrow = styled.img`
    width: 16rem;
    height: 3rem;
    margin-top: 1rem;
`;

const ECTSTResulTitle = styled.div`
    font-size: 1.5rem;
`;


const ECTSTResulValue = styled.div`
    font-size: 4rem;
`;


const LoginBox = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between;
    align-items: center;
`;

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex:1;
    width: 100%;
`;

const chargeValue = [{ id: 1, value: 50, price: 50000 }, { id: 2, value: 200, price: 100000 }, { id: 3, value: 500, price: 250000 }, { id: 4, value: 1000, price: 500000 }]

function ECTSCalculator() {
    const [isLoading, setIsLoading] = useState(false)
    const [isGuest, setIsGuest] = useState(false)
    const [isOutOfCoupon, setIsOutOfCoupon] = useState(false)
    const [selectedChargeOption, setSelectedChargeOption] = useState({ id: -1, value: -1, price: -1 })
    const [unit, setUnit] = useState(0)
    const [time, setTime] = useState(0)
    const [week, setWeek] = useState(0)
    const [ECTS, setECTS] = useState(0)

    const naviaget = useNavigate()

    const handleCalculate = () => {
        if (!isLoading && !isGuest) {
            if (week === 0)
                setECTS(0)
            else {
                setIsLoading(true)
                const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'
                axios.get('http://localhost:8000/stu_assist_backend/services/ects_calculation.php', {
                    params: {
                        time: time,
                        unit: unit,
                        week: week
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
                            setECTS(Number(parseFloat(data.data).toFixed(1)))
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
    }

    return (
        <ECTSContainer>
            <RightBox>
                <TitleValuePair>
                    <Title>تعداد واحد درسی</Title>
                    <Value type='number' value={unit} onChange={e => setUnit(parseInt(e.target.value))} />
                </TitleValuePair>
                <TitleValuePair>
                    <Title>مدت زمان واحد در هفته (دقیقه)</Title>
                    <Value type='number' value={time} onChange={e => setTime(parseInt(e.target.value))} />
                </TitleValuePair>
                <TitleValuePair>
                    <Title>تعداد هفته در نظام آموزشی کشور حارجی</Title>
                    <Value type='number' value={week} onChange={e => setWeek(parseInt(e.target.value))} />
                </TitleValuePair>
            </RightBox>
            <ResultButtonBox>
                <Button title={"محاسبه"} color={"orange"} onClick={() => handleCalculate()} />
                <CalculateArrow src={"https://thumbs.dreamstime.com/b/red-arrow-isolated-white-background-red-arrow-vector-stock-arrow-icon-110771171.jpg"} />
            </ResultButtonBox>
            <LeftBox>
                {
                    isLoading && <div>Loading</div>
                }
                {
                    isGuest && !isLoading && <LoginBox>
                        <Title>
                            لطفا ابتدا وارد حساب کاربری خود شوید
                        </Title>
                        <Button title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
                    </LoginBox>
                }
                {
                    !isGuest && !isLoading && isOutOfCoupon &&
                    <ChargeBox>
                        <Title>تعداد کوپن های درخواست شما به پایان رسیده است</Title>
                        <Title> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.value} درخواست , ${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گز ینه های پرداخت را انتخاب نمایید"} </Title>

                        <ChargeOptions>
                            {chargeValue.map(value => {
                                return <ChargeOptionRecord key={value.id} onClick={e => setSelectedChargeOption(value)}>{value.value} درخواست , {value.price} تومان</ChargeOptionRecord>
                            })}
                        </ChargeOptions>
                        <Button title="پرداخت" onClick={() => alert(selectedChargeOption.price)} />
                    </ChargeBox>
                }
                {!isLoading && !isGuest && !isOutOfCoupon &&
                    <ResultContainer>
                        <ECTSTResulTitle>معادل ECTS :</ECTSTResulTitle>
                        <ECTSTResulValue>{ECTS}</ECTSTResulValue>
                    </ResultContainer>
                }
            </LeftBox>
        </ECTSContainer>
    )
}


export default ECTSCalculator
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ChargeOptionRecord from "../components/ChargeOptionRecord";

const ECTSContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    min-height: 40rem;
`;

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 2rem;
    border: 2px solid green;
    padding: 2rem;
    flex: 2; 
    margin-right: 10rem;
    margin-top: 10rem;
    margin-bottom: 10rem;
    
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
    border: 2px solid green;
    margin-left: 10rem;
    margin-top: 10rem;
    margin-bottom: 10rem;
`;

const Value = styled.input`
    font-size: 2rem;
    width: 10rem;
    text-align: center;
`;

const Title = styled.div`
    color: #11a841;
`;

const SelectedTitle = styled.div`
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
    color: green;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
`;

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25rem;
`;

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex:1;
    width: 100%;
`;

interface ChargeValue {
    id: number,
    value: number,
    price: number
}

function ECTSCalculator() {
    const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'
    const [isLoading, setIsLoading] = useState(true)
    const [isGuest, setIsGuest] = useState(false)
    const [isOutOfCoupon, setIsOutOfCoupon] = useState(false)
    const [selectedChargeOption, setSelectedChargeOption] = useState({ id: -1, value: -1, price: -1 })
    const [unit, setUnit] = useState(0)
    const [time, setTime] = useState(0)
    const [week, setWeek] = useState(0)
    const [ECTS, setECTS] = useState(0)
    const [chargeValues, setChargeValues] = useState<ChargeValue[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | محاسبه ECTS "
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
        if (!isLoading && !isGuest) {
            if (week === 0)
                setECTS(0)
            else {
                setIsLoading(true)
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
                    <SelectedTitle>تعداد واحد درس مورد نظر</SelectedTitle>
                    <Value type='number' min={1} max={20} value={unit} onChange={e => setUnit(parseInt(e.target.value))} />
                </TitleValuePair>
                <TitleValuePair>
                    <SelectedTitle>مدت زمان تدریس هر واحد در هفته (دقیقه)</SelectedTitle>
                    <Value type='number' min={0} max={120} value={time} onChange={e => setTime(parseInt(e.target.value))} />
                </TitleValuePair>
                <TitleValuePair>
                    <SelectedTitle>‌تعداد هفته در نظام آموزشی کشور اروپایی (معمولا 14) </SelectedTitle>
                    <Value type='number' min={10} max={25} value={week} onChange={e => setWeek(parseInt(e.target.value))} />
                </TitleValuePair>
            </RightBox>
            <ResultButtonBox>
                <Button title={"محاسبه"} onClick={() => handleCalculate()} />
                <CalculateArrow src={"https://images.vectorhq.com/images/previews/a42/arrow-left-green-clip-art-56205.png"} />
            </ResultButtonBox>
            <LeftBox>
                {
                    isLoading && <div>در حال بارگذاری...</div>
                }
                {
                    isGuest && !isLoading && <LoginBox>
                        <SelectedTitle>
                            لطفا ابتدا وارد حساب کاربری خود شوید
                        </SelectedTitle>
                        <Button title="ورود / ثبت نام" onClick={e => navigate('/login', { replace: true })} />
                    </LoginBox>
                }
                {
                    !isGuest && !isLoading && isOutOfCoupon &&
                    <ChargeBox>
                        <Title style={{ marginBottom: '1rem' }}>تعداد کوپن های درخواست شما به پایان رسیده است</Title>
                        <SelectedTitle style={{ marginBottom: '1.5rem' }}> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.value} درخواست , ${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گز ینه های پرداخت را انتخاب نمایید"} </SelectedTitle>

                        <ChargeOptions style={{ marginBottom: '1rem' }}>
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
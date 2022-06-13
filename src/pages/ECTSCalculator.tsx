import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import useChargeOptions from "../hooks/useChargeOptions";
import useECTS from "../hooks/useECTS";
import { LINK_PAYMENT } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";

const ECTSContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    height: calc(100vh - 160px);
    direction: rtl;
`

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
`

const ResultButtonBox = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
`

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
`

const Value = styled.input`
    font-size: 2rem;
    width: 10rem;
    text-align: center;
`

const Title = styled.div`
    color: #11a841;
`

const SelectedTitle = styled.div`
    color: black;
`

const TitleValuePair = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const CalculateArrow = styled.img`
    width: 16rem;
    height: 3rem;
    margin-top: 1rem;
`

const ECTSTResulTitle = styled.div`
    font-size: 1.5rem;
`

const ECTSTResulValue = styled.div`
    font-size: 4rem;
    color: green;
`

const LoginBox = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
`

const ChargeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25rem;
`

const ChargeOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex:1;
    width: 100%;
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

function ECTSCalculator() {

    const [unit, time, week, ects, loading, guest, outOfCoupon, setUnit, setTime, setWeek, trigger] = useECTS(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [token,] = useLocalStorage('token', null)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | محاسبه ECTS "
    }, [])

    return (
        <ECTSContainer>
            <RightBox>
                <TitleValuePair>
                    <SelectedTitle>تعداد واحد درس مورد نظر</SelectedTitle>
                    <Value type='number' min={1} max={20} value={unit} onChange={e => setUnit(parseFloat(e.target.value))} />
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
                <Button title={"محاسبه"} onClick={() => trigger()} />
                <CalculateArrow src={"https://images.vectorhq.com/images/previews/a42/arrow-left-green-clip-art-56205.png"} />
            </ResultButtonBox>
            <LeftBox>
                {
                    loading && <div>در حال بارگذاری...</div>
                }
                {
                    guest && !loading && <LoginBox>
                        <SelectedTitle>
                            لطفا ابتدا وارد حساب کاربری خود شوید
                        </SelectedTitle>
                        <Button title="ورود / ثبت نام" onClick={e => navigate('/login', { replace: true })} />
                    </LoginBox>
                }
                {
                    !guest && !loading && outOfCoupon &&
                    <ChargeBox>
                        <Title style={{ marginBottom: '1rem' }}>موجودی کیف پول شما به پایان رسیده است</Title>
                        <SelectedTitle style={{ marginBottom: '1.5rem' }}> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گزینه های پرداخت را انتخاب نمایید"} </SelectedTitle>

                        <ChargeOptions style={{ marginBottom: '1rem' }}>
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
                {!loading && !guest && !outOfCoupon &&
                    <ResultContainer>
                        <ECTSTResulTitle>معادل ECTS :</ECTSTResulTitle>
                        <ECTSTResulValue>{ects}</ECTSTResulValue>
                    </ResultContainer>
                }
            </LeftBox>
        </ECTSContainer>
    )
}

export default ECTSCalculator
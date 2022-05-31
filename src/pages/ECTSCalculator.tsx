import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ChargeOptionRecord from "../components/ChargeOptionRecord";
import useChargeOptions from "../hooks/useChargeOptions";
import useECTS from "../hooks/useECTS";

const ECTSContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    min-height: 40rem;
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

function ECTSCalculator() {

    const [unit, time, week, ects, loading, guest, outOfCoupon, setUnit, setTime, setWeek, trigger] = useECTS(0, 0, 0)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Stu Assist | محاسبه ECTS "
    }, [])

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
                        <Title style={{ marginBottom: '1rem' }}>موجودی حساب شما به پایان رسیده است</Title>
                        <SelectedTitle style={{ marginBottom: '1.5rem' }}> {selectedChargeOption.id !== -1 ? `${selectedChargeOption.price} تومان` : "برای ادامه، لطفا یکی از گز ینه های پرداخت را انتخاب نمایید"} </SelectedTitle>

                        <ChargeOptions style={{ marginBottom: '1rem' }}>
                            {chargeValues.map(value =>
                                <ChargeOptionRecord
                                    key={value.id}
                                    selected={selectedChargeOption.id === value.id}
                                    onClick={e => { setSelectedChargeOption(value) }}
                                    title={`${value.price / 10} تومان`}
                                />)}
                        </ChargeOptions>
                        <Button title="پرداخت" onClick={() => alert(selectedChargeOption.price)} />
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
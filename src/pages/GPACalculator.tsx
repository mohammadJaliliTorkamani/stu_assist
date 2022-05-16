import styled from "@emotion/styled";
import { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import TitledNumericInput from "../components/TitledNumericInput";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const footerPages = [{
    id: 3,
    text: "خانه",
    link: "/"
}, {
    id: 2,
    text: "ضوابط استفاده",
    link: "terms-of-use"
}, {
    id: 1,
    text: "تماس با ما",
    link: "contact-us"
}]

const headerPages = [{
    id: 3,
    text: "خانه",
    link: "/"
}, {
    id: 2,
    text: "محاسبه GPA",
    link: "gpa-calculator"
}, {
    id: 1,
    text: "محاسبه ECTS",
    link: "ects-calculator"
}]

const contactLinks = [
    {
        id: 1,
        label: "روابط عمومی",
        value: "info@stu-assist.ir"
    }, {
        id: 2,
        label: "ثبت بازخورد",
        value: "customer@stu-assist.ir"
    }
]

const Container = styled.div`
    height: 40px;
`;

const GPAContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 36rem;
`;

const FieldsContainer = styled.div`
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
    border: 2px solid red;
    border-radius: 1rem;
    min-width: 60rem;
`;

const Title = styled.div`
    font-size: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const Result = styled.div`
    font-size: 3.5rem;
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

const chargeValue = [{ id: 1, value: 50, price: 50000 }, { id: 2, value: 200, price: 100000 }, { id: 3, value: 500, price: 250000 }, { id: 4, value: 1000, price: 500000 }]

function GPACalculator() {
    const [isLoading, setIsLoading] = useState(false)
    const [isGuest, setIsGuest] = useState(false)
    const [isOutOfCoupon, setIsOutOfCoupon] = useState(false)
    const [selectedChargeOption, setSelectedChargeOption] = useState({ id: -1, value: -1, price: -1 })
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [grade, setGrade] = useState(0)
    const [gpa, setGPA] = useState(0)

    const naviaget = useNavigate()

    const handleCalculate = () => {
        if (!isLoading && !isGuest)
            //must be calculated in server side            
            setGPA(max - min === 0 ? 0 : 3 * ((max - grade) / (max - min)) + 1)
    }

    return (
        <Container>
            <Header pages={headerPages} user={"مهمان"} />
            <GPAContainer>
                <FieldsContainer>
                    <TitledNumericInput title={"معدل شما"} value={grade} setValue={setGrade} max={20} min={0} />
                    <TitledNumericInput title={"حداکثر نمره قابل قبول"} value={min} setValue={setMin} max={20} min={0} />
                    <TitledNumericInput title={"حداقل نمره قابل قبول"} value={max} setValue={setMax} max={20} min={0} />
                    <Button title={"محاسبه"} color={"orange"} onClick={() => handleCalculate()} />
                </FieldsContainer>
                <ResultContainer>
                    {
                        isLoading && <div>Loading</div>
                    }
                    {
                        isGuest && !isLoading && <LoginBox>
                            <Title>
                                لطفا ابتدا وارد حساب کاربری خود شوید
                            </Title>
                            <Button color="orange" title="ورود / ثبت نام" onClick={e => naviaget('/login', { replace: true })} />
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
                            <Button color="orange" title="پرداخت" onClick={() => alert(selectedChargeOption.price)} />
                        </ChargeBox>
                    }
                    {
                        !isLoading && !isGuest && !isOutOfCoupon &&
                        <ResultInnerContainer>
                            <Title>مقدار GPA (از 4.0) : </Title>
                            <Result>
                                {gpa}
                            </Result>
                        </ResultInnerContainer>
                    }
                </ResultContainer>
            </GPAContainer>
            <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />
        </Container>
    )
}


export default GPACalculator
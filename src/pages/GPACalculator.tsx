import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer";
import GPANumericField from "../components/GPANumericField";
import Header from "../components/Header";

const footerPages = [{
    id: 3,
    text: "خانه",
    link: "www.google.com"
}, {
    id: 2,
    text: "ضوابط استفاده",
    link: "www.facebook.com"
}, {
    id: 1,
    text: "تماس با ما",
    link: "www.space.com"
}]

const headerPages = [{
    id: 3,
    text: "خانه",
    link: "www.google.com"
}, {
    id: 2,
    text: "محاسبه GPA",
    link: "www.facebook.com"
}, {
    id: 1,
    text: "محاسبه ECTS",
    link: "www.space.com"
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
`;

const Result = styled.div`
    font-size: 3.5rem;
`;

function GPACalculator() {
    return (
        <Container>
            <Header pages={headerPages} user={"مهمان"} />
            <GPAContainer>
                <FieldsContainer>
                    <GPANumericField title={"معدل شما"} />
                    <GPANumericField title={"حداکثر نمره قابل قبول"} />
                    <GPANumericField title={"حداقل نمره قابل قبول"} />
                </FieldsContainer>
                <ResultContainer>
                    <ResultInnerContainer>
                        <Title>مقدار GPA (از 4.0) : </Title>
                        <Result>
                            2.5523
                        </Result>
                    </ResultInnerContainer>
                </ResultContainer>
            </GPAContainer>
            <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />
        </Container>
    )
}


export default GPACalculator
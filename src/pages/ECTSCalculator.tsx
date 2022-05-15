import styled from "@emotion/styled";
import CalculateButton from "../components/CalculateButton";
import Footer from "../components/Footer";
import Header from "../components/Header";

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

const ECTSContainer = styled.div`
    min-height: 26rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
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
`;

const Title = styled.div`
    
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

function ECTSCalculator() {
    return (
        <Container>
            <Header pages={headerPages} user={"مهمان"} />
            <ECTSContainer>
                <RightBox>
                    <TitleValuePair>
                        <Title>تعداد واحد درسی</Title>
                        <Value type='number' />
                    </TitleValuePair>
                    <TitleValuePair>
                        <Title>مدت زمان واحد در هفته (دقیقه)</Title>
                        <Value type='number' />
                    </TitleValuePair>
                    <TitleValuePair>
                        <Title>تعداد هفته در نظام آموزشی</Title>
                        <Value type='number' />
                    </TitleValuePair>
                </RightBox>
                <ResultButtonBox>
                    <CalculateButton title={"محاسبه"} color={"orange"} />
                    <CalculateArrow src={"https://thumbs.dreamstime.com/b/red-arrow-isolated-white-background-red-arrow-vector-stock-arrow-icon-110771171.jpg"} />
                </ResultButtonBox>
                <LeftBox>
                    <ECTSTResulTitle>معادل ECTS :</ECTSTResulTitle>
                    <ECTSTResulValue>6.8</ECTSTResulValue>
                </LeftBox>
            </ECTSContainer>
            <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />
        </Container>
    )
}


export default ECTSCalculator
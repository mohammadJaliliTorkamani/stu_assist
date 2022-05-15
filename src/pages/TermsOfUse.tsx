import styled from "@emotion/styled";
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
    display: flex;
    flex-direction : column;
  `;

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 3rem;
    padding-bottom: 3rem;
    min-height: 30rem;
`;

const TextBox = styled.div`
    display: flex;
    flex:1;
    color: black;
    background: #d1d1d1;
    padding-top: 4%;
    padding-bottom: 4%;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
    border: 2px solid black;
    border-radius: 1rem;
    line-height: 2rem;
`;


function TermsOfUse() {
    const content = "این یک متن آزمایشی است"
    return (
        <Container className="App">
            <Header pages={headerPages} user={"مهمان"} />
            <TextContiner>
                <TextBox>{content}</TextBox>
            </TextContiner>
            <Footer copyRightText={"تمامی حقوق مادی و معنوی محفوظ است - ۱۴۰۱"} pages={footerPages} contactUsLinks={contactLinks} />
        </Container>
    )
}


export default TermsOfUse

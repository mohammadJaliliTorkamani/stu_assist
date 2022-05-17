import styled from "@emotion/styled";
import KeyValuePair from "../components/KeyValuePair";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 33%;
    padding-right: 33%;
    padding-top: 3rem;
    padding-bottom: 3rem;
    min-height: 30rem;
`;

const TextBox = styled.div`
    display: flex;
    flex:1;
    color: black;
    background: #f2f2f2;
    padding-top: 4%;
    padding-bottom: 4%;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
    border: 2px solid gray;
    border-radius: 1rem;
    line-height: 2rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Separator = styled.div`
    height: 2px;
    background: black;
    width: 10rem;
    margin-bottom: 2rem;
`;

function ContactUs() {
    return (
        <TextContiner>
            <TextBox>
                مشخصات تماس
                <Separator />
                <KeyValuePair label="روابط عمومی" value="info@stu-assist.ir" color="black" />
                <KeyValuePair label="مدیریت مشتریان" value="customer@stu-assist.ir" color="black" />
                <KeyValuePair label="توسعه دهنده" value="dev@stu-assist.ir" color="black" />
            </TextBox>
        </TextContiner>
    )
}


export default ContactUs

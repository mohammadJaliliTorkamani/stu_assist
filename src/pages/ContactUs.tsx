import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 33%;
    padding-right: 33%;
    min-height: 40rem;
`;

const TextBox = styled.div`
    display: flex;
    flex:1;
    margin-top: 3rem;
    margin-bottom   : 3rem;
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

    const methods = [{ label: 'روابط عمومی', emailAddress: 'info@stu-assist.ir' }, { label: 'امور کاربران', emailAddress: 'users@stu-assist.ir' }, { label: 'توسعه دهندگان', emailAddress: 'developers@stu-assist.ir' }]
    useEffect(() => {
        document.title = "Stu Assist | تماس با ما"
    }, [])

    return (
        <TextContiner>
            <TextBox>
                مشخصات تماس
                <Separator />
                {
                    methods.map(method => <Link to={`mailto:${method.emailAddress}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div> {method.label} : {method.emailAddress}</div>
                    </Link >
                    )
                }
            </TextBox>
        </TextContiner>
    )
}


export default ContactUs

import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { contactLinks } from "../utils/Constants";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 33%;
    padding-right: 33%;
    direction: rtl;
    height: calc(100vh - 160px);
`

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
`

const Separator = styled.div`
    height: 2px;
    background: black;
    width: 10rem;
    margin-bottom: 2rem;
`

function ContactUs() {
    useEffect(() => {
        document.title = "Stu Assist | تماس با ما"
    }, [])

    return (
        <TextContiner>
            <TextBox>
                مشخصات تماس
                <Separator />
                {
                    contactLinks.map(item => <Link key={item.id} to={`mailto:${item.value}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <> {item.label} : {item.value}</>
                    </Link >
                    )
                }
            </TextBox>
        </TextContiner>
    )
}

export default ContactUs

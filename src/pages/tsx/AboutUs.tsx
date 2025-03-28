import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";
import { contactLinks, LINK_ABOUT_US } from "../../utils/Constants";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    direction: rtl;
    height: calc(100vh - 160px);
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
`

const TextBox = styled.div`
    display: flex;
    flex:1;
    margin-top: 2rem;
    margin-bottom: 3rem;
    color: black;
    background: #fbfffa;
    padding-top: 2.5rem;
    padding-bottom: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
    border: 2px solid green;
    border-radius: 1rem;
    line-height: 2.5rem;
    flex-direction: column;
    overflow: auto;
    align-items: flex-start;
`

const Separator = styled.span`
    height: 2px;
    background: green;
    width: 10rem;
    margin-bottom: 1rem;
`

const Title = styled.div`
    color: green;
`;

function AboutUs() {

    usePageTitle('درباره ما')
    const [content, setContent] = useState<string>('')
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    useEffect(() => {
        axios
            .get(LINK_ABOUT_US)
            .then(response => response.data.data)
            .then(data => setContent(data))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [])

    return (
        <TextContiner>
            <TextBox>
                <Title>Stu-Assist چیست؟</Title>
                <Separator />
                {content}
                <br />
                <br />
                <Title> ارتباط با ما</Title>
                <Separator />
                {
                    contactLinks.map(
                        item =>
                            <a key={item.id} href={"mailto:" + item.value}
                                style={{ textDecoration: 'none', color: 'black' }}>
                                {item.label} : {item.value}
                            </a >
                    )
                }
            </TextBox>
            <ToastContainer
                toastStyle={{
                    backgroundColor: getToastColor(toastID),
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}
                limit={1}
                hideProgressBar={true}
                position='bottom-center' />
        </TextContiner>
    )
}

export default AboutUs

import styled from "@emotion/styled";
import { useEffect } from "react";
import { contactLinks, TOUContent } from "../utils/Constants";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    direction: rtl;
    height: 100vh;
    width: 100%;
    padding: 2rem;
`

const TextBox = styled.div`
    display: flex;
    flex:1;
    margin-top: 3rem;
    margin-bottom: 3rem;
    color: black;
    background: #f2f2f2;
    padding-top: 3rem;
    padding-bottom: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
    border: 2px solid gray;
    border-radius: 1rem;
    line-height: 2rem;
    flex-direction: column;
    overflow: auto;
    align-items: flex-start;
`

const Separator = styled.span`
    height: 2px;
    background: black;
    width: 10rem;
    margin-bottom: 1rem;
`

function AboutUs() {
    useEffect(() => {
        document.title = "Stu Assist | تماس با ما"
    }, [])

    return (
        <TextContiner>
            <TextBox>
                Stu-Assist چیست؟
                <Separator />
                {
                    TOUContent
                }
                <br />
                <br />
                <br />
                مشخصات تماس
                <Separator />
                {
                    contactLinks.map(
                        item =>
                            <div key={item.id}
                                style={{ textDecoration: 'none', color: 'black' }}>
                                {item.label} : {item.value}
                            </div >
                    )
                }
            </TextBox>
        </TextContiner>
    )
}

export default AboutUs

import styled from "@emotion/styled"
import { FOOTER_TEXT } from "../utils/Constants"
import React from "react"

const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    height: 80px;
    width: 100%;
    justify-content : center;
    align-items: center;
    background: black;
    direction: rtl;
`

function Footer() {

    return (
        <FooterContainer>
            {FOOTER_TEXT}
        </FooterContainer>
    )
}

export default React.memo(Footer)
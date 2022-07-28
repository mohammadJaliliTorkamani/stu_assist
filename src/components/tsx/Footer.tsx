import styled from "@emotion/styled"
import { FOOTER_TEXT } from "../../utils/Constants"
import React from "react"

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column
    color: white;
    height: 80px;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content : space-between;
    align-items: center;
    background: black;
    direction: rtl;
`

function Footer() {

    return (
        <FooterContainer>
            <div style={{ color: 'white', fontSize: '0.9em' }}>
                {FOOTER_TEXT}
            </div>
            <img
                referrerPolicy='origin'
                id='rgvjjxlzapfujzpergvjesgt'
                style={{ cursor: 'pointer', height:'60px', width:'60px' }}
                onClick={e => window.open("https://logo.samandehi.ir/Verify.aspx?id=315730&p=xlaorfthdshwjyoexlaoobpd", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")}
                alt='logo-samandehi'
                src='https://logo.samandehi.ir/logo.aspx?id=315730&p=qftinbpdujynyndtqftilyma' />
        </FooterContainer>
    )
}

export default React.memo(Footer)
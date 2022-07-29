import { FOOTER_TEXT } from "../../utils/Constants"
import React from "react"
import '../css/Footer.css'


function Footer() {

    return (
        <div className="footer-container">
            <div></div>
            <div style={{ color: 'white', fontSize: '0.9em' }}>
                {FOOTER_TEXT}
            </div>
            <img
                referrerPolicy='origin'
                id='rgvjjxlzapfujzpergvjesgt'
                className='footer-samandehi'
                onClick={e => window.open("https://logo.samandehi.ir/Verify.aspx?id=315730&p=xlaorfthdshwjyoexlaoobpd", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")}
                alt='logo-samandehi'
                src='https://logo.samandehi.ir/logo.aspx?id=315730&p=qftinbpdujynyndtqftilyma' />
        </div>
    )
}

export default React.memo(Footer)
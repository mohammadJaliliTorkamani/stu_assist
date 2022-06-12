import styled from "@emotion/styled"

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

interface IProps {
    copyRightText: string,
}

function Footer(props: IProps) {
    return (
        <FooterContainer>
            {props.copyRightText}
        </FooterContainer>
    )
}

export default Footer
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom";
import FooterPageComponent from "./FooterPageComponent";
import KeyValuePair from "./KeyValuePair";

const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    height: 15vh;
    justify-content : space-between;
    background: #636363;
`;

const LeftContainer = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LeftInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:  flex-start;
    align-items: flex-start;
`;

const MiddleContainer = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content : flex-end;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
`;

const RightContainer = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: center;
`;

const RightInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ContactUsLabel = styled.div`
    color: #f2f2f2;
    font-size: 0.9rem;
`;

interface IProps {
    copyRightText: string,
    pages: FooterPageLink[],
    contactUsLinks: KeyValuePairItem[]
}

interface KeyValuePairItem {
    id: number,
    label: string,
    value: string
}

interface FooterPageLink {
    id: number,
    text: string,
    link: string
}

function Footer(props: IProps) {
    return (
        <FooterContainer>
            <RightContainer>
                <RightInnerContainer>
                    {props.pages.map(page => <FooterPageComponent key={page.id} page={page} />)}
                </RightInnerContainer>
            </RightContainer>
            <MiddleContainer>
                {props.copyRightText}
            </MiddleContainer>
            <LeftContainer>
                <LeftInnerContainer>
                    <ContactUsLabel>ارتباط با ما</ContactUsLabel>
                    {props.contactUsLinks.map(item => <KeyValuePair key={item.id} {...item} />)}
                </LeftInnerContainer>
            </LeftContainer>
        </FooterContainer>
    )
}

export default Footer
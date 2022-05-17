import styled from "@emotion/styled";

const TextContiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10%;
    padding-right: 10%;
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
`;


function TermsOfUse() {
    const content = "این یک متن آزمایشی است"
    return (
        <TextContiner>
            <TextBox>{content}</TextBox>
        </TextContiner>
    )
}


export default TermsOfUse

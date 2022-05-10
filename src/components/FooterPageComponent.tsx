import styled from "@emotion/styled"

interface IProps {
    page: FooterPageLink
}

interface FooterPageLink {
    text: string,
    link: string
}

const PageStyle = styled.a`
    displaY: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    height: 0.06rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    margin-left: 0.15rem;
    margin-right: 0.15rem;
    border: 1px solid white;
    border-radius: 3px;
    font-size : 0.60rem;
    text-decoration: none;
`;

function FooterPageComponent(props: IProps) {
    return (
        <PageStyle href={props.page.link}>
            {props.page.text}
        </PageStyle >
    )
}

export default FooterPageComponent
import styled from "@emotion/styled"

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink
}

const Container = styled.a`
    cursor: pointer;
    font-size: 3rem;
    background: pink;
    color: black;
    border-radius: 2rem;
    height: 30rem;
    width: 30rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display : flex;
    flex-direction: columnn;
    justify-content: center;
    align-items: center;
    text-decoration: none;
`;

function HomeOptionBox({ page }: IProps) {
    return (
        <Container href={page.link}>
            {page.text}
        </Container>
    )
}

export default HomeOptionBox
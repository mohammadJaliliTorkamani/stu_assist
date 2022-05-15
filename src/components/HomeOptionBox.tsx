import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom";

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    page: TextLink
}

const Container = styled.div`
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
    const navigate = useNavigate()
    return (
        <Container onClick={() => navigate(page.link)}>
            {page.text}
        </Container>
    )
}

export default HomeOptionBox
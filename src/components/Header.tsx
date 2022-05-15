import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction : column;
    height: 25vh;
`;

const Banner = styled.img`
    height: 15rem;
    background: #adadad;
`;

const Bar = styled.div`
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #636363;
    padding: 1rem;    
`;

const Options = styled.div`
    display: flex;
    flex-direction : row;

`;

const Option = styled.div`
    text-decoration: none;
    color: white;
    padding-left : 2rem;
    padding-right : 2rem;

`;

const Welcome = styled.div`
    color: white;
`;

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    pages: TextLink[],
    user: string
}

function Header({ pages, user }: IProps) {
    const navigate = useNavigate()
    return (
        <Container>
            <Banner />
            <Bar>
                <Options>{pages.map(page => <Option key={page.id} onClick={() => navigate(page.link === "/" ? "/" : ("/" + page.link), { replace: true })}>{page.text}</Option>)}</Options>
                <Welcome onClick={() => navigate(user === "مهمان" ? 'login' : 'profile', { replace: true })}>{`${user} عزیز خوش آمدید!`}</Welcome>
            </Bar>
        </Container>
    )
}

export default Header
import styled from "@emotion/styled"
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction : column;
    height: 15rem;
`;

const Banner = styled.img`
    height: 13rem;
    background: #0a3816;
`;

const Bar = styled.div`
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #0a3816;
    padding: 0.8rem;
    padding-left: 3rem;    
`;

const Options = styled.div`
    display: flex;
    flex-direction : row;
`;

const optionActiveStyle = {
    textDecoration: 'none',
    color: 'white',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    cursor: 'pointer'
}

const welcomeStyle = {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none'
}

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
    const [mouseHover, setMouseHover] = useState(false)
    return (
        <Container>
            <Banner src={"http://wallpaperstock.net/green-gradient-background_wallpapers_43896_852x480.jpg"} />
            <Bar>
                <Options>{
                    pages.map(page =>
                        <NavLink to={page.link === "/" ? "/" : ("/" + page.link)}
                            style={optionActiveStyle}
                            onMouseEnter={e => setMouseHover(true)}
                            onMouseLeave={e => setMouseHover(false)}
                        >
                            {page.text}
                        </NavLink>)}
                </Options>
                <Link to={user === "مهمان" ? 'login' : 'profile'} style={welcomeStyle}> {user === "مهمان" ? "ورود / ثبت نام" : user + " خوش آمدید"}</Link>
            </Bar>
        </Container >
    )
}

export default Header
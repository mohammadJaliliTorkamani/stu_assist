import styled from "@emotion/styled"
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
    align-items: stretch;
    background: #0a3816;
    padding-left: 3rem;
    padding-right: 3rem;    
`;

const Options = styled.div`
    display: flex;
    flex-direction : row;
`;

const optionActiveStyle = {
    textDecoration: 'none',
    color: '#59f551',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    cursor: 'pointer',
    alignSelf: 'center'
}

const optionDeactiveStyle = {
    textDecoration: 'none',
    color: 'white',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    cursor: 'pointer',
    alignSelf: 'center'
}

const welcomeStyle = {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    alignSelf: 'center',
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
    const [, setMouseHover] = useState(false)
    const [hoveredLinkID, setHoveredLinkID] = useState(-1)
    return (
        <Container>
            <Banner src={"http://wallpaperstock.net/green-blur_wallpapers_45136_852x480.jpg"} />
            <Bar>
                <Options>{
                    pages.map(page =>
                        <NavLink to={page.link === "/" ? "/" : ("/" + page.link)}
                            style={page.id === hoveredLinkID ? optionActiveStyle : optionDeactiveStyle}
                            onMouseEnter={e => {
                                setHoveredLinkID(page.id)
                                setMouseHover(true)
                            }}
                            onMouseLeave={e => {
                                setHoveredLinkID(-1)
                                setMouseHover(false)
                            }}
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
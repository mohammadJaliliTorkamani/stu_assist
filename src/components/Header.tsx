import styled from "@emotion/styled"
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction : column;
    height: 16rem;
`

const Bar = styled.div`
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background: #002b0d;
    padding-left: 3rem;
    padding-right: 3rem;    
`

const Banner = styled.div`
    background: #f2f2f2;
    background-image: url(http://wallpaperstock.net/green-blur_wallpapers_45136_852x480.jpg);
    height: 13rem;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-size: 100%;
`



const Options = styled.div`
    display: flex;
    flex-direction : row;
`

const optionActiveStyle = {
    textDecoration: 'none',
    color: '#11a841',
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

const Title = styled.div`
    color:white;
    margin: 3rem;
    font-size: 3rem;
`

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    pages: TextLink[],
    isUser: boolean
}

function Header({ pages, isUser }: IProps) {
    const [, setMouseHover] = useState(false)
    const [hoveredLinkID, setHoveredLinkID] = useState(-1)
    return (
        <Container>
            <Banner>
                <Title>سامانه خدمات دانشجویان مهاجر آلمان</Title>
                <Title>Stu-Assist</Title>
            </Banner>
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
                <Link to={!isUser ? 'login' : 'profile'} style={welcomeStyle}> {!isUser ? "ورود / ثبت نام" : " خوش آمدید"}</Link>
            </Bar>
        </Container >
    )
}

export default Header
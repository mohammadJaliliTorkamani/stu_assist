import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";

const Container = styled.div`
    display: flex;
    flex-direction : column;
    height: 11rem;
    flex: 1;
`

const Bar = styled.div`
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background: #002b0d;
    padding-left: 3rem;
    padding-right: 3rem;    
`

const Banner = styled.div`
    background: #176327;
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
    font-size: 1.2em;
`

interface TextLink {
    id: number,
    text: string,
    link: string
}

interface IProps {
    pages: TextLink[]
}

function Header({ pages }: IProps) {
    const [, setMouseHover] = useState(false)
    const [hoveredLinkID, setHoveredLinkID] = useState(-1)
    const [token,] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (

        <Container>
            <Banner>
                <Title>به سامانه خدمات دانشجویی آلمان خوش آمدید</Title>
                <Title>Stu-Assist.ir</Title>
            </Banner>
            <Bar>
                <Options>{
                    pages.map(page =>
                        <NavLink key={page.id} to={page.link === "/" ? "/" : ("/" + page.link)}
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
                <Link to={!isUser ? 'login' : 'profile'} style={welcomeStyle}> {!isUser ? "ورود / ثبت نام" : " کاربر عزیز، خوش آمدید!"}</Link>
            </Bar>
        </Container >
    )
}

export default Header
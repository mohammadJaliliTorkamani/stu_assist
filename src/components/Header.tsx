import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import Button from "./Button";
import { Button1 } from "./Button1";
import Dropdown from "./DropDown";
import './Header.css'

const NavBar = styled.nav`
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    fontSize: 1.2rem;
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
    padding: '8px 20px',
    borderRadius: '4px',
    outline: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#fff',
    cursor: 'pointer',
    backgroundColor: 'green',
    textDecoration: 'none   '
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
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [token,] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (
        <>
            <NavBar>
                <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                    Stu-Assist
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            تماس با ما
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/ects-calculator'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            محاسبه ای سی تی اس
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/gpa-calculator'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            محاسبه جی پی ای
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={!isUser ? 'login' : 'profile'}
                            className='nav-links-mobile'
                            onClick={closeMobileMenu}
                        >
                            {!isUser ? "ورود / ثبت نام" : "حساب کاربری"}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            خانه
                        </Link>
                    </li>
                </ul>
                <Button1 />
            </NavBar>
        </>
    );
}

export default Header
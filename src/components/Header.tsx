import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import Button from "./Button";
import './Header.css'

const NavBar = styled.nav`
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    fontSize: 1.2rem;
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
                            to='/about-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            درباره ما
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
                <Link to={!isUser ? 'login' : 'profile'}>
                    <Button title={!isUser ? "ورود / ثبت نام" : "حساب کاربری"} />
                </Link>
            </NavBar>
        </>
    );
}

export default Header
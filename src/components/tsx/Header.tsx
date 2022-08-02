import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { MenuItems } from "./MenuItems";
import '../css/Header.css'

import React from 'react'
import Button from "./Button";
import MenuItem from "./MenuItem";
import { DONATION_LINK } from "../../utils/Constants";

function Header() {
    const [token, setToken] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => setIsUser(token !== null), [token])

    return (
        <div className="nav-bar">
            <div className="header-buttons-container">
                <Link className="profile-button" to={!isUser ? 'login' : 'profile'} style={{ textDecoration: 'none' }}>
                    <Button title={!isUser ? "ورود / ثبت نام" : "حساب کاربری"} onClick={e => null} />
                </Link>
                <a className='donate-button' href={DONATION_LINK} target='_blank' rel="noreferrer" >کمک مالی به سامانه</a>
            </div>
            <div className='menu-icon' onClick={e => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} style={{ color: 'black' }} />
            </div>
            <div className="header-options-container">
                <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    {isUser && <li className='nav-item'>
                        <div className='nav-links logout' onClick={e => {
                            setToken(null)
                            setIsMobileMenuOpen(false)
                            window.location.reload()
                        }}>
                            خروج از حساب کاربری
                        </div>
                    </li>
                    }
                    <li className='nav-item'>
                        <Link to='/about-us' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                            درباره ما
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/blogs' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                            وبلاگ
                        </Link>
                    </li>
                    <li className='nav-item '>
                        {
                            MenuItems.map((item, index) => {
                                return <MenuItem items={item} key={index} depthLevel={0} externalLinks={false} onClick={() => setIsMobileMenuOpen(false)} />;
                            })
                        }
                    </li>
                    <li>
                        <a href={DONATION_LINK} target='_blank' className='nav-links-mobile-blue' onClick={e => setIsMobileMenuOpen(false)} rel="noreferrer">
                            کمک مالی به سامانه
                        </a>
                    </li>
                    <li>
                        <Link to={!isUser ? 'login' : 'profile'} className='nav-links-mobile' onClick={e => setIsMobileMenuOpen(false)}>
                            {!isUser ? "ورود / ثبت نام" : "حساب کاربری"}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                            خانه
                        </Link>
                    </li>
                </ul>
                <div className='navbar-logo-container'>
                    <div className='navbar-logo-icon' />
                    <div className='navbar-logo-text'>Stu-Assist</div>
                </div>
            </div>
        </div >
    );
}

export default React.memo(Header)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import Button from "./Button";
import { MenuItems, MenuItems_Links } from "./MenuItems";
import './Header.css'
import MenuItem from "./MenuItem";

import React from 'react'

function Header() {
    const [token, setToken] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (
        <div className="nav-bar">
            <Link className="navbar-logo-container" onClick={e => setIsMobileMenuOpen(false)} to="/">
                <div className="navbar-logo-text">Stu-Assist</div>
                <div className="navbar-logo-icon" />
            </Link>
            <div className='menu-icon' onClick={e => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
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
                <li className='nav-item '>
                    {
                        MenuItems_Links.map((item, index) => {
                            return <MenuItem items={item} key={index} depthLevel={0} externalLinks={true} onClick={() => setIsMobileMenuOpen(false)} />;
                        })
                    }
                </li>
                <li className='nav-item'>
                    <Link to='/blogs' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        وبلاگ
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/forums' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        تالار گفتگو
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/application-experience' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        تجربه پذیرش
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/translation-offices' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        لیست دارالترجمه های رسمی
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
            <Link className="profile-button" to={!isUser ? 'login' : 'profile'} style={{ textDecoration: 'none' }}>
                <Button title={!isUser ? "ورود / ثبت نام" : "حساب کاربری"} onClick={e => null} />
            </Link>
        </div>
    );
}

export default React.memo(Header)
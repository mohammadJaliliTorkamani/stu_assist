import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import Button from "./Button";
import './Header.css'

function Header() {
    const [token,] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (
        <div className="nav-bar">
            <div className="navbar-logo" onClick={e => setIsMobileMenuOpen(false)}>
                Stu-Assist
            </div>
            <div className='menu-icon' onClick={e => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/about-us' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        درباره ما
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/application-experience' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        تجربه پذیرش
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/translation-offices' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        لیست دارالترجمه ها
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/ects-calculator' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        محاسبه ای سی تی اس
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/gpa-calculator' className='nav-links' onClick={e => setIsMobileMenuOpen(false)}>
                        محاسبه جی پی ای
                    </Link>
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
            <Link to={!isUser ? 'login' : 'profile'} style={{ textDecoration: 'none' }}>
                <Button title={!isUser ? "ورود / ثبت نام" : "حساب کاربری"} onClick={e => null} />
            </Link>
        </div>
    );
}

export default Header
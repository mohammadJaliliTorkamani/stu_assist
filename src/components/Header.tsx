import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import Button from "./Button";
import { MenuItems, MenuItems_Links } from "./MenuItems";
import './Header.css'
import MenuItem from "./MenuItem";

function Header() {
    const [token,] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (
        <div className="nav-bar">
            <div className="navbar-logo-container" onClick={e => setIsMobileMenuOpen(false)}>
                <div className="navbar-logo-text">Stu-Assist</div>
                <div className="navbar-logo-icon" />
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
                <li className='nav-item '>
                    {
                        MenuItems_Links.map((item, index) => {
                            return <MenuItem items={item} key={index} depthLevel={0} externalLinks={true} onClick={() => setIsMobileMenuOpen(false)} />;
                        })
                    }
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

export default Header
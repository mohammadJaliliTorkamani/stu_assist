import React, { useEffect, useState } from 'react';
import './Button1.css';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../utils/useLocalStorage';

export function Button1() {
    const [token,] = useLocalStorage('token', null)
    const [isUser, setIsUser] = useState(true)

    useEffect(() => {
        setIsUser(token !== null)
    }, [token])

    return (
        <Link to={!isUser ? 'login' : 'profile'}>
            <button className='btn'>{!isUser ? "ورود / ثبت نام" : "حساب کاربری"}</button>
        </Link>
    );
}
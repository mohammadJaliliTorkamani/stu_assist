import styled from "@emotion/styled"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from '../assets/user_avatar.png'
import Button from "../components/Button";
import { LINK_LOGIN, PHONE_LENGTH } from "../utils/Constants";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    min-height: 28rem;
    width: 22rem;
    border: 2px solid gray;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-botton: 1.5rem;
    background: #e8e8e8;
`

const Logo = styled.img`
    width: 7rem;
    height: 7rem;
    align-self: center;
`

const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`

const Title = styled.div`
    font-size: 1em;
    color: black;
    margin-bottom: 1rem;
    align-self: center;
`

const PhoneNumber = styled.input`
    color: black;
    height: 3rem;
    font-size: 1.2rem;
    border: 0px solid white;
    border-radius: 2px;
    text-align: center;
`

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate()
    const buttonRef = useRef<any>()
    const inputRef = useRef<any>()

    useEffect(() => {
        document.title = "Stu Assist | ورود"
        inputRef.current.focus()
    }, [])

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (phoneNumber.length === 0)
            alert("لطفا شماره تلفن خود را وارد نمایید")
        else if (phoneNumber.length !== PHONE_LENGTH)
            alert("شماره تلفن  به درستی وارد نشده است")
        else handleLogin()
    }

    const handleLogin = () => {
        axios
            .post(LINK_LOGIN,
                {
                    phone_number: phoneNumber
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
            .then(response => {
                console.log("Navigating to OTP....")
                navigate('/otp-verification', { replace: true, state: { phone_number: phoneNumber } })
            }).catch(error =>
                alert(JSON.stringify(error.response.data)))
    }

    return (
        <Container>
            <Box>
                <Logo src={avatar} />
                <PhoneContainer>
                    <Title>لطفا شماره تلفن همراه خود را وارد نمایید</Title>
                    <PhoneNumber type='tel' ref={inputRef} value={phoneNumber} onChange={e => {
                        if (e.target.value.length <= PHONE_LENGTH)
                            setPhoneNumber(e.target.value)
                        if (e.target.value.length === PHONE_LENGTH)
                            buttonRef.current.focus()
                    }} />
                </PhoneContainer>
                <Button title="ورود / ثبت نام" onClick={e => buttonHandle(e)} reference={buttonRef} />
            </Box>
        </Container>
    )
}

export default Login

import styled from "@emotion/styled"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import avatar from '../../assets/user_avatar.png'
import Button from "../../components/tsx/Button";
import usePageTitle from "../../hooks/usePageTitle";
import { LINK_LOGIN, PHONE_LENGTH } from "../../utils/Constants";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
    direction: rtl;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    height: 28rem;
    width: 22rem;
    border: 2px solid gray;
    border-radius: 6px;
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
    height: 10rem;
    flex-direction: column;
    align-items: stretch;
`

const Title = styled.div`
    font-size: 1em;
    color: black;
    margin-top: 4rem;
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
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    usePageTitle('ورود')
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (phoneNumber.length === 0) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("لطفا شماره تلفن خود را وارد نمایید")
        }
        else if (phoneNumber.length !== PHONE_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("شماره تلفن  به درستی وارد نشده است")
        }
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
            }).catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
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
            <ToastContainer
                toastStyle={{
                    backgroundColor: getToastColor(toastID),
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}
                limit={1}
                hideProgressBar={true}
                position='bottom-center' />
        </Container>
    )
}

export default Login

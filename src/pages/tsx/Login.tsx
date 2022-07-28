import styled from "@emotion/styled"
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import avatar from '../../assets/512_512.png'
import Button from "../../components/tsx/Button";
import usePageTitle from "../../hooks/usePageTitle";
import { LINK_LOGIN, PASSWORD_MINIMUM_LENGTH, USERNAME_MINIMUM_LENGTH } from "../../utils/Constants";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";
import crypto from "crypto-js";


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
    justify-content: space-between;
    align-items: stretch;
    min-height: 28rem;
    width: 22rem;
    border: 2px solid gray;
    border-radius: 6px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
    background: #e8e8e8;
`

const Logo = styled.img`
    width: 7rem;
    height: 7rem;
    align-self: center;
`

const FieldsContainer = styled.div`
    display: flex;
    height: 10rem;
    flex-direction: column;
    flex-direction: center;
    align-items: stretch;
`

const Username = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`
const Password = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 1rem;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content : center;
`;

const Title = styled.div`
    font-size: 1.3em;
    color: green;
    font-weight: 700;
    margin-top: 1rem;
`;

const NewUserText = styled.div`
    color: green;
    font-size: 0.9em;
    margin-top: 1rem;
    cursor: pointer;
`;

function Login() {
    const [, setToken] = useLocalStorage('token', null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    usePageTitle('ورود به حساب کاربری')

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (username.length < USERNAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام کاربری به درستی وارد نشده است")
        }
        else if (password.length < PASSWORD_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("کلمه عبور به درستی وارد نشده است")
        }
        else handleLogin()
    }

    const handleLogin = () => {
        axios
            .post(LINK_LOGIN,
                {
                    username: username,
                    password: crypto.SHA256(password)
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
            .then(data => {
                setToken(data.data)
                console.log("Navigating to Home....")
                navigate('/', { replace: true })
            }).catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }

    return (
        <Container>
            <Box>
                <LogoContainer>
                    <Logo src={avatar} />
                    <Title>سامانه خدمات دانشجویی</Title>
                    <Title>Stu-Assist</Title>
                </LogoContainer>
                <FieldsContainer>
                    <Username type='text' value={username} placeholder="نام کاربری" onChange={e => setUsername(e.target.value)} />
                    <Password type='password' value={password} placeholder="کلمه عبور" onChange={e => setPassword(e.target.value)} />
                    <Button title="ورود به حساب کاربری" onClick={e => buttonHandle(e)} />
                </FieldsContainer>
            </Box>
            <NewUserText onClick={e => navigate('/register', { replace: true })}>حساب کاربری ندارید؟ ثبت نام کنید</NewUserText>
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

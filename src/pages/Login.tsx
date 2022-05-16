import styled from "@emotion/styled"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from '../assets/user_avatar.png'
import Button from "../components/Button";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
`;

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
`;

const Logo = styled.img`
    width: 7rem;
    height: 7rem;
    align-self: center;
`;

const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`;

const Title = styled.div`
    font-size: 1.1rem;
    color: black;
    margin-bottom: 1rem;
    align-self: center;
`;

const PhoneNumber = styled.input`
    color: black;
    height: 3rem;
    font-size: 1.2rem;
    border: 0px solid white;
    border-radius: 2px;
    text-align: center;
`;

function Login() {

    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate()
    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (phoneNumber.length === 0)
            alert("لطفا شماره تلفن خود را وارد نمایید")
        else if (phoneNumber.length !== 11)
            alert("شماره تلفن  به درستی وارد نشده است")
        else handleLogin()
    }


    const handleLogin = () => {
        let i = 0;
        while (i++ < 1000000000);
        console.log("Navigating to OTP....")
        navigate('/otp', { replace: true })
    }

    return (
        <Container>
            <Box>
                <Logo src={avatar} />
                <PhoneContainer>
                    <Title>شماره تلفن</Title>
                    <PhoneNumber type='number' value={phoneNumber} onChange={e => e.target.value.length <= 11 ? setPhoneNumber(e.target.value) : null} />
                </PhoneContainer>
                <Button title="ورود / ثبت نام" color="orange" onClick={e => buttonHandle(e)} />
            </Box>
        </Container>
    )
}


export default Login

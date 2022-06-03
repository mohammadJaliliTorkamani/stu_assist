import styled from "@emotion/styled"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from '../assets/user_avatar.png'
import Button from "../components/Button";
import { LINK_OTP, OTP_LENGTH } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";

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

const OTPContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`

const Title = styled.div`
    font-size: 1.0rem;
    color: black;
    margin-bottom: 1rem;
    align-self: center;
    cursor: pointer;
`

const OTPInput = styled.input`
    color: black;
    height: 3rem;
    font-size: 1.2rem;
    border: 0px solid white;
    border-radius: 2px;
    text-align: center;
`

interface stateType {
    phone_number: string
}

function OTP() {
    const [otp, setOtp] = useState('')
    const { state } = useLocation()
    const navigate = useNavigate()
    const buttonRef = useRef<any>()
    const inputRef = useRef<any>()
    const [, setToken] = useLocalStorage('token', null)

    useEffect(() => {
        document.title = "Stu Assist | احراز هویت"
        inputRef.current.focus()
    }, [])

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (otp.length === 0)
            alert("لطفا کد فعالسازی ارسال شده را وارد نمایید")
        else if (otp.length !== OTP_LENGTH)
            alert("کد فعالسازی به درستی وارد نشده است")
        else handleEnter()
    }

    const handleEnter = () => {
        axios
            .post(LINK_OTP,
                {
                    phone_number: (state as stateType).phone_number,
                    otp_code: otp
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
            }).catch(error =>
                alert(JSON.stringify(error.response.data.message)))

    }
    return (
        <Container>
            <Box>
                <Logo src={avatar} />
                <OTPContainer>
                    <Title>لطفا کد فعالسازی ارسال شده را وارد نمایید</Title>
                    <OTPInput
                        type='tel'
                        value={otp}
                        ref={inputRef}
                        onChange={e => {
                            if (e.target.value.length <= OTP_LENGTH) {
                                setOtp(e.target.value)
                                if (e.target.value.length === OTP_LENGTH)
                                    buttonRef.current.focus()
                            }
                        }
                        }
                    />
                </OTPContainer>
                <Button title="ورود" onClick={e => buttonHandle(e)} reference={buttonRef} />
                <Title onClick={(e) => navigate('/login', { replace: true })}>ویرایش شماره تلفن</Title>
            </Box>
        </Container>
    )
}

export default OTP

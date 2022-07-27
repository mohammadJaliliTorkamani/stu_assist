import styled from '@emotion/styled'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/tsx/Button'
import usePageTitle from '../../hooks/usePageTitle'
import { COUNTRY_MINIMUM_LENGTH, FIRST_NAME_MINIMUM_LENGTH, LAST_NAME_MINIMUM_LENGTH, LINK_REGISTER, PASSWORD_MINIMUM_LENGTH, STATE_MINIMUM_LENGTH, USERNAME_MINIMUM_LENGTH } from '../../utils/Constants'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import avatar from '../../assets/512_512.png'
import '../css/Register.css'
import { ToastContainer } from 'react-toastify'

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
    width: 22rem;
    border: 2px solid gray;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
    height: 28rem;
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
    margin-bottom: 0.5rem;
`

const FirstName = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`
const LastName = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const Biography = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const Country = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`
const State = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const Phone = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid green;
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
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

const CurrentUserText = styled.div`
    color: green;
    font-size: 0.9em;
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
`;
function Register() {
    const [, setToken] = useLocalStorage('token', null)
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [biography, setBiography] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)


    usePageTitle('ایجاد حساب کاربری')

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (firstName.length < FIRST_NAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام به درستی وارد نشده است")
        }
        else if (lastName.length < LAST_NAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام خانوادگی به درستی وارد نشده است")
        } else if (username.length < USERNAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام کاربری به درستی وارد نشده است")
        } else if (password.length < PASSWORD_MINIMUM_LENGTH || password2.length < PASSWORD_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("رمز عبور درستی وارد نشده است")
        } else if (country.length < COUNTRY_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("کشور به درستی وارد نشده است")
        } else if (state.length < STATE_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("استان به درستی وارد نشده است")
        } else if (password !== password2) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("کلمات عبور با هم تطابق ندارند")
        }
        else handleLogin()
    }

    const handleLogin = () => {
        axios
            .post(LINK_REGISTER,
                {
                    first_name: firstName,
                    last_name: lastName,
                    bio: biography,
                    username: username,
                    password: password,
                    phone: phone,
                    country: country,
                    state: state
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
            .then(data => {
                setToastStatus(ToastStatus.SUCCESS)
                toastMessage(data.data)
                console.log("Navigating to OTP Verification...." + phone)
                navigate('/otp-verification', { replace: true, state: { phone_number: phone } })
            }).catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }


    return <Container>
        <Box>
            <LogoContainer>
                <Logo src={avatar} />
                <Title>سامانه خدمات دانشجویی</Title>
                <Title>Stu-Assist</Title>
            </LogoContainer>
            <FieldsContainer>
                <FirstName type='text' value={firstName} placeholder="نام" onChange={e => setFirstname(e.target.value)} />
                <LastName type='text' value={lastName} placeholder="نام خانوادگی" onChange={e => setLastname(e.target.value)} />
                <Country type='text' value={country} placeholder="کشور" onChange={e => setCountry(e.target.value)} />
                <State type='text' value={state} placeholder="استان" onChange={e => setState(e.target.value)} />
                <Phone type='text' value={phone} placeholder="شماره تلفن" onChange={e => setPhone(e.target.value)} />
                <Biography type='text' value={biography} placeholder="بیوگرافی (اختیاری)" onChange={e => setBiography(e.target.value)} />
                <Username type='text' value={username} placeholder="نام کاربری" onChange={e => setUsername(e.target.value)} />
                <Password type='password' value={password} placeholder="کلمه عبور" onChange={e => setPassword(e.target.value)} />
                <Password type='password' value={password2} placeholder="تکرار کلمه عبور" onChange={e => setPassword2(e.target.value)} />
                <Button title="ایجاد حساب کاربری" onClick={e => buttonHandle(e)} />
            </FieldsContainer>
        </Box>
        <CurrentUserText onClick={e => navigate('/login', { replace: true })}>حساب کاربری دارید؟ وارد شوید</CurrentUserText>
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
}

export default Register
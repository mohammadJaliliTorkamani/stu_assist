import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/tsx/Button'
import usePageTitle from '../../hooks/usePageTitle'
import {
    FIRST_NAME_MINIMUM_LENGTH, LAST_NAME_MINIMUM_LENGTH, LINK_COUNTRIES, LINK_STATES_OF_A_COUNTRY,
    LINK_REGISTER, PASSWORD_MINIMUM_LENGTH, PHONE_LENGTH, USERNAME_MINIMUM_LENGTH, LINK_GEO_API
} from '../../utils/Constants'
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

const Logo = styled.img`
    width: 7rem;
    height: 7rem;
    align-self: center;
`

const Username = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    direction: ltr;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`
const Password = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const FirstName = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`
const LastName = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const Biography = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`

const Phone = styled.input`
    color: black;
    height: 3rem;
    font-size: 1em;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 2px;
    text-align: center;
    margin-bottom: 0.5rem;
`
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

interface CountryType {
    id: number,
    name: string,
    iso2: string
}

interface StateType {
    id: number,
    name: string,
    iso2: string
}

function Register() {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [countries, setCountries] = useState<CountryType[]>([])
    const [states, setStates] = useState<StateType[]>([])
    const [country, setCountry] = useState<CountryType>()
    const [state, setState] = useState<StateType>()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [biography, setBiography] = useState('')
    const [phone, setPhone] = useState('')
    const [GEOAPI, setGEOAPI] = useState<string>('')
    const navigate = useNavigate()
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    const usernameRef = useRef<any>()
    const justPersian = (str: string, onSuccessCallBack: (() => void), onFailureCallBack: () => void) => {
        let regex = /^[\u0600-\u06FF\s]*$/;
        if (regex.test(str))
            onSuccessCallBack()
        else
            onFailureCallBack()
    }
    const justEnglish = (str: string, onSuccessCallBack: (() => void), onFailureCallBack: () => void) => {
        let regex = /^[a-zA-Z0-9_.\s]{0,}$/;
        if (regex.test(str))
            onSuccessCallBack()
        else
            onFailureCallBack()
    }

    const isValidUsername = (str: string) => {
        const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
        return reg.test(str)
    }

    const containsOnlyDigits = (str: string) => {
        if (str.trim() === '')
            return true
        const reg = /^[0-9]*$/
        return reg.test(str)
    }

    useEffect(() => {
        axios
            .get(LINK_GEO_API)
            .then(response => response.data)
            .then(data => data.data)
            .then(GEOAPIToken => setGEOAPI(GEOAPIToken))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [])

    useEffect(() => {
        if (GEOAPI !== '')
            axios
                .get(LINK_COUNTRIES, {
                    headers: {
                        'X-CSCAPI-KEY': GEOAPI
                    }
                })
                .then(response => response.data)
                .then(data => {
                    setCountries(data)
                    if (data.length > 0)
                        setCountry(data[0])
                })
                .catch(error => {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(JSON.stringify(error.response.data.message))
                })
    }, [GEOAPI])


    useEffect(() => {
        if (country !== undefined && GEOAPI !== '') {
            setStates([])
            axios
                .get(LINK_STATES_OF_A_COUNTRY(country?.iso2), {
                    headers: {
                        'X-CSCAPI-KEY': GEOAPI
                    }
                })
                .then(response => response.data)
                .then(data => {
                    setStates(data)
                    if (data.length > 0)
                        setState(data[0])
                })
                .catch(error => {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(JSON.stringify(error.response.data.message))
                })
        }
    }, [country])

    usePageTitle('ایجاد حساب کاربری')

    const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (firstName.trim().length < FIRST_NAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام به درستی وارد نشده است")
        }
        else if (lastName.trim().length < LAST_NAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام خانوادگی به درستی وارد نشده است")
        } else if (phone.length !== PHONE_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("تلفن همراه به درستی وارد نشده است")
        } else if (username.length < USERNAME_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("نام کاربری به درستی وارد نشده است")
        } else if (!isValidUsername(username)) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("قالب نام کاربری نامعتبر است")
        } else if (password.length < PASSWORD_MINIMUM_LENGTH || password2.length < PASSWORD_MINIMUM_LENGTH) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("رمز عبور درستی وارد نشده است")
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
                    country: country?.name,
                    state: state?.name
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
            .then(data => {
                console.log("Navigating to OTP Verification...." + phone)
                navigate('/otp-verification', { replace: true, state: { phone_number: phone, message: data.data } })
            }).catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }


    return <Container>
        <div className='register-box'>
            <div className='register-logo-container'>
                <Logo src={avatar} />
                <Title>سامانه خدمات دانشجویی</Title>
                <Title>Stu-Assist</Title>
            </div>
            <div className='register-fields-container'>
                <FirstName type='text' value={firstName} placeholder="نام" onChange={e => {
                    justPersian(e.target.value, () => setFirstname(e.target.value), () => {
                        setToastStatus(ToastStatus.INFO)
                        toastMessage("لظفا فارسی تایپ کنید")
                    })
                }} />
                <LastName type='text' value={lastName} placeholder="نام خانوادگی" onChange={e => {
                    justPersian(e.target.value, () => setLastname(e.target.value), () => {
                        setToastStatus(ToastStatus.INFO)
                        toastMessage("لظفا فارسی تایپ کنید")
                    })
                }} />
                <Phone type='tel' value={phone} placeholder="شماره تلفن همراه" onChange={e => {
                    if (!containsOnlyDigits(e.target.value)) {
                        setToastStatus(ToastStatus.INFO)
                        toastMessage("لطفا فقط عدد تایپ کنید")
                    } else {
                        if (e.target.value.length <= PHONE_LENGTH)
                            setPhone(e.target.value)
                        if (e.target.value.length === PHONE_LENGTH)
                            usernameRef.current.focus()
                    }
                }} />
                <Username type='text' value={username} placeholder="نام کاربری" ref={usernameRef} onChange={e => {
                    justEnglish(e.target.value, () => setUsername(e.target.value), () => {
                        setToastStatus(ToastStatus.INFO)
                        toastMessage("لظفا انگلیسی تایپ کنید")
                    })
                }} />
                <Password type='password' value={password} placeholder="کلمه عبور" onChange={e => setPassword(e.target.value)} />
                <Password type='password' value={password2} placeholder="تکرار کلمه عبور" onChange={e => setPassword2(e.target.value)} />
                <div className='register-position-container'>
                    <select className='register-countries-select' onChange={e => setCountry({ iso2: e.target.value, id: -1, name: '' })}>
                        {
                            countries.map(country => <option key={country.id} value={country.iso2}>
                                {country.name}
                            </option>)
                        }
                    </select>
                    <select className='register-states-select' onChange={e => setState({ iso2: e.target.value, id: -1, name: '' })}>
                        {
                            states.map(state => <option key={state.id} value={state.iso2}>
                                {state.name}
                            </option>)
                        }
                    </select>
                </div>
                <Biography type='text' value={biography} placeholder="بیوگرافی (اختیاری)" onChange={e => setBiography(e.target.value)} />
                <Button title="ایجاد حساب کاربری" onClick={e => buttonHandle(e)} />
            </div>
        </div>
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
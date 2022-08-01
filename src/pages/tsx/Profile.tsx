import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../components/tsx/Button";
import ChargeOptionRecord from "../../components/tsx/ChargeOptionRecord";
import TransactionRecord from "../../components/tsx/TransactionRecord";
import useChargeOptions from "../../hooks/useChargeOptions";
import usePageTitle from "../../hooks/usePageTitle";
import {
    LINK_COUNTRIES, LINK_EDIT_USER, LINK_GEO_API,
    LINK_PAYMENT, LINK_PROFILE, LINK_STATES_OF_A_COUNTRY
} from "../../utils/Constants";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";
import avatar from '../../assets/user_avatar.png'
import '../css/Profile.css'

interface TranscationRecordType {
    id: number,
    issueTrackingNo: string,
    orderID: number,
    cost: number,
    cardNo: string,
    date: string,
    time: string
}

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

function Profile() {
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    usePageTitle('حساب کاربری')

    const [balance, setBalance] = useState(0)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photoPath, setPhotoPath] = useState<string>('')
    const [transactions, setTransactions] = useState<TranscationRecordType[]>([])
    const [token,] = useLocalStorage('token', null)
    const [chargeValues, selectedChargeOption, setSelectedChargeOption] = useChargeOptions()
    const [countries, setCountries] = useState<CountryType[]>([])
    const [states, setStates] = useState<StateType[]>([])
    const [country, setCountry] = useState<string>('')
    const [selectedCountry, setSelectedCountry] = useState<CountryType>()
    const [state, setState] = useState<string>('')
    const [selectedState, setSelectedState] = useState<StateType>()
    const [biography, setBiography] = useState<string>('')
    const [GEOAPI, setGEOAPI] = useState<string>('')
    const [fromProfileInit, setFromProfileInit] = useState<boolean>(true)


    const findPlaceWithName = <T extends CountryType | StateType>
        (placeName: string, places: T[]): any => {

        if (countries.length > 0 && placeName !== null)
            return places.filter(place => place.name === placeName)[0]
        return { id: -1, iso2: '', name: '' }
    }

    const findPlaceWithISO2 = <T extends CountryType | StateType>
        (iso2: string, places: T[]): any => {

        if (countries.length > 0 && iso2 !== null)
            return places.filter(place => place.iso2 === iso2)[0]
        return { id: -1, iso2: '', name: '' }
    }

    const handlePayment = () => {
        axios.post(LINK_PAYMENT,
            {
                price: selectedChargeOption.price,
                number_of_requests: selectedChargeOption.numberOfRequests,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => window.open(data.data, "_self"))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }

    const handleInfoChangedClick = () => {
        if (name.trim() === '' || lastName.trim() === '') {
            setToastStatus(ToastStatus.INFO)
            toastMessage("لطفا ابتدا اطلاعات خود را تکمیل نمایید")
            return
        }
        axios
            .get(LINK_EDIT_USER, {
                params: {
                    firstName: name,
                    lastName: lastName,
                    biography: biography,
                    country: country,
                    state: state
                }, headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                setToastStatus(ToastStatus.SUCCESS)
                toastMessage(data.message)
            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
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


        axios
            .get(LINK_PROFILE, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                if (!data.error) {
                    setTransactions(data.data.transactions)
                    setBalance(data.data.balance)
                    setName(data.data.name)
                    setLastName(data.data.lastName)
                    setBiography(data.data.biography === null ? '' : data.data.biography)
                    setCountry(data.data.address !== null ? data.data.address.country : '')
                    setState(data.data.address !== null ? data.data.address.state : '')
                    setPhotoPath(data.data.photoPath !== null ? data.data.photoPath.path : '')
                }
                else {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(data.message)
                }
            })
            .catch(error => JSON.stringify(error))
    }, [])

    useEffect(() => {
        if (GEOAPI !== '')
            axios
                .get(LINK_COUNTRIES, {
                    headers: {
                        "X-CSCAPI-KEY": GEOAPI
                    }
                })
                .then(response => response.data)
                .then(data => setCountries(data))
                .catch(error => {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(JSON.stringify(error.response.data.message))
                })
    }, [GEOAPI])

    useEffect(() => {
        if (countries.length > 0 && country !== '')
            setSelectedCountry(findPlaceWithName<CountryType>(country, countries))
    }, [countries, country])

    useEffect(() => {
        if (selectedCountry !== undefined) {
            setStates([])
            axios
                .get(LINK_STATES_OF_A_COUNTRY(selectedCountry?.iso2), {
                    headers: {
                        "X-CSCAPI-KEY": GEOAPI
                    }
                })
                .then(response => response.data)
                .then(data => setStates(data))
                .catch(error => {
                    setToastStatus(ToastStatus.ERROR)
                    toastMessage(JSON.stringify(error.response.data.message))
                })
        }
    }, [selectedCountry])

    useEffect(() => {
        if (states.length > 0) {
            if (fromProfileInit) {
                setSelectedState(findPlaceWithName<StateType>(state, states))
                setFromProfileInit(false)
            } else {
                setSelectedState(states[0])
                setState(states[0].name)
            }
        }
    }, [states])


    return (
        <div className="content">
            <div className='profile-section-name-label'>حساب کاربری</div>
            <div className="box" >
                <div className="profile-photo-container">
                    <img
                        className="profile-photo"
                        alt="user avatar"
                        src={photoPath === '' ? avatar : photoPath} />
                </div>
                <div className="profile-fields-container">
                    <div className="profile-name-input-container">
                        <div className="profile-name-input-label">نام</div>
                        <input className="profile-name-input-value" type="text" maxLength={140} value={name} onChange={e => setName(e.target.value)} placeholder="لطفا نام خود را وارد نمایید" />
                    </div>
                    <div className="profile-name-input-container">
                        <div className="profile-name-input-label">نام خانوادگی</div>
                        <input className="profile-name-input-value" type="text" maxLength={140} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="لطفا نام خانوادگی خود را وارد نمایید" />
                    </div>
                    <div className="profile-name-input-container">
                        <div className="profile-name-input-label">کشور</div>
                        <select className='register-countries-select' value={selectedCountry?.iso2} onChange={e => {
                            setSelectedCountry({ iso2: e.target.value, id: -1, name: '' })
                            setCountry(findPlaceWithISO2<CountryType>(e.target.value, countries).name)
                        }}>
                            {
                                countries.map(country => <option key={country.id} value={country.iso2}>
                                    {country.name}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="profile-name-input-container">
                        <div className="profile-name-input-label">استان/ایالت</div>
                        <select className='register-countries-select' value={selectedState?.iso2} onChange={e => {
                            setSelectedState({ iso2: e.target.value, id: -1, name: '' })
                            setState(findPlaceWithISO2<StateType>(e.target.value, states).name)
                        }
                        }>
                            {
                                states.map(state => <option key={state.id} value={state.iso2}>
                                    {state.name}
                                </option>)
                            }
                        </select>
                    </div>
                </div>
                <textarea
                    className='profile-biography'
                    placeholder='بیوگرافی'
                    value={biography}
                    onChange={e => setBiography(e.target.value)} />
                <div className="profile-update-button-container">
                    <Button title="ویرایش" onClick={e => handleInfoChangedClick()} />
                </div>
            </div>

            <div className='profile-section-name-label'>شارژ کیف پول</div>
            <div className="box row-box" >
                <div className="profile-wallet-right-section">
                    {"موجودی فعلی : " + (balance / 10).toLocaleString() + " تومان "}
                    <div className="charge-box">
                        <div className="charge-options">
                            {
                                chargeValues.map(value =>
                                    <ChargeOptionRecord
                                        key={value.id}
                                        selected={selectedChargeOption.id === value.id}
                                        onClick={e => { setSelectedChargeOption(value) }}
                                        title={`${(value.price / 10).toLocaleString()} تومان به ازای  ${value.numberOfRequests} محاسبه `}

                                    />)
                            }
                        </div>
                        <Button title="پرداخت" onClick={e => handlePayment()} />
                    </div>
                </div>

                <table className="table">
                    <tbody className="table-body">
                        <tr className="table-row">
                            <th className="table-header">ردیف</th>
                            <th className="table-header"> شماره سفارش</th>
                            <th className="table-header">مبلغ</th>
                            <th className="table-header">کد پیگیری</th>
                            <th className="table-header">تاریخ</th>
                            <th className="table-header">زمان</th>
                        </tr>
                        {transactions.map((record, index) => <TransactionRecord key={record.id} record={record} even={index % 2 === 0} />)}
                    </tbody>
                </table>
            </div>
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
        </div >
    )
}

export default Profile

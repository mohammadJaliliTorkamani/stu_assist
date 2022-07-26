import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import usePageTitle from '../../hooks/usePageTitle'
import { LINK_GUEST_PROFILE } from '../../utils/Constants'
import { getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import '../css/GuestProfile.css'
import defaultProfileLogo from '../../assets/user_avatar.png'

interface GuestProfileType {
    name: string,
    last_name: string,
    address: AddressType,
    photo: {
        path: string
    }
}

interface AddressType {
    country: string,
    state: string,
    city: string
}

function GuestProfile() {
    const { profileId } = useParams()
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    const [person, setPerson] = useState<GuestProfileType>()

    const isEmptyorNullString = (str: string | undefined) => {
        if (str === null || str?.trim() === '')
            return true
        return false
    }

    const generatePersonFullName = (firstName: string | undefined, lastName: string | undefined) => {
        if (firstName === null || firstName === undefined ||
            lastName === null || lastName === undefined ||
            firstName?.trim() === '' || lastName?.trim() === '')
            return "بدون نام";
        else
            return firstName + " " + lastName
    }

    const generateLocation = (address: AddressType | undefined) => {
        if (address === null || address === undefined)
            return "بدون موقعیت";
        else
            return address!.country + " , " + address!.state + " , " + address!.city
    }

    useEffect(() => {
        axios
            .get(LINK_GUEST_PROFILE, {
                params: {
                    id: profileId,
                }
            })
            .then(response => response.data)
            .then(data => {
                setPerson(data.data)
                document.title = isEmptyorNullString(data.data.name) || isEmptyorNullString(data.data.last_name) ?
                    "پروفایل کاربری" :
                    (data.data.name + " " + data.data.last_name)

            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [profileId])


    usePageTitle('')
    return (
        <div className="guest-profile-container" >
            <div className='guest-profile-header'>
                <img className='guest-profile-photo'
                    alt='profile logo'
                    src={person?.photo !== null
                        ? person?.photo.path
                        : defaultProfileLogo} />
                <div className='guest-profile-name-location-container'>
                    <div className='guest-profile-name'>{generatePersonFullName(person?.name, person?.last_name)}</div>
                    <div className='guest-profile-location'>{generateLocation(person?.address)}</div>
                </div>
            </div>
            <div className='guest-profile-devider' />
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
        </div>
    )
}

export default GuestProfile
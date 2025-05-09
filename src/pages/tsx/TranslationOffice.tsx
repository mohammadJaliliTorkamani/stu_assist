import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import TranslationOfficeRecord from '../../components/tsx/TranslationOfficeRecord'
import usePageTitle from '../../hooks/usePageTitle'
import { LINK_TRANSLATION_OFFICES } from '../../utils/Constants'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import '../css/TranslationOffices.css'

interface TranslationOfficeTemplate {
    id: number,
    name: string,
    languages: string[],
    address: {
        name: string,
        latitude: number,
        longitude: number,
        state: string,
        city: string
    },
    website: string,
    phoneNumber: string

}

function TranslationOffice() {
    const [token,] = useLocalStorage('token', null)
    const [offices, setOffices] = useState<TranslationOfficeTemplate[]>([])
    const [officeName, setOfficeName] = useState<string>('')
    const [shouldHaveWebsite, setShouldHaveWebsite] = useState<boolean>(false)
    const [shouldHaveGeoLocation, setShouldHaveGeoLocation] = useState<boolean>(false)
    const [state, setState] = useState<string>('')
    const [states, setStates] = useState<string[]>([])
    const [shownOffices, setShownOffices] = useState<TranslationOfficeTemplate[]>([])
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    usePageTitle('دارالترجمه های رسمی')

    useEffect(() => {
        axios
            .get(LINK_TRANSLATION_OFFICES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                setOffices(data.data)
                if (data.data.length > 0) {
                    const _statesTemp: string[] = ['همه']
                    data.data.forEach((item: TranslationOfficeTemplate) => {
                        if (_statesTemp.indexOf(item.address.state) === -1)
                            _statesTemp.push(item.address.state)
                    })
                    setStates(_statesTemp)
                    setState(_statesTemp[0])
                }
            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [token])

    useEffect(() => {
        setShownOffices(
            offices.filter(office => {
                if (shouldHaveWebsite && shouldHaveGeoLocation)
                    return (state === 'همه' ? true : office.address.state === state) &&
                        office.name.indexOf(officeName) >= 0 &&
                        office.address.latitude !== 0 &&
                        office.address.longitude !== 0 &&
                        office.website !== null
                else if (!shouldHaveWebsite && shouldHaveGeoLocation)
                    return (state === 'همه' ? true : office.address.state === state) &&
                        office.name.indexOf(officeName) >= 0 &&
                        office.address.latitude !== 0 &&
                        office.address.longitude !== 0
                else if (shouldHaveWebsite && !shouldHaveGeoLocation)
                    return (state === 'همه' ? true : office.address.state === state) &&
                        office.name.indexOf(officeName) >= 0 &&
                        office.website !== null
                else
                    return (state === 'همه' ? true : office.address.state === state) &&
                        office.name.indexOf(officeName) >= 0
            }))
    }, [shouldHaveGeoLocation, shouldHaveWebsite, officeName, state])

    return (
        <div className='translation-offices-container'>
            <div className='translation-offices-header'>
                <div className='translation-offices-header-title-container'>
                    <div className='translation-offices-header-title'>  فهرست دارالترجمه های رسمی</div>
                    <div className='translation-offices-options-container'>
                        <div className='translation-offices-check-container' onClick={e => setShouldHaveWebsite(!shouldHaveWebsite)}>
                            <div>وبسایت</div>
                            <input className='translation-offices-checkbox' type={'checkbox'} checked={shouldHaveWebsite} onChange={e => setShouldHaveWebsite(!shouldHaveWebsite)} />
                        </div>
                        <div className='translation-offices-check-container' onClick={e => setShouldHaveGeoLocation(!shouldHaveGeoLocation)}>
                            <div>موقعیت در نقشه</div>
                            <input className='translation-offices-checkbox' type={'checkbox'} checked={shouldHaveGeoLocation} onChange={e => setShouldHaveGeoLocation(!shouldHaveGeoLocation)} />
                        </div>
                        <div className='translation-offices-state-choosing-container'>
                            <div>استان</div>
                            <select className='translation-offices-state-select' onChange={e => setState(e.target.value)}>
                                {
                                    states.map((stateItem: string) => <option key={stateItem} value={stateItem}>
                                        {stateItem}
                                    </option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    className='translation-offices-search-input'
                    placeholder='نام دارالترجمه را وارد نمایید'
                    onChange={e => setOfficeName(e.target.value)}
                    value={officeName} />

            </div>
            <table className="translation-offices-table">
                <tbody className='translation-offices-table-body'>
                    <tr className="translation-offices-table-row">
                        <th className="translation-offices-table-header">ردیف</th>
                        <th className="translation-offices-table-header"> نام دارالترجمه</th>
                        {/* <th className="translation-offices-table-header">زبان ها</th> */}
                        <th className="translation-offices-table-header">شماره تلفن</th>
                        <th className="translation-offices-table-header">وبسایت</th>
                        <th className="translation-offices-table-header">آدرس پستی</th>
                        <th className="translation-offices-table-header">موقعیت در نقشه</th>
                    </tr>
                    {shownOffices.map((office, index) => <TranslationOfficeRecord key={office.id} record={office} even={index % 2 == 0} />)}
                </tbody>
            </table>
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

export default TranslationOffice
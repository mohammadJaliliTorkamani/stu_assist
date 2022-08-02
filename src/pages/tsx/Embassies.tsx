import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import EmbassyRecord from '../../components/tsx/EmbassyRecord'
import { LINK_EMBASSIES } from '../../utils/Constants'
import { getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import '../css/Embassies.css'

interface EmbassyType {
    country: string,
    website: string,
    phone: string,
    photo: string,
    state: string,
    city: string,
    postalAddress: string
}

function Embassies() {
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    const [shownEmbassies, setShownEmbassies] = useState<EmbassyType[]>([])
    const [embassies, setEmbassies] = useState<EmbassyType[]>([])
    const [embassyName, setEmbassyName] = useState<string>('')

    useEffect(() => {
        axios
            .get(LINK_EMBASSIES)
            .then(response => response.data)
            .then(data => { setEmbassies(data.data) })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [])

    useEffect(() => setShownEmbassies(embassies.filter(embassy => embassy.country.indexOf(embassyName) > -1)), [embassyName, embassies])

    return <div className='embassies-container'>
        <input
            className='embassies-search-input'
            placeholder='نام کشور سفارت مورد نظر را وارد نمایید'
            onChange={e => setEmbassyName(e.target.value)}
            value={embassyName} />
        <table className="embassies-table">
            <tbody className='embassies-table-body'>
                <tr className="embassies-table-row">
                    <th className="embassies-table-header">پرچم</th>
                    <th className="embassies-table-header">کشور</th>
                    <th className="embassies-table-header"> وبسایت</th>
                    <th className="embassies-table-header">شماره تلفن</th>
                    <th className="embassies-table-header">استان</th>
                    <th className="embassies-table-header">شهر</th>
                    <th className="embassies-table-header">آدرس پستی</th>
                </tr>
                {shownEmbassies.sort((a: EmbassyType, b: EmbassyType) => a.country > b.country ? 1 : (a.country < b.city ? -1 : 0)).map((embassy, index) => <EmbassyRecord key={embassy.country} record={embassy} even={index % 2 === 0} />)}
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
}
export default Embassies
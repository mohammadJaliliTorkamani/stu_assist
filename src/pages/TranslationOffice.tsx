import axios from 'axios'
import { useEffect, useState } from 'react'
import TranslationOfficeRecord from '../components/TranslationOfficeRecord'
import usePageTitle from '../hooks/usePageTitle'
import { LINK_TRANSLATION_OFFICES } from '../utils/Constants'
import { useLocalStorage } from '../utils/useLocalStorage'
import './TranslationOffices.css'

interface TranslationOfficeTemplate {
    id: number,
    name: string,
    languages: string[],
    address: {
        name: string,
        latitude: number,
        longitude: number
    },
    website: string,
    phoneNumber: string

}

function TranslationOffice() {
    const [token,] = useLocalStorage('token', null)
    const [offices, setOffices] = useState<TranslationOfficeTemplate[]>([])
    usePageTitle('دارالترجمه های رسمی')

    useEffect(() => {
        axios
            .get(LINK_TRANSLATION_OFFICES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => { setOffices(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token])

    return (
        <div className='container1'>
            <table className="table">
                <tbody className='table-body'>
                    <tr className="table-row">
                        <th className="table-header">ردیف</th>
                        <th className="table-header"> نام دارالترجمه</th>
                        <th className="table-header">زبان ها</th>
                        <th className="table-header">شماره تلفن</th>
                        <th className="table-header">وبسایت</th>
                        <th className="table-header">آدرس پستی</th>
                        <th className="table-header">موقعیت در نقشه</th>
                    </tr>
                    {offices.map(office => <TranslationOfficeRecord key={office.id} record={office} />)}
                </tbody>
            </table>
        </div>
    )
}

export default TranslationOffice
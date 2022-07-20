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
        <div className='translation-offices-container'>
            <table className="translation-offices-table">
                <tbody className='translation-offices-table-body'>
                    <tr className="translation-offices-table-row">
                        <th className="translation-offices-table-header">ردیف</th>
                        <th className="translation-offices-table-header"> نام دارالترجمه</th>
                        <th className="translation-offices-table-header">زبان ها</th>
                        <th className="translation-offices-table-header">شماره تلفن</th>
                        <th className="translation-offices-table-header">وبسایت</th>
                        <th className="translation-offices-table-header">آدرس پستی</th>
                        <th className="translation-offices-table-header">موقعیت در نقشه</th>
                    </tr>
                    {offices.map(office => <TranslationOfficeRecord key={office.id} record={office} />)}
                </tbody>
            </table>
        </div>
    )
}

export default TranslationOffice
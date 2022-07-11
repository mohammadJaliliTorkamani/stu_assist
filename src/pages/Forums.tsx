import axios from 'axios'
import { useEffect, useState } from 'react'
import CategoryItem from '../components/CategoryItem'
import { LINK_FORUMS_CATEGORIES } from '../utils/Constants'
import { useLocalStorage } from '../utils/useLocalStorage'
import './Forums.css'

interface CategoryType {
    name: string,
    descriptor: string
}

function Forums() {
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [token,] = useLocalStorage('token', null)

    useEffect(() => {
        document.title = "Stu Assist | تالار گفتگو"
        axios
            .get(LINK_FORUMS_CATEGORIES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => { setCategories(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token])
    return (
        <div className='container'>
            <div className='categories_container'>
                {
                    categories.map(category => <CategoryItem key={category.name} category={category} />)
                }
            </div>
        </div>
    )
}

export default Forums 
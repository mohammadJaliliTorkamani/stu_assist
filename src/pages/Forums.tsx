import { useEffect } from 'react'
import CategoryItem from '../components/CategoryItem'
import useCategory from '../hooks/useCategory'
import './Forums.css'

function Forums() {
    const [categories] = useCategory()

    useEffect(() => {
        document.title = "Stu Assist | تالار گفتگو"
    }, [])

    return (
        <div className='forums-container1'>
            <div className='forums-categories_container'>
                {categories.map(category => <CategoryItem key={category.name} category={category} />)}
            </div>
        </div>
    )
}

export default Forums 
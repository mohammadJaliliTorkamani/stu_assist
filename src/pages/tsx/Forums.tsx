import CategoryItem from '../../components/tsx/CategoryItem'
import useCategory from '../../hooks/useCategory'
import usePageTitle from '../../hooks/usePageTitle'
import '../css/Forums.css'

function Forums() {
    const [categories] = useCategory()

    usePageTitle('تالار گفتگو')

    return (
        <div className='forums-container1'>
            <div className='forums-categories_container'>
                {categories.map(category => <CategoryItem key={category.name} category={category} />)}
            </div>
        </div>
    )
}

export default Forums 
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import BlogPostItem from '../../components/tsx/BlogPostItem'
import usePageTitle from '../../hooks/usePageTitle'
import { LINK_BLOGS_BLOGS } from '../../utils/Constants'
import { getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import '../css/Blogs.css'

interface BlogsCategoryType {
    categoryID: number,
    categoryName: string,
}

interface BlogPostType {
    id: number,
    title: string,
    overview: string,
    photoPath: string,
    creationDate: string,
    creationTime: string
}

interface RawPostsType {
    categoryID: number,
    categoryName: string,
    posts: BlogPostType[]
}

function Blogs() {
    const [categories, setCategories] = useState<BlogsCategoryType[]>([])
    const [posts, setPosts] = useState<BlogPostType[]>([])
    const [rawData, setRawData] = useState<RawPostsType[]>([])
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    const [selectedBlogCategory, setSelectedBlogCategory] = useState<number>(-1)
    usePageTitle('وبلاگ')

    const getCategoriesFrom = (data: RawPostsType[]): BlogsCategoryType[] => {
        let categories: BlogsCategoryType[] = []
        data.map(item => categories.push({
            categoryID: item.categoryID,
            categoryName: item.categoryName
        }))

        return categories
    }

    const getPostsFrom = (data: RawPostsType[]): BlogPostType[] => {
        let posts: BlogPostType[] = []
        data.forEach(raw_item => raw_item.posts.forEach(post => {
            if (!posts.some(s_item => s_item.id === post.id))
                posts.push(post)
        })
        )

        return posts
    }

    useEffect(() => {
        axios
            .get(LINK_BLOGS_BLOGS)
            .then(response => response.data.data)
            .then(data => {
                setRawData(data)
                const deficientCategories = (getCategoriesFrom(data))
                const newCategories: BlogsCategoryType[] = [{ categoryID: -1, categoryName: 'همه' }, ...deficientCategories]
                setCategories(newCategories)
                return data
            })
            .then(data => setPosts(getPostsFrom(data)))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [])

    return <div className='blogs-container'>
        <div className='blogs-categories'>
            {categories.map(category => <div key={category.categoryID} className={category.categoryID === selectedBlogCategory ? 'blogs-category-selected' : 'blogs-category-unselected'} onClick={e => setSelectedBlogCategory(category.categoryID)}> {category.categoryName} </div>)}
        </div>
        <div className='blogs-posts'>
            {
                selectedBlogCategory === -1 &&
                posts.map(post => <BlogPostItem key={post.id} post={post} />)
            }
            {
                selectedBlogCategory > 0 &&
                rawData.filter(item => item.categoryID === selectedBlogCategory)[0].posts.map(post => <BlogPostItem key={post.id} post={post} />)
            }
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
    </div>
}

export default Blogs
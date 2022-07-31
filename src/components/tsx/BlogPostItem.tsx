import { createBlogPostUrl } from '../../utils/Utils'
import '../css/BlogPostItem.css'
import Button from './Button'

interface IProps {
    post: BlogPostType
}

interface BlogPostType {
    id: number,
    title: string,
    overview: string,
    photoPath: string,
    creationDate: string,
    creationTime: string
}

function BlogPostItem({ post }: IProps) {
    const photoPath = post.photoPath

    return <a className='blog-post-item-container' href={createBlogPostUrl(post.id)} target="_self">
        <img src={photoPath} alt={post.title + " Image"} className="blog-post-item-image" />
        <div className='blog-post-item-text-content-container'>
            <div className='blog-post-item-title'>{post.title}</div>
            <div className='blog-post-item-overview'>{post.overview}</div>
        </div>
        <div className='blog-post-item-read-more-container'>
            <div className='blog-post-item-read-more' >مطالعه</div>
        </div>
    </a>
}

export default BlogPostItem
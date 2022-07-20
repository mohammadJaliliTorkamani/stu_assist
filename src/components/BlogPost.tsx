import './BlogPost.css'

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

function BlogPost({ post }: IProps) {
    const photoPath = post.photoPath
    return <div className='blog-post-container'>
        <img src={photoPath} alt={post.title + " Image"} />
        <div className='blog-post-text-content-container'>
            <div className='blog-post-title'>{post.title}</div>
            <div className='blog-post-overview'>{post.overview}</div>
        </div>
        <div className='blog-post-read-more-container'>
            <div className='blog-post-read-more'>مطالعه</div>
        </div>
    </div>
}

export default BlogPost
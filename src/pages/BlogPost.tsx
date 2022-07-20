import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { LINK_BLOGS_BLOG } from '../utils/Constants'
import './BlogPost.css'

interface BlogPostType {
    id: number,
    title: string,
    overview?: string,
    content: string,
    photoPath: string,
    creationDate: string,
    creationTime: string
}

function BlogPost() {

    const { postId } = useParams()
    const _postId = typeof postId == 'undefined' ? 0 : parseInt(postId)
    const [post, setPost] = useState<BlogPostType>()

    useEffect(() => {
        axios
            .get(LINK_BLOGS_BLOG, {
                params: {
                    id: _postId,
                }
            })
            .then(response => response.data)
            .then(data => {
                setPost(data.data)
                document.title = data.data.title
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))

    }, [_postId])

    return <div className='blog-post-container'>
        <div className='blog-post-cadr'>
            <div className='blog-post-cadr-header'>
                <div className='blog-post-cadr-header-title'>{post?.title}</div>
                <div className='blog-post-cadr-header-date-time'>{"زمان انتشار : " + post?.creationDate + " " + post?.creationTime}</div>
            </div>
            <div className='blog-post-cadr-content'>{post?.content}</div>
            {post?.photoPath !== undefined &&
                <div className='blog-post-cadr-image-container'>
                    <img src={post.photoPath} alt={post?.title + " Image"} className='blog-post-cadr-image' />
                </div>
            }
        </div>
    </div>
}

export default BlogPost
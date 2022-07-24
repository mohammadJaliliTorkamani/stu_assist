import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, LINK_BLOGS_BLOG } from '../utils/Constants'
import './BlogPost.css'
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share'
import { createBlogPostUrl, toastMessage, ToastStatus } from '../utils/Utils'
import clipboardLogo from '../assets/clipboard_logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

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
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })

    }, [_postId])

    return <div className='blog-post-container'>
        <div className='blog-post-cadr'>
            <div className='blog-post-cadr-header'>
                <div>
                    <div className='blog-post-cadr-header-title'>{post?.title}</div>
                    <div className='blog-post-cadr-header-date-time'>{"زمان انتشار : " + post?.creationDate + " " + post?.creationTime}</div>
                </div>
                {post?.photoPath !== undefined &&
                    <div className='blog-post-cadr-image-container'>
                        <img src={post.photoPath} alt={post?.title + " Image"} className='blog-post-cadr-image' />
                    </div>
                }
            </div>
            <div className='blog-post-cadr-content'>{post?.content}</div>
            <div className='blog-post-cadr-clipboard-container' onClick={e => {
                navigator.clipboard.writeText(createBlogPostUrl(_postId))
                toast("آدرس پست وبلاگ کپی شد")
            }}>
                <div className='blog-post-cadr-clipboard-text'>{createBlogPostUrl(_postId)}</div>
                <img className='blog-post-cadr-clipboard-button' src={clipboardLogo} alt="copy to clopboard logo" />
            </div>

            <div className='blog-post-share-container'>
                <TwitterShareButton url={createBlogPostUrl(_postId)} title={post?.title} hashtags={["Stu_Assist"]}>
                    <TwitterIcon round={true} size={45} />
                </TwitterShareButton>
                <FacebookShareButton url={createBlogPostUrl(_postId)} quote={post?.title} hashtag={"Stu_Assist"}>
                    <FacebookIcon round={true} size={45} />
                </FacebookShareButton>
                <LinkedinShareButton url={createBlogPostUrl(_postId)} source={BASE_URL} title={post?.title} summary={post?.overview}>
                    <LinkedinIcon round={true} size={45} />
                </LinkedinShareButton>
                <TelegramShareButton url={createBlogPostUrl(_postId)} title={post?.title}>
                    <TelegramIcon round={true} size={45} />
                </TelegramShareButton>
                <WhatsappShareButton url={createBlogPostUrl(_postId)} title={post?.title}>
                    <WhatsappIcon round={true} size={45} />
                </WhatsappShareButton>
                <EmailShareButton url={createBlogPostUrl(_postId)} title={post?.title} body={post?.overview}>
                    <EmailIcon round={true} size={45} />
                </EmailShareButton>
            </div>
        </div>
        <ToastContainer
            toastStyle={{
                backgroundColor: '#e3c427',
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

export default BlogPost
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogPostItem from "../../components/tsx/BlogPostItem";
import Button from "../../components/tsx/Button";
import HomeOptionBox from "../../components/tsx/HomeOptionBox";
import usePageTitle from "../../hooks/usePageTitle";
import { LINK_BLOGS_RECENT_POSTS } from "../../utils/Constants";
import { getToastColor, toastMessage, ToastStatus } from "../../utils/Utils";
import '../css/Home.css'

interface BlogPostType {
    id: number,
    title: string,
    overview: string,
    creationDate: string,
    creationTime: string,
    photoPath: string
}

function Home() {
    usePageTitle('خانه')

    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)
    const [recentBlogPosts, setRecentBlogPosts] = useState<BlogPostType[]>([])
    const [isMobileView, setIsMobileView] = useState(false)

    const navigate = useNavigate()

    useEffect(() => setIsMobileView(window.innerWidth < 960), [window])

    useEffect(() => {
        axios
            .get(LINK_BLOGS_RECENT_POSTS, {
                params: {
                    capacity: isMobileView ? 4 : 5
                }
            })
            .then(response => response.data)
            .then(data => setRecentBlogPosts(data.data))
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [isMobileView])

    return (
        <div className="home-container">
            <div className="home-sticker">خدمات</div>

            <div className="home-options">
                <HomeOptionBox
                    key={1}
                    page={{
                        id: 1,
                        text: "محاسبه ECTS",
                        link: "ects-calculator"
                    }} />
                <HomeOptionBox key={2}
                    page={{
                        id: 2,
                        text: "محاسبه GPA",
                        link: "gpa-calculator"
                    }} />

                <HomeOptionBox key={3}
                    page={{
                        id: 3,
                        text: "دارالترجمه های رسمی",
                        link: "translation-offices"
                    }}
                />
                <HomeOptionBox key={4}
                    page={{
                        id: 4,
                        text: "تالار گفتگو",
                        link: "forums"
                    }}
                />
                <HomeOptionBox key={5}
                    page={{
                        id: 5,
                        text: "تجربه پذیرش",
                        link: "application-experience"
                    }}
                />
                <HomeOptionBox key={6}
                    page={{
                        id: 6,
                        text: "سفارت ها",
                        link: "embassies"
                    }}
                />
            </div>

            <div className="home-recent-blog-posts-container">
                <div className="home-sticker">تازه ها</div>
                < div className="home-recent-blog-posts ltr">
                    {recentBlogPosts.map(post => <BlogPostItem key={post.id} post={post} />)}
                </div>
                <Button className="home-recent-blog-show-more" title="نمایش بیشتر" onClick={e => navigate('blogs')} />
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
        </div >
    )
}

export default Home

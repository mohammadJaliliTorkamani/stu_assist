import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './ForumsList.css'
import TopicItem from "./TopicItem"
import { useLocalStorage } from "../utils/useLocalStorage"
import axios from "axios"
import { LINK_FORUMS_HALL, LINK_FORUMS_TOPICS } from "../utils/Constants"
import Button from "../components/Button"

interface HallType {
    id: number,
    name: string,
    descriptor: string,
    numberOfTopics: number,
    lastTopic: {
        id: number,
        name: string,
        lastTopicDateEquivalent: string
    }
}

interface TopicType {
    id: number,
    name: string,
    content: string,
    numberOfComments: number,
    numberOfViews: number,
    lastComment: {
        creatorID: number,
        creator: string,
        lastCommentDateEquivalent: string
    }
}

function ForumsList() {
    const [token,] = useLocalStorage('token', null)
    const [hall, setHall] = useState<HallType>()
    const [topics, setTopics] = useState<TopicType[]>([])
    const { hallId } = useParams()
    const _hallId = typeof hallId == 'undefined' ? 0 : parseInt(hallId)
    const navigate = useNavigate()

    const fetchTopics = (token: string, hallId: number) =>
        axios.get(LINK_FORUMS_TOPICS, {
            headers: {
                "Authorization": `Bearer ${token}`
            }, params: {
                hall: hallId,
            }
        })
            .then(response => response.data)
            .then(data => { setTopics(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))

    const fetchHall = (token: string, hallId: number) =>
        axios.get(LINK_FORUMS_HALL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }, params: {
                hall: hallId,
            }
        })
            .then(response => response.data)
            .then(data => { setHall(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))


    useEffect(() => {
        document.title = "Stu Assist | سالن گفتگو"
        fetchTopics(token, _hallId)
        fetchHall(token, _hallId)
    }, [token, _hallId])

    return (
        <div className="forums-list-container1">
            <div className="forums-list-above-header">
                <div className="forums-list-hall-name-text">تالار {hall?.name} </div>
                {
                    token && <Button
                        title="ساخت تاپیک جدید"
                        className="forums-list-new-topic"
                        onClick={e => navigate('/create-topic')}
                    />
                }
                {
                    !token && <div className="forums-list-login-container">
                        <div className="forums-list-login-label">
                            جهت ساخت تاپیک ابتدا وارد حساب کاربری خود شوید
                        </div>
                        <Button
                            className="forums-list-login-button"
                            title="ورود / ثبت نام"
                            onClick={e => navigate('/login', { replace: true })}
                        />
                    </div>
                }

            </div>
            <div className="forums-list-hall-descriptor-text">{hall?.descriptor}</div>
            <table className="forums-list-table">
                <tbody className="forums-list-table-body">
                    <tr className="forums-list-table-row">
                        <th className="forums-list-table-header">تاپیک</th>
                        <th className="forums-list-table-header"> بازدید ها / نظرات</th>
                        <th className="forums-list-table-header">آخرین پاسخ دهنده</th>
                    </tr>
                    {topics.map(topic => <TopicItem key={topic.id} hallId={_hallId} topic={topic} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ForumsList
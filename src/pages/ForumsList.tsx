import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
        <div className="container1">
            <div className="above-header">
                <div className="hall-name-text">تالار {hall?.name} </div>
                <Button title="ساخت تاپیک جدید" className="new-topic" onClick={e => alert("آزمایشی")} />
            </div>
            <div className="hall-descriptor-text">{hall?.descriptor}</div>
            <table className="table">
                <tbody className="table-body">
                    <tr className="table-row">
                        <th className="table-header">تاپیک</th>
                        <th className="table-header"> بازدید ها / نظرات</th>
                        <th className="table-header">آخرین پاسخ دهنده</th>
                    </tr>
                    {topics.map(topic => <TopicItem key={topic.id} hallId={_hallId} topic={topic} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ForumsList
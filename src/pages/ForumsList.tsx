import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import './ForumsList.css'
import TopicItem from "./TopicItem"
import { useLocalStorage } from "../utils/useLocalStorage"
import axios from "axios"
import { LINK_FORUMS_HALL, LINK_FORUMS_TOPICS } from "../utils/Constants"

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
    lastComment: {
        id: number,
        content: string,
        lastCommentDateEquivalent: string
    }
}

function ForumsList() {
    const { hallId } = useParams()
    const [hall, setHall] = useState<HallType>()
    const [topics, setTopics] = useState<TopicType[]>([])
    const [token,] = useLocalStorage('token', null)

    useEffect(() => {
        document.title = "Stu Assist | سالن گفتگو"
        axios
            .get(LINK_FORUMS_TOPICS, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }, params: {
                    hall: hallId,
                }
            })
            .then(response => response.data)
            .then(data => { setTopics(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))

        axios
            .get(LINK_FORUMS_HALL, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }, params: {
                    hall: hallId,
                }
            })
            .then(response => response.data)
            .then(data => { setHall(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))

    }, [token, hallId])

    return (
        <div className="container">
            <Link to={'/forums'} className="forums-text">تالار گفتگو</Link>
            <div className="hall-name-text">تالار {hall?.name} </div>
            {/* <Button title="ساخت تاپیک جدید" onClick={e => alert("آزمایشی")} /> */}
            <div className="hall-descriptor-text">{hall?.descriptor}</div>
            <table className="table">
                <tbody className="table-body">
                    <tr className="table-row">
                        <th className="table-header">تاپیک</th>
                        {/* <th className="table-header"> پست ها / بازدید ها</th>
                        <th className="table-header">آخرین پاسخ / زمان</th> */}
                    </tr>
                    {topics.map(topic => <TopicItem key={topic.id} topic={topic} hallId={typeof hallId == 'undefined' ? 0 : parseInt(hallId)} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ForumsList
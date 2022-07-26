import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_FORUMS_INCREASE_VIEWS, LINK_FORUMS_LIKE_UNLIKE_TOPIC, LINK_FORUMS_REPORT_TOPIC, LINK_FORUMS_SEND_COMMENT, LINK_FORUMS_TOPIC, LINK_FORUMS_TOPICS } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

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

function useTopic(hallId: number) {
    const [topics, setTopics] = useState<TopicType[]>([])
    const [token,] = useLocalStorage('token', null)

    const createTopic = (name: string, content: string, category: string, hall: number, onSuccess: (topicId: number) => void) => {
        if (name === '' || content === '' || category === '' || hall === -1) {
            alert("لطفا تمامی فیلد ها را تکمیل نمایید")
            return;
        }

        axios.post(LINK_FORUMS_TOPIC,
            {
                name: name,
                content: content,
                category: category,
                hall: hall,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => { onSuccess(data.data) })
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
    }

    const postReply = (topicId: number, reply: string, onSuccess: (() => void)) => {
        if (reply === '')
            return;

        axios.post(LINK_FORUMS_SEND_COMMENT,
            {
                id: topicId,
                content: reply
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => { onSuccess() })
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
    }

    const increaseView = (topicId: number) => {
        axios.post(LINK_FORUMS_INCREASE_VIEWS,
            {
                id: topicId,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
    }

    const likeUnlikeTopic = (topicId: number, like: boolean, onSuccess: (() => void)) => {
        axios
            .post(LINK_FORUMS_LIKE_UNLIKE_TOPIC,
                {
                    id: topicId,
                    like: like ? 1 : 0
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => onSuccess())
            .catch(error =>
                alert(JSON.stringify(error.response.data.message)))
    }

    const reportTopic = (topicId: number, reason: string, onSuccess: (() => void)) => {
        if (reason === '')
            return
        axios
            .post(LINK_FORUMS_REPORT_TOPIC,
                {
                    id: topicId,
                    reason: reason
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => onSuccess())
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }

    useEffect(() => {
        axios.get(LINK_FORUMS_TOPICS, {
            params: {
                hall: hallId,
            }
        })
            .then(response => response.data)
            .then(data => { setTopics(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [hallId])

    return [topics, createTopic, increaseView, likeUnlikeTopic, reportTopic, postReply] as const
}

export default useTopic
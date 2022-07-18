import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_FORUMS_CREATE_TOPIC, LINK_FORUMS_TOPICS } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"
import { createTopicUrl } from "../utils/Utils"

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

        axios.post(LINK_FORUMS_CREATE_TOPIC,
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

    return [topics, createTopic] as const
}

export default useTopic
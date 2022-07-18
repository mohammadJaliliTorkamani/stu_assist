import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_FORUMS_TOPICS } from "../utils/Constants"

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

    return [topics] as const
}

export default useTopic
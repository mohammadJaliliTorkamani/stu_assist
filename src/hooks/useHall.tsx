import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_FORUMS_HALL } from "../utils/Constants"

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

function useHall(hallId: number) {
    const [hall, setHall] = useState<HallType>()

    useEffect(() => {
        axios.get(LINK_FORUMS_HALL, {
            params: {
                hall: hallId,
            }
        })
            .then(response => response.data)
            .then(data => { setHall(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [hallId])

    return [hall] as const
}

export default useHall
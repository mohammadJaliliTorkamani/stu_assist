import { BASE_URL } from "./Constants";

export function createHallUrl(hallId: number) {
    return BASE_URL + "/forums/" + hallId
}

export function createTopicUrl(hallId: string | undefined, topicId: number) {
    return BASE_URL + "/forums/" + hallId + "/" + topicId
}
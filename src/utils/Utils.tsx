import { BASE_URL } from "./Constants";

export function createHallUrl(hallId: number) {
    return BASE_URL + "forums/" + hallId
}

export function createTopicUrl(hallId: number, topicId: number) {
    return BASE_URL + "forums/" + hallId + "/" + topicId
}

export function createProfileUrl(profileID: number) {
    return BASE_URL + "profile/" + profileID
}
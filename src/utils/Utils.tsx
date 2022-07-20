import { BASE_URL } from "./Constants";

export function createHallUrl(hallId: number) {
    return (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : BASE_URL) + "forums/" + hallId
}

export function createTopicUrl(hallId: number, topicId: number) {
    return (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : BASE_URL) + "forums/" + hallId + "/" + topicId
}

export function createProfileUrl(profileID: number) {
    return (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : BASE_URL) + "profile/" + profileID
}

export function createBlogPostUrl(postID: number) {
    return (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : BASE_URL) + "blogs/" + postID
}
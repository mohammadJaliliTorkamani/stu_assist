import { toast } from "react-toastify";
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

export function toastMessage(message: string) {
    toast(message)
}

export enum ToastStatus {
    SUCCESS = 1, ERROR = 2, INFO = 3
}

export function getToastColor(toastId: ToastStatus = ToastStatus.SUCCESS) {
    switch (toastId) {
        case ToastStatus.SUCCESS: return 'green';
        case ToastStatus.ERROR: return '#ed4e51';
        default: return '#e3c427'; //info
    }
}



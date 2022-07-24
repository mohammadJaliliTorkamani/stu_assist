import axios from "axios";
import { LINK_FORUMS_COMMENTS, LINK_FORUMS_COMMENTS_LIKE, LINK_FORUMS_COMMENTS_REPORT } from "../utils/Constants";
import { useLocalStorage } from "../utils/useLocalStorage";

function useComment() {

    const [token,] = useLocalStorage('token', null)

    const likeUnlikeComment = (commentId: number, like: boolean, onSuccess: (() => void)) => {
        axios
            .post(LINK_FORUMS_COMMENTS_LIKE,
                {
                    id: commentId,
                    like: like ? 1 : 0
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

    const reportComment = (commentId: number, reason: string, onSuccess: (() => void)) => {
        if (reason === '')
            return
        axios
            .post(LINK_FORUMS_COMMENTS_REPORT,
                {
                    id: commentId,
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
    return [likeUnlikeComment, reportComment] as const
}

export default useComment
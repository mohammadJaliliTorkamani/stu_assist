import axios from 'axios'
import { useEffect, useState } from 'react'
import { LINK_FORUMS_CREATOR } from '../utils/Constants'
import { useLocalStorage } from '../utils/useLocalStorage'
import './CommentItem.css'
import avatar from '../assets/user_avatar.png'
import { createProfileUrl } from '../utils/Utils'

interface IProps {
    comment: CommentType
}

interface CommentType {
    id: number,
    message: string,
    creatorID: number,
    commentDateTime: string
}

interface PersonType {
    fullName: string
}

function CommentItem({ comment }: IProps) {
    const [token,] = useLocalStorage('token', null)
    const [person, setPerson] = useState<PersonType>()

    useEffect(() => {
        axios.get(LINK_FORUMS_CREATOR, {
            headers: {
                "Authorization": `Bearer ${token}`
            }, params: {
                id: comment.creatorID,
            }
        })
            .then(response => response.data)
            .then(data => { setPerson(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token, comment.creatorID])


    return (
        <div className="comment-item-container">
            <div className='comment-item-header'>
                <img className='comment-item-avatar-style' src={avatar} alt={"profile"} />
                <div className='comment-item-header-text-container'>
                    <div className='comment-item-header-text-container-row'>
                        <div className='topic-label-key'>نام و نام خانوادگی : </div>
                        <a className='comment-item-header-text-container-name' href={createProfileUrl(comment.creatorID)}>
                            {person?.fullName}</a>
                    </div>
                    <div className='comment-item-header-text-container-row'>
                        <div className='comment-item-label-key'>تاریخ ارسال : </div>
                        <div>{comment?.commentDateTime}</div>
                    </div>
                </div>
            </div>
            <div className='comment-item-body'>
                <div className='comment-item-body-row-comment'>
                    {comment?.message}
                </div>
            </div>
        </div>
    )
}

export default CommentItem
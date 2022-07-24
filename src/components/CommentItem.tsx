import axios from 'axios'
import { useEffect, useState } from 'react'
import { LINK_FORUMS_CREATOR } from '../utils/Constants'
import { useLocalStorage } from '../utils/useLocalStorage'
import './CommentItem.css'
import avatar from '../assets/user_avatar.png'
import { createProfileUrl } from '../utils/Utils'
import Modal from 'react-modal'
import heartFilledLogo from '../assets/heart_filled.png'
import heartEmptyLogo from '../assets/heart_empty.png'
import repottLogo from '../assets/report_logo.png'
import Button from './Button'
import useComment from '../hooks/useComment'
import { useNavigate } from 'react-router-dom'

interface IProps {
    comment: CommentType
}

interface CommentType {
    id: number,
    message: string,
    liked: boolean | undefined,
    numberOfLikes: number,
    creatorID: number,
    commentDateTime: string
}

interface PersonType {
    fullName: string
}

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function CommentItem({ comment }: IProps) {
    const [token,] = useLocalStorage('token', null)
    const [person, setPerson] = useState<PersonType>()
    const [liked, setLiked] = useState<boolean>(false)
    const [reportText, setReportText] = useState<string>('')
    const [reportTopicModalIsShown, setReportTopicModalIsShown] = useState<boolean>(false)
    const [likeUnlikeComment, reportComment] = useComment()
    const navigate = useNavigate()

    const hanldIfLoggedIn = (callBack: () => void) => {
        if (token !== null)
            callBack()
        else
            navigate('/login')
    }

    useEffect(() => {
        setLiked(comment.liked !== undefined && comment.liked === true)
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
            <Modal
                style={modalStyle}
                isOpen={reportTopicModalIsShown}>
                <div className='topic-report-container'>
                    <div className='topic-report-inner-container'>
                        <span className='fas fa-times topic-report-cross' onClick={e => setReportTopicModalIsShown(false)} />
                        <textarea className='topic-report-text' placeholder='علت تخلف کامنت را توضیح دهید'
                            onChange={e => setReportText(e.target.value)}>{reportText}</textarea>
                    </div>
                    <Button title='ارسال تخلف' onClick={e => {
                        if (reportText.trim() === '' || reportText.length === 0) {
                            alert("لطفا علت تخلف کامنت را وارد نمایید")
                            return
                        }
                        reportComment(comment.id, reportText, () => {
                            setReportText('')
                            setReportTopicModalIsShown(false)
                            alert("با تشکر از شما، گزارش به مدیریت ارسال شد")
                        })

                    }} />
                </div>
            </Modal>
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
            <div className='comment-item-options-container'>
                <div>
                    <img
                        className='comment-item-options-item-image'
                        src={repottLogo}
                        title="گزارش پست"
                        alt="گزارش پست"
                        onClick={e => hanldIfLoggedIn(() => setReportTopicModalIsShown(true))}
                    />
                    <img
                        className='comment-item-options-item-image'
                        src={liked ? heartFilledLogo : heartEmptyLogo}
                        alt={liked ? "نپسندیدن" : "پسندیدن"}
                        title="پسندیدن"
                        onClick={e =>
                            hanldIfLoggedIn(() => likeUnlikeComment(comment.id, !liked, () => setLiked(!liked)))
                        } />
                </div>
                <div className='comment-item-like-text'>{`${comment?.numberOfLikes === undefined ? 0 : comment?.numberOfLikes} پسند`}</div>
            </div>
        </div>
    )
}

export default CommentItem
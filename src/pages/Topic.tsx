import './Topic.css'
import avatar from '../assets/user_avatar.png'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LINK_FORUMS_COMMENTS, LINK_FORUMS_CREATOR, LINK_FORUMS_TOPIC } from '../utils/Constants'
import CommentItem from '../components/CommentItem'
import { createProfileUrl, createTopicUrl } from '../utils/Utils'
import Button from '../components/Button'
import useTopic from '../hooks/useTopic'
import usePageTitle from '../hooks/usePageTitle'
import heartFilledLogo from '../assets/heart_filled.png'
import heartEmptyLogo from '../assets/heart_empty.png'
import repottLogo from '../assets/report_logo.png'
import Modal from 'react-modal'

interface TopicType {
    id: number,
    name: string,
    content: string,
    creatorID: number,
    numberOfLikes: number,
    liked: boolean | undefined,
    postDateTime: string,
}

interface PersonType {
    fullName: string
}

interface CommentType {
    id: number,
    message: string,
    liked: boolean | undefined,
    numberOfLikes: number,
    creatorID: number,
    commentDateTime: string
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

function Topic() {

    const [token,] = useLocalStorage('token', null)
    const { hallId, topicId } = useParams()
    const [topic, setTopic] = useState<TopicType>()
    const [person, setPerson] = useState<PersonType>()
    const [reply, setReply] = useState<string>('')
    const [comments, setComments] = useState<CommentType[]>([])
    const [liked, setLiked] = useState<boolean>(false)
    const [reportText, setReportText] = useState<string>('')
    const [reportTopicModalIsShown, setReportTopicModalIsShown] = useState<boolean>(false)
    const navigate = useNavigate()
    const [, , increaseView, likeUnlikeTopic, reportTopic, postReply] = useTopic(-1)

    const _hallId = typeof hallId == 'undefined' ? 0 : parseInt(hallId)
    const _topicId = typeof topicId == 'undefined' ? 0 : parseInt(topicId)

    usePageTitle('تاپیک')

    const sendReply = () => {
        if (reply === '') {
            alert("لطفا  متن پاسخ را وارد نمایید")
            return;
        }
        postReply(_topicId, reply, () => window.open(createTopicUrl(_hallId, _topicId), "_self"))
    }

    useEffect(() => {
        axios.get(LINK_FORUMS_TOPIC, {
            headers: {
                "Authorization": `Bearer ${token}`
            }, params: {
                topic: _topicId,
            }
        })
            .then(response => response.data)
            .then(data => {
                setTopic(data.data)
                setLiked(data.data.liked !== undefined && data.data.liked === true)
                axios.get(LINK_FORUMS_CREATOR, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }, params: {
                        id: topic?.creatorID,
                    }
                })
                    .then(response => response.data)
                    .then(data => { setPerson(data.data) })
                    .catch(error => alert(JSON.stringify(error.response.data.message)))
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token, _topicId, topic?.creatorID])

    useEffect(() => {
        increaseView(_topicId)
    }, [])

    useEffect(() => {
        axios.get(LINK_FORUMS_COMMENTS, {
            headers: {
                "Authorization": `Bearer ${token}`
            }, params: {
                id: topicId,
            }
        })
            .then(response => response.data)
            .then(data => { setComments(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token, topicId])

    return (
        <div className='topic-total-container'>
            <Modal
                style={modalStyle}
                isOpen={reportTopicModalIsShown}>
                <div className='topic-report-container'>
                    <div className='topic-report-inner-container'>
                        <span className='fas fa-times topic-report-cross' onClick={e => setReportTopicModalIsShown(false)} />
                        <textarea className='topic-report-text' placeholder='علت تخلف تاپیک را توضیح دهید'
                            onChange={e => setReportText(e.target.value)}>{reportText}</textarea>
                    </div>
                    <Button title='ارسال تخلف' onClick={e => {
                        if (reportText.trim() === '' || reportText.length === 0) {
                            alert("لطفا علت تخلف تاپیک را وارد نمایید")
                            return
                        }
                        reportTopic(_topicId, reportText, () => {
                            setReportText('')
                            setReportTopicModalIsShown(false)
                            alert("با تشکر از شما، گزارش به مدیریت ارسال شد")
                        })

                    }} />
                </div>
            </Modal>
            <div className='topic-name'>{topic?.name}</div>
            <div key={1} className='topic-container'>
                <div className='topic-header'>
                    <img className='topic-avatar-style' src={avatar} alt={"profile"} />
                    <div className='topic-header-text-container'>
                        <div className='topic-header-text-container-row'>
                            <div className='topic-label-key'>نام و نام خانوادگی : </div>
                            <a className='topic-label-name' href={createProfileUrl(topic?.creatorID!)}>{person?.fullName}</a>
                        </div>
                        <div className='topic-header-text-container-row'>
                            <div className='topic-label-key'>تاریخ ارسال : </div>
                            <div>{topic?.postDateTime}</div>
                        </div>
                    </div>
                </div>
                <div className='topic-body'>
                    <div className='topic-body-row-comment'>
                        {topic?.content}
                    </div>
                </div>
                <div className='topic-options-container'>
                    <div>
                        <img
                            className='topic-options-item-image'
                            src={repottLogo}
                            title="گزارش پست"
                            alt="گزارش پست"
                            onClick={e => setReportTopicModalIsShown(true)}
                        />
                        <img
                            className='topic-options-item-image'
                            src={liked ? heartFilledLogo : heartEmptyLogo}
                            alt={liked ? "نپسندیدن" : "پسندیدن"}
                            title={liked ? "نپسندیدن" : "پسندیدن"}
                            onClick={e => likeUnlikeTopic(_topicId, !liked, () => {
                                setLiked(!liked)
                                window.location.reload()
                            })} />
                    </div>
                    <div className='topic-options-like-text'>{`${topic?.numberOfLikes === undefined ? 0 : topic?.numberOfLikes} پسند`}</div>
                </div>
            </div >

            <div className='topic-replies-sticker'>{"پاسخ ها ( " + comments.length + " پاسخ )"}</div>
            <div className="topic-reply">
                {
                    token && <div className='topic-reply-container'>
                        <textarea placeholder='پاسخ خود را در این قسمت وارد نمایید' maxLength={1000} className='topic-reply-write-box' onChange={e => setReply(e.target.value)} value={reply}></textarea>
                        <div className='topic-reply-button-container'>
                            <Button title='ارسال' onClick={e => sendReply()} />
                        </div>
                    </div>
                }
                {
                    !token && <div className="topic-login-container">
                        <div>
                            جهت ثبت پاسخ ابتدا وارد حساب کاربری خود شوید
                        </div>
                        <Button
                            className="topic-login-button"
                            title="ورود / ثبت نام"
                            onClick={e => navigate('/login', { replace: true })}
                        />
                    </div>
                }

            </div>
            {
                comments?.map(comment => < CommentItem key={comment.id} comment={comment} />)
            }
        </div>
    )
}

export default Topic
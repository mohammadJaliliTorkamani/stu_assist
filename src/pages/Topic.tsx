import './Topic.css'
import avatar from '../assets/user_avatar.png'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LINK_FORUMS_CREATOR, LINK_FORUMS_TOPIC, LINK_FORUMS_INCREASE_VIEWS, LINK_FORUMS_COMMENTS, LINK_FORUMS_SEND_COMMENT } from '../utils/Constants'
import CommentItem from '../components/CommentItem'
import { createProfileUrl, createTopicUrl } from '../utils/Utils'
import Button from '../components/Button'

interface TopicType {
    id: number,
    name: string,
    content: string,
    creatorID: number,
    postDateTime: string,
}

interface PersonType {
    fullName: string
}

interface CommentType {
    id: number,
    message: string,
    creatorID: number,
    commentDateTime: string
}

function Topic() {

    const [token,] = useLocalStorage('token', null)
    const { hallId, topicId } = useParams()
    const [topic, setTopic] = useState<TopicType>()
    const [person, setPerson] = useState<PersonType>()
    const [reply, setReply] = useState<string>('')
    const [comments, setComments] = useState<CommentType[]>([])
    const navigate = useNavigate()


    const _hallId = typeof hallId == 'undefined' ? 0 : parseInt(hallId);
    const _topicId = typeof topicId == 'undefined' ? 0 : parseInt(topicId);

    const sendReply = () => {
        if (reply === '') {
            alert("لطفا  متن پاسخ را وارد نمایید")
            return;
        }

        axios.post(LINK_FORUMS_SEND_COMMENT,
            {
                id: topicId,
                content: reply
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => { window.open(createTopicUrl(_hallId, _topicId), "_self") })
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
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
        document.title = "Stu Assist | تاپیک"

        axios.post(LINK_FORUMS_INCREASE_VIEWS,
            {
                topic: topicId,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
    }, [token, topicId])

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
            </div >

            <div className='topic-replies-sticker'>پاسخ ها</div>
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
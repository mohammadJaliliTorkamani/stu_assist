import './Topic.css'
import avatar from '../assets/user_avatar.png'
import { useLocalStorage } from '../utils/useLocalStorage'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LINK_FORUMS_CREATOR, LINK_FORUMS_TOPIC, LINK_INCREASE_VIEWS } from '../utils/Constants'

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

function Topic() {

    const [token,] = useLocalStorage('token', null)
    const { _, topicId } = useParams()
    const [topic, setTopic] = useState<TopicType>()
    const [person, setPerson] = useState<PersonType>()

    const _topicId = typeof topicId == 'undefined' ? 0 : parseInt(topicId);

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
        axios.post(LINK_INCREASE_VIEWS,
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

    return (
        <div className='topic-total-container'>
            <div className='topic-name'>{topic?.name}</div>
            <div key={1} className='topic-container'>
                <div className='topic-header'>
                    <img className='topic-avatar-style' src={avatar} alt={"profile"} />
                    <div className='topic-header-text-container'>
                        <div className='topic-header-text-container-row'>
                            <div className='topic-label-key'>نام و نام خانوادگی : </div>
                            <div>{person?.fullName}</div>
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
        </div>
    )
}

export default Topic
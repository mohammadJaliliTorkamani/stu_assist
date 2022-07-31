import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Button from '../../components/tsx/Button'
import usePageTitle from '../../hooks/usePageTitle'
import useTopic from '../../hooks/useTopic'
import { LINK_FORUMS_HALL, LINK_FORUMS_WHOSE_HALL } from '../../utils/Constants'
import { createTopicUrl, getToastColor, toastMessage, ToastStatus } from '../../utils/Utils'
import '../css/CreateTopic.css'

interface HallType {
    id: number,
    name: string,
    descriptor: string,
    numberOfTopics: number,
    lastTopic: {
        id: number,
        name: string,
        lastTopicDateEquivalent: string
    }
}

interface stateType {
    hallID: number
}

function CreateTopic() {
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const { state } = useLocation()
    const navigate = useNavigate()
    let hallID = -1
    const [hall, setHall] = useState<HallType | null>(null)
    const [category, setCategory] = useState('')
    const [, createTopic] = useTopic(hallID)

    usePageTitle('تاپیک جدید')

    const createTopicHandler = () => {
        if (name === '' || content === '' || category === '' || hall === null) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("لطفا تمامی فیلد ها را تکمیل نمایید")
        }
        else
            createTopic(name, content, category, hall.id, topicId => window.open(createTopicUrl(hall?.id!, topicId), "_self"))
    }

    useEffect(() => {
        try {
            hallID = (state as stateType).hallID
        } catch (e: any) {
            console.log("No hallID found. navigating to Home");
            navigate('/', { replace: true })
        }
        axios.get(LINK_FORUMS_WHOSE_HALL, {
            params: {
                hall: hallID,
            }
        })
            .then(response => response.data)
            .then(data1 => {
                axios
                    .get(LINK_FORUMS_HALL, {
                        params: {
                            hall: hallID,
                        }
                    })
                    .then(response => response.data)
                    .then(data => {
                        setCategory(data1.data)
                        setHall(data.data)
                    })
                    .catch(error => {
                        setToastStatus(ToastStatus.ERROR)
                        toastMessage(JSON.stringify(error.response.data.message))
                    })
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [])

    return <div className="create-topic-container">
        <div className='create-topic-label'>ساخت تاپیک جدید</div>
        <input
            className='create-topic-name'
            placeholder='نام تاپیک را در این قسمت وارد نمایید'
            value={name}
            onChange={e => setName(e.target.value)} />
        <div className='create-topic-selects-container'>
            <select className='create-topic-categories-select'>
                {
                    <option key={category} value={category}>
                        تالار  {category}
                    </option>
                }
            </select>
            <select className='create-topic-halls-select'>
                {
                    <option key={hall?.name} value={hall?.name}>
                        سالن  {hall?.name}
                    </option>
                }
            </select>
        </div>
        <ReactQuill
            theme='snow'
            value={content}
            onChange={setContent}
            placeholder='متن تاپیک مورد نظر را در این قسمت وارد نمایید'
            preserveWhitespace={true}
            className='create-topic-halls-write-box'
        />

        <div className='create-topic-button-container'>
            <Button title='ساخت تاپیک' onClick={e => createTopicHandler()} />
        </div>
        <ToastContainer
            toastStyle={{
                backgroundColor: getToastColor(toastID),
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
            }}
            limit={1}
            hideProgressBar={true}
            position='bottom-center' />
    </div >
}

export default CreateTopic
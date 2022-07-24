import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Button from '../components/Button'
import useCategory from '../hooks/useCategory'
import usePageTitle from '../hooks/usePageTitle'
import useTopic from '../hooks/useTopic'
import { LINK_FORUMS_HALLS } from '../utils/Constants'
import { createTopicUrl, getToastColor, toastMessage, ToastStatus } from '../utils/Utils'
import './CreateTopic.css'

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

function CreateTopic() {
    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [category, setCategory] = useState('')
    const [hall, setHall] = useState(-1)
    const [halls, setHalls] = useState<HallType[]>([])
    const [categories] = useCategory()
    const [, createTopic] = useTopic(hall)
    const [toastID, setToastStatus] = useState<ToastStatus>(ToastStatus.SUCCESS)

    usePageTitle('تاپیک جدید')

    const createTopicHandler = () => {
        if (name === '' || content === '' || category === '' || hall === -1) {
            setToastStatus(ToastStatus.INFO)
            toastMessage("لطفا تمامی فیلد ها را تکمیل نمایید")
        }
        else
            createTopic(name, content, category, hall, topicId => window.open(createTopicUrl(hall, topicId), "_self"))
    }

    useEffect(() => {
        if (categories.length > 0)
            setCategory(categories[0].name)
    }, [categories])

    useEffect(() => {
        axios
            .get(LINK_FORUMS_HALLS, {
                params: {
                    category: category,
                }
            })
            .then(response => response.data)
            .then(data => {
                setHalls(data.data)
                if (data.data.length > 0)
                    setHall(data.data[0].id)
            })
            .catch(error => {
                setToastStatus(ToastStatus.ERROR)
                toastMessage(JSON.stringify(error.response.data.message))
            })
    }, [category])

    return <div className="create-topic-container">
        <div className='create-topic-label'>ساخت تاپیک جدید</div>
        <input
            className='create-topic-name'
            placeholder='نام تاپیک را در این قسمت وارد نمایید'
            value={name}
            onChange={e => setName(e.target.value)} />
        <div className='create-topic-selects-container'>
            <select className='create-topic-categories-select' onChange={e => setCategory(e.target.value)}>
                {
                    categories.map(item => <option key={item.name} value={item.name}>
                        تالار  {item.name}
                    </option>)
                }
            </select>
            <select className='create-topic-halls-select' onChange={e => setHall(parseInt(e.target.value))}>
                {
                    halls.map(item => <option key={item.id} value={item.id}>
                        سالن  {item.name}
                    </option>)
                }
            </select>
        </div>
        <textarea
            className='create-topic-content'
            placeholder='متن تاپیک مورد نظر را در این قسمت وارد نمایید'
            maxLength={200}
            value={content}
            onChange={e => setContent(e.target.value)} >
        </textarea>
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
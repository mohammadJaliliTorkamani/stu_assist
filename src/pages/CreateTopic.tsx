import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import useCategory from '../hooks/useCategory'
import usePageTitle from '../hooks/usePageTitle'
import useTopic from '../hooks/useTopic'
import { LINK_FORUMS_CATEGORIES, LINK_FORUMS_HALLS } from '../utils/Constants'
import { useLocalStorage } from '../utils/useLocalStorage'
import { createTopicUrl } from '../utils/Utils'
import './CreateTopic.css'

interface CategoryType {
    name: string,
}

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
    const [token,] = useLocalStorage('token', null)
    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [hall, setHall] = useState<number>(-1)
    const [categories] = useCategory()
    const [halls, setHalls] = useState<HallType[]>([])

    const [, createTopic] = useTopic(hall)

    usePageTitle('تاپیک جدید')
    useEffect(() => {
        axios
            .get(LINK_FORUMS_CATEGORIES)
            .then(response => response.data)
            .then(data => {
                setCategory(data.data[0].name)
                fetchHalls(data.data[0].name)
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [])

    const createTopicHandler = () => {
        if (name === '' || content === '' || category === '' || hall === -1) {
            alert("لطفا تمامی فیلد ها را تکمیل نمایید")
            return;
        }
        createTopic(name, content, category, hall, topicId => window.open(createTopicUrl(hall, topicId), "_self"))
    }

    const fetchHalls = (category: string) => {
        axios
            .get(LINK_FORUMS_HALLS, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }, params: {
                    category: category,
                }
            })
            .then(response => response.data)
            .then(data => {
                setHall(data.data[0].id)
                setHalls(data.data)
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }



    return <div className="create-topic-container">
        <div className='create-topic-label'>ساخت تاپیک جدید</div>
        <input className='create-topic-name' placeholder='نام تاپیک را در این قسمت وارد نمایید' value={name} onChange={e => setName(e.target.value)} />
        <div className='create-topic-selects-container'>
            <select className='create-topic-categories-select' onChange={e => {
                setCategory(e.target.value)
                fetchHalls(e.target.value)
            }}>
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
        <textarea className='create-topic-content' placeholder='متن تاپیک مورد نظر را در این قسمت وارد نمایید' maxLength={200} value={content} onChange={e => setContent(e.target.value)} ></textarea>
        <div className='create-topic-button-container'>
            <Button title='ساخت تاپیک' onClick={e => createTopicHandler()} />
        </div>
    </div >
}

export default CreateTopic
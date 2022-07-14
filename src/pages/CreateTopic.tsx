import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { LINK_FORUMS_CATEGORIES, LINK_FORUMS_CREATE_TOPIC, LINK_FORUMS_HALLS } from '../utils/Constants'
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
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [halls, setHalls] = useState<HallType[]>([])

    useEffect(() => {
        document.title = "Stu Assist | تاپیک جدید"
        axios
            .get(LINK_FORUMS_CATEGORIES, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .then(data => {
                setCategory(data.data[0].name)
                setCategories(data.data)
                fetchHalls(data.data[0].name)
            })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token])

    const createTopic = () => {
        if (name === '' || content === '' || category === '' || hall === -1) {
            alert("لطفا تمامی فیلد ها را تکمیل نمایید")
            return;
        }

        axios.post(LINK_FORUMS_CREATE_TOPIC,
            {
                name: name,
                content: content,
                category: category,
                hall: hall,
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => { window.open(createTopicUrl(hall, data.data), "_self") })
            .catch(error => { alert(JSON.stringify(error.response.data.message)) })
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
            <Button title='ساخت تاپیک' onClick={e => createTopic()} />
        </div>
    </div >
}

export default CreateTopic
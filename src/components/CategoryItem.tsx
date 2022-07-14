import { useEffect, useState } from "react"
import { useLocalStorage } from "../utils/useLocalStorage"
import HallItem from "./HallItem"
import './CategoryItem.css'
import { LINK_FORUMS_HALLS } from "../utils/Constants"
import axios from "axios"

interface CategoryType {
    name: string,
    descriptor: string
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

interface IProps {
    category: CategoryType
}

function CategoryItem({ category }: IProps) {
    const [halls, setHalls] = useState<HallType[]>([])
    const [token,] = useLocalStorage('token', null)

    useEffect(() => {
        document.title = "Stu Assist | تالار گفتگو"
        axios
            .get(LINK_FORUMS_HALLS, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }, params: {
                    category: category.name,
                }
            })
            .then(response => response.data)
            .then(data => { setHalls(data.data) })
            .catch(error => alert(JSON.stringify(error.response.data.message)))
    }, [token, category.name])

    return <div className="category-item">
        <div className="category-header">
            <div className="category-name">{category.name}</div>
            <div className="category-descriptor">{category.descriptor}</div>
        </div>
        <table className="category-table">
            <tbody className="category-table-body">
                <tr className="category-table-row">
                    <th className="category-table-header">تالارها</th>
                    <th className="category-table-header"> تعداد تاپیک</th>
                    <th className="category-table-header">آخرین تاپیک</th>
                </tr>
                {halls.map(hall => <HallItem key={hall.id} hall={hall} />)}
            </tbody>
        </table>
    </div>
}

export default CategoryItem
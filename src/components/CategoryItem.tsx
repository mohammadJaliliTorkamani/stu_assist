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
    name: {
        name: string,
        link: string
    },
    descriptor: string,
    numberOfTopics: number,
    lastPost: {
        name: string,
        link: string,
        lastPostDateEquivalent: string
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
            <div className="name">{category.name}</div>
            <div className="descriptor">{category.descriptor}</div>
        </div>
        <table className="table">
            <tbody className="table-body">
                <tr className="table-row">
                    <th className="table-header">تالارها</th>
                    <th className="table-header"> تاپیک ها</th>
                    <th className="table-header">آخرین پست در</th>
                </tr>
                {halls.map(hall => <HallItem key={hall.name.name} hall={hall} />)}
            </tbody>
        </table>
    </div>
}

export default CategoryItem
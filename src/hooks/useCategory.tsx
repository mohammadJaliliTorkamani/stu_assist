import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_FORUMS_CATEGORIES } from "../utils/Constants"

interface CategoryType {
    name: string,
    descriptor: string
}

function useCategory() {
    const [categories, setCategories] = useState<CategoryType[]>([])

    useEffect(() => {
        axios
            .get(LINK_FORUMS_CATEGORIES)
            .then(response => response.data)
            .then(data => setCategories(data.data))
            .catch(error => alert(JSON.stringify(error.response.data.message)))

    }, [])
    return [categories] as const
}

export default useCategory
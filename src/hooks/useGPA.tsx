import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { LINK_GPA } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

function useGPA(_min: number, _max: number, _grade: number) {
    const [token,] = useLocalStorage('token', null)

    const [min, setMin] = useState<number>(_min)
    const [max, setMax] = useState<number>(_max)
    const [grade, setGrade] = useState<number>(_grade)
    const [gpa, setGPA] = useState(0)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfBalance, setOutOfBalance] = useState(false)

    const trigger = useCallback(() => {
        setGuest(token === null)
        if (!loading && !guest && !outOfBalance && token !== null) {
            if (max - min === 0)
                setGPA(0)
            else {
                axios
                    .get(LINK_GPA, {
                        params: {
                            min: min,
                            max: max,
                            grade: grade
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => response.data)
                    .then(data => {
                        setLoading(false)
                        setOutOfBalance(false)
                        setGPA(Number(parseFloat(data.data).toFixed(2)))
                    }).catch(error => {
                        setLoading(false)
                        if (error.response.data.message === 'موجودی ناکافی') {
                            setOutOfBalance(true)
                        } else {
                            alert(error.response.data.message)
                            setGuest(true)
                        }
                    })
            }
        }
    }, [grade, max, min, guest, loading, outOfBalance, token])

    useEffect(() => {
        if (outOfBalance || loading || guest) {
            setGPA(0)
        }
    }, [outOfBalance, loading, guest])

    useEffect(() => setGuest(token === null), [token])


    return [min, max, grade, gpa, loading, guest, outOfBalance, setMin, setMax, setGrade, trigger] as const
}

export default useGPA
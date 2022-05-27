import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_GPA } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

function useGPA(_min: number, _max: number, _grade: number) {
    const [token,] = useLocalStorage('token', null)

    const [min, setMin] = useState(_min)
    const [max, setMax] = useState(_max)
    const [grade, setGrade] = useState(_grade)
    const [gpa, setGPA] = useState(0)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfCoupon, setOutOfCoupon] = useState(false)

    const trigger = () => {
        setGuest(token === null)

        if (!loading && !guest && !outOfCoupon && token !== null) {
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
                        setOutOfCoupon(false)
                        setGPA(Number(parseFloat(data.data).toFixed(2)))
                    }).catch(error => {
                        setLoading(false)
                        if (error.response.data.message === 'Insufficient balance') {
                            setOutOfCoupon(true)
                        } else {
                            alert(error.response.data.message)
                            setGuest(true)
                        }
                    })
            }
        }
    }

    useEffect(() => {
        if (outOfCoupon === true || loading === true || guest === true) {
            setGPA(0)
        }
    }, [outOfCoupon, loading, guest])

    return [min, max, grade, gpa, loading, guest, outOfCoupon, setMin, setMax, setGrade, trigger] as const
}

export default useGPA
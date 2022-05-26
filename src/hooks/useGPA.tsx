import axios from "axios"
import { useEffect, useState } from "react"

function useGPA(_min: number, _max: number, _grade: number) {
    const token = 'e8397ef9bb7935d06e542a5f1fb59c4e2dc105fd1ad0e3643a9547d3a48783d8'

    const [min, setMin] = useState(_min)
    const [max, setMax] = useState(_max)
    const [grade, setGrade] = useState(_grade)
    const [gpa, setGPA] = useState(0)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfCoupon, setOutOfCoupon] = useState(false)

    const trigger = () => {
        if (!loading && !guest && !outOfCoupon) {
            if (max - min === 0)
                setGPA(0)
            else {
                axios
                    .get('http://localhost:8000/stu_assist_backend/services/gpa_calculation.php', {
                        params: {
                            min: min,
                            max: max,
                            grade: grade
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        setLoading(false)
                        return response.data
                    })
                    .then(data => {
                        if (!data.error) {
                            setOutOfCoupon(false)
                            setGPA(Number(parseFloat(data.data).toFixed(2)))
                        } else {
                            if (data.message === 'موجودی ناکافی') {
                                setOutOfCoupon(true)
                            } else {
                                alert(data.message)
                            }
                        }
                    }).catch(error => {
                        alert('error!')
                        setGuest(true)
                        setLoading(false)
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
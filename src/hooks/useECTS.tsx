import axios from "axios"
import { useEffect, useState } from "react"
import { useLocalStorage } from "../utils/useLocalStorage"

function useECTS(_unit: number, _time: number, _week: number) {
    const [token,] = useLocalStorage('token')
    console.log(token);


    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfCoupon, setOutOfCoupon] = useState(false)
    const [unit, setUnit] = useState(_unit)
    const [time, setTime] = useState(_time)
    const [week, setWeek] = useState(_week)
    const [ects, setECTS] = useState(0)

    const trigger = () => {
        if (!loading && !guest && !outOfCoupon) {
            if (week === 0)
                setECTS(0)
            else {
                setLoading(true)
                axios.get('http://localhost:8000/stu_assist_backend/services/ects_calculation.php', {
                    params: {
                        time: time,
                        unit: unit,
                        week: week
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
                            setECTS(Number(parseFloat(data.data).toFixed(1)))
                        } else {
                            if (data.message === 'موجودی ناکافی') {
                                setOutOfCoupon(true)
                            } else {
                                alert(data.message)
                            }
                        }
                    }).catch(error => {
                        alert(JSON.stringify(error))
                        setLoading(false)
                    })
            }
        }
    }

    useEffect(() => {
        if (outOfCoupon === true || loading === true || guest === true) {
            setECTS(0)
        }
    }, [outOfCoupon, loading, guest])

    return [unit, time, week, ects, loading, guest, outOfCoupon, setUnit, setTime, setWeek, trigger] as const
}

export default useECTS
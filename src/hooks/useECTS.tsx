import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_ECTS } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

function useECTS(_unit: number | '', _time: number | '', _week: number | '') {
    const [token,] = useLocalStorage('token', null)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfCoupon, setOutOfCoupon] = useState(false)
    const [unit, setUnit] = useState(_unit)
    const [time, setTime] = useState(_time)
    const [week, setWeek] = useState(_week)
    const [ects, setECTS] = useState(0)

    const trigger = () => {
        setGuest(token === null)
        if (unit === '' || week === '' || time === '') {
            alert("لطفا تمامی فیلد ها را تکمیل نمایید")
            return;
        }

        if (!loading && !guest && !outOfCoupon && token !== null) {
            if (week === 0)
                setECTS(0)
            else {
                setLoading(true)
                axios.get(LINK_ECTS, {
                    params: {
                        time: time,
                        unit: unit,
                        week: week
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => response.data)
                    .then(data => {
                        setLoading(false)
                        setOutOfCoupon(false)
                        setECTS(Number(parseFloat(data.data).toFixed(1)))
                    }).catch(error => {
                        setLoading(false)
                        if (error.response.data.message === 'موجودی ناکافی') {
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
            setECTS(0)
        }
    }, [outOfCoupon, loading, guest])

    useEffect(() => setGuest(token === null), [token])

    return [unit, time, week, ects, loading, guest, outOfCoupon, setUnit, setTime, setWeek, trigger] as const
}

export default useECTS
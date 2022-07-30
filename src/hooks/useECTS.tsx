import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_ECTS } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

function useECTS(_unit: number, _time: number, _week: number) {
    const [token,] = useLocalStorage('token', null)
    const [loading, setLoading] = useState(false)
    const [guest, setGuest] = useState(false)
    const [outOfBalance, setOutOfBalance] = useState(false)
    const [unit, setUnit] = useState<number>(_unit)
    const [time, setTime] = useState<number>(_time)
    const [week, setWeek] = useState<number>(_week)
    const [ects, setECTS] = useState<number>(0)

    const trigger = () => {
        setGuest(token === null)
        if (!loading && !guest && !outOfBalance && token !== null) {
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
                        setOutOfBalance(false)
                        setECTS(Number(parseFloat(data.data).toFixed(1)))
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
    }

    useEffect(() => {
        if (outOfBalance || loading || guest) {
            setECTS(0)
        }
    }, [outOfBalance, loading, guest])

    useEffect(() => setGuest(token === null), [token])

    return [unit, time, week, ects, loading, guest, outOfBalance, setUnit, setTime, setWeek, trigger] as const
}

export default useECTS
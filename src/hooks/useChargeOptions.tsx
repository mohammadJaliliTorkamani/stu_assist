import axios from "axios"
import { useEffect, useState } from "react"
import { LINK_CHARGE_OPTIONS } from "../utils/Constants"
import { useLocalStorage } from "../utils/useLocalStorage"

interface ChargeValue {
    id: number,
    value: number,
    price: number
}

function useChargeOptions() {
    const [token,] = useLocalStorage('token')
    const [chargeValues, setChargeValues] = useState<ChargeValue[]>([])
    const [selectedChargeOption, setSelectedChargeOption] = useState<ChargeValue>({ id: -1, value: -1, price: -1 })

    useEffect(() => {
        axios
            .get(LINK_CHARGE_OPTIONS, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                return response.data
            })
            .then(data => data.error ? alert(data.message) : setChargeValues(data.data))
            .catch(error => {
                alert(JSON.stringify(error))
            })
    }, [token])
    return [chargeValues, selectedChargeOption, setSelectedChargeOption] as const
}

export default useChargeOptions